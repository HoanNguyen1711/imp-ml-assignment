import React, { useState } from 'react';
import axios from 'axios';

function Prompt({ onResponse, setIsLoading, dataSource }) {  // Added dataSource prop here
  const [prompt, setPrompt] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Include dataSource in the request
      const response = await axios.post('/api/ai', { prompt, dataSource });
      
      // For debugging
      console.log('Sending request with:', { prompt, dataSource });
      
      onResponse(response.data.response);
    } catch (error) {
      console.error('Error sending prompt:', error);
      onResponse('Error: Could not get response from AI service.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="prompt-section">
      <h2>AI Prompt</h2>
      <form onSubmit={handleSubmit} className="prompt-form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt for the AI..."
          className="prompt-input"
        />
        <button type="submit" className="send-button">
          <i className="fa fa-paper-plane"></i>
          Send
        </button>
      </form>
      {dataSource && (
        <div className="datasource-indicator">
          Using data source: {dataSource.name || 'Selected'}
        </div>
      )}
    </div>
  );
}

export default Prompt;