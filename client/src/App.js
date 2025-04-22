import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Prompt from './components/Prompt';
import Editor from './components/Editor';
import Preview from './components/Preview';
import DataSourceSelector from './components/DataSourceSelector';
import './styles/App.css';

function App() {
  const [editorContent, setEditorContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [filePath, setFilePath] = useState('');
  const [selectedDataSource, setSelectedDataSource] = useState(null);
  
  // Load file content on initial load
  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        const response = await axios.get('/api/file');
        setEditorContent(response.data.content);
        setFilePath(response.data.filePath);
      } catch (error) {
        console.error('Error loading file:', error);
      }
    };
    
    fetchFileContent();
  }, []);
  
  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
    // Show saving status
    setSaveStatus('Saving...');
    
    // Save content to file
    saveContentToFile(newContent);
  };
  
  const saveContentToFile = async (content) => {
    try {
      const response = await axios.post('/api/file', { content });
      setFilePath(response.data.filePath);
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      console.error('Error saving file:', error);
      setSaveStatus('Save failed');
    }
  };
  
  const handleAIResponse = (response) => {
    setEditorContent(response);
  };

  const handleDataSourceSelect = (dataSource) => {
    setSelectedDataSource(dataSource);
  };
  
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <DataSourceSelector onDataSourceSelect={handleDataSourceSelect} />
        <Prompt 
          onResponse={handleAIResponse} 
          setIsLoading={setIsLoading}
          dataSource={selectedDataSource}
        />
        <div className="panels-container">
          <Editor 
            content={editorContent} 
            setContent={handleEditorChange} 
            isLoading={isLoading}
            saveStatus={saveStatus}
            filePath={filePath}
          />
          <Preview />
        </div>
      </main>
    </div>
  );
}

export default App;

