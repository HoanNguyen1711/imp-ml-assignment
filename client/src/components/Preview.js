import React from 'react';

function Preview() {
  // Hardcoded URL for the AI assistant
  const iframeUrl = 'http://localhost:3000/ai_assistant/';

  return (
    <div className="panel preview-panel">
      <div className="panel-content">
        <div className="iframe-container">
          <iframe
            src={iframeUrl}
            title="External App Preview"
            className="preview-frame"
            sandbox="allow-same-origin allow-scripts allow-forms"
          />
        </div>
      </div>
    </div>
  );
}

export default Preview;