const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config(); // This is the key line to load .env properly
const Anthropic = require('@anthropic-ai/sdk');
const yaml = require('yaml');

const app = express();
const PORT = process.env.PORT || 5001;

// Get file path from environment variables
const FILE_PATH = process.env.DEFAULT_FILE_PATH || path.join(__dirname, 'result.md');
const TEMPLATE_PATH = path.join(__dirname, 'templates/dashboard-template.md');
const SYNTAX_PATH = path.join(__dirname, 'templates/syntax.md');
const DATA_SOURCES_PATH = path.join(__dirname, 'config/datasources.yaml');

// Load templates once when server starts
const DASHBOARD_TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf8');
const SYNTAX_GUIDE = fs.readFileSync(SYNTAX_PATH, 'utf8');
const DATA_SOURCES = yaml.parse(fs.readFileSync(DATA_SOURCES_PATH, 'utf8'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Log the file path being used
console.log(`File path set to: ${FILE_PATH}`);

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// API route to get file content
app.get('/api/file', (req, res) => {
  try {
    // Check if file exists, if not create it
    if (!fs.existsSync(FILE_PATH)) {
      console.log(`File does not exist. Creating new file at: ${FILE_PATH}`);
      // Ensure directory exists
      const dir = path.dirname(FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(FILE_PATH, '', 'utf8');
    }
    
    const content = fs.readFileSync(FILE_PATH, 'utf8');
    res.json({ content, filePath: FILE_PATH });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: 'Failed to read file', details: error.message });
  }
});

// API route to save file content
app.post('/api/file', (req, res) => {
  try {
    const { content } = req.body;
    fs.writeFileSync(FILE_PATH, content, 'utf8');
    res.json({ success: true, filePath: FILE_PATH });
  } catch (error) {
    console.error('Error writing file:', error);
    res.status(500).json({ error: 'Failed to write file', details: error.message });
  }
});

// API route to get data sources
app.get('/api/datasources', (req, res) => {
  try {
    res.json(DATA_SOURCES.sources);
  } catch (error) {
    console.error('Error reading data sources:', error);
    res.status(500).json({ error: 'Failed to load data sources' });
  }
});

// API route to proxy requests to AI service
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt, dataSource } = req.body;
    
    // Create context from data source with validation
    let dataSourceContext = '';
    if (dataSource && dataSource.tables) {
      try {
        dataSourceContext = `Available tables and columns:
${dataSource.tables.map(table => `
Table: ${table.name}
Columns: ${table.columns.join(', ')}`).join('\n')}`;
        console.log('Successfully created dataSourceContext:', dataSourceContext);
      } catch (err) {
        console.error('Error creating dataSourceContext:', err);
        dataSourceContext = '';
      }
    }

    // Combine syntax guide with the user's prompt
    const enrichedPrompt = `${SYNTAX_GUIDE}\n\n${prompt}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 700,
      system: `You are an AI assistant specialized in generating dashboards using Evidence.dev.
${dataSourceContext}

Here is a sample syntax you should follow:

${DASHBOARD_TEMPLATE}

Make sure to:
1. Always include title and sidebar: hide on top of the response
2. Use proper SQL syntax with the available tables and columns
3. Include appropriate data visualizations
4. No need to include the markdown open/close tags
5. No need extra introduction or conclusion
6. No pie charts`,
      messages: [{
        role: 'user',
        content: enrichedPrompt
      }],
    });

    const aiResponse = message.content[0].text;
    fs.writeFileSync(FILE_PATH, aiResponse, 'utf8');
    res.json({ response: aiResponse });
    
  } catch (error) {
    console.error('Error with Claude API:', error);
    res.status(500).json({ error: 'Failed to get AI response', details: error.message });
  }
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Watching file: ${FILE_PATH}`);
});
