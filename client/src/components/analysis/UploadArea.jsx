import React, { useRef } from 'react';

const UploadArea = ({ onFileUpload, error }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic frontend validation to save a network trip
      if (file.type !== 'application/pdf') {
        alert("Please select a valid PDF file.");
        return;
      }
      onFileUpload(file);
    }
    // Reset input so the same file can be selected again if needed
    e.target.value = null;
  };

  return (
    <div className="py-5 text-center page-fade-in">
      
      {/* Display errors passed down from the AnalysisPage state */}
      {error && (
        <div className="alert alert-danger mx-auto mb-4 text-start shadow-sm" style={{ maxWidth: '600px', borderRadius: '1rem' }}>
          <strong>🚨 Upload Error:</strong> {error}
        </div>
      )}

      {/* Hidden native file input */}
      <input 
        type="file" 
        accept="application/pdf" 
        className="d-none" 
        ref={fileInputRef} 
        onChange={handleFileChange}
      />

      <div 
        className="glass-panel p-5 mx-auto hover-lift" 
        style={{ maxWidth: '600px', cursor: 'pointer', border: '2px dashed var(--border-color)' }}
        onClick={() => fileInputRef.current.click()}
      >
        <div className="display-1 text-primary mb-3">📄</div>
        <h3 className="fw-bold mb-3">Upload your Contract</h3>
        <p className="text-muted mb-4">
          Click anywhere in this box to browse and select your PDF file.<br/>
          <small className="text-warning fw-medium">
            (Max file size: 10MB • Optimal for documents under 15 pages)
          </small>
        </p>
        <button className="btn btn-gradient px-4 py-2 rounded-pill fw-bold">
          Select PDF File
        </button>
      </div>
    </div>
  );
};

export default UploadArea;
