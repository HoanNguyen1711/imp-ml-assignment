import React from 'react';
import path from 'path-browserify';

function Editor({ content, setContent, isLoading, saveStatus, filePath }) {
  const handleTextChange = (e) => {
    setContent(e.target.value);
  };
  
  // Get just the filename from the full path
  const fileName = filePath ? path.basename(filePath) : 'result.md';
  
  return (
    <div className="panel editor-panel">
      <div className="panel-header">
        <h3>Editor ({fileName})</h3>
        <div className="status-container">
          {isLoading && (
            <div className="loading-indicator">
              <div className="spinner"></div>
              <span>Processing...</span>
            </div>
          )}
          {saveStatus && (
            <div className="save-status">
              {saveStatus}
            </div>
          )}
        </div>
      </div>
      <div className="panel-content">
        <textarea
          value={content}
          onChange={handleTextChange}
          placeholder="AI response will appear here. You can edit the text and it will automatically save..."
          className="text-editor"
        />
      </div>
      <div className="panel-footer">
        <div className="file-info">
          {filePath && `Auto-saving to: ${filePath}`}
        </div>
      </div>
    </div>
  );
}

export default Editor;
