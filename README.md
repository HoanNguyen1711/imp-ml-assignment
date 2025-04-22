# AI Dashboard Generator

A web application that uses Claude AI to generate interactive dashboards based on user prompts and selected data sources.

## Features

- Interactive Markdown Editor
- Live Preview of Generated Dashboards
- AI-powered Dashboard Generation


## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
imp-ml-assignment/
├── client/          # React frontend
├── server/          # Express backend
├── bi-tool/         # Evidence.dev integration
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd imp-ml-assignment
   ```

2. Install dependencies:
   ```
   npm run install-all
   ```

## Configuration

### API Key Setup

The application requires an Anthropic Claude API key to function. In `.env`, add your API key:
   ```
   PORT=5001
   NODE_ENV=development
   DEFAULT_FILE_PATH=../bi-tool/pages/ai_assistant.md
   ANTHROPIC_API_KEY=your-api-key-here
   ```



### Port Configuration

- AI assistent runs on port 3001 by default
- Server runs on port 5001 by default
- BI tool runs on port 3000 by default

## Usage

### Start the Application

Run the entire application (frontend, backend, and BI tool):
```
npm start
```

This will open:
- BI Tool at http://localhost:3000

If you want to open AI assistant, please open http://localhost:3001

### Using the Dashboard Generator

1. Select a data source from the dropdown
2. Enter a prompt describing the dashboard you want to create
3. Review and edit the generated markdown in the editor
4. See the live preview update as you make changes

## Development

### File Structure

```
client/
├── src/
│   ├── components/      # React components
│   ├── styles/          # CSS files
│   └── App.js           # Main application

server/
├── templates/           # Dashboard templates
├── config/              # Data source definitions
└── server.js            # Express server

bi-tool/
└── pages/               # Evidence.dev pages
```

### Environment Variables

#### Client (.env)
- `PORT`: Client port (default: 3001)

#### Server (.env)
- `PORT`: Server port (default: 5001)
- `NODE_ENV`: Development or production
- `DEFAULT_FILE_PATH`: Path to Evidence.dev markdown file
- `ANTHROPIC_API_KEY`: Your Claude API key
