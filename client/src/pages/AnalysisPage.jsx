import React, { useState, useEffect } from 'react';
import UploadArea from '../components/analysis/UploadArea';
import Loading from '../components/analysis/Loading';
import Dashboard from '../components/analysis/Dashboard';
import Chatbot from '../components/analysis/Chatbot';
import { uploadContractPdf } from '../services/api';

const SESSION_STORAGE_KEY = 'clausewise_analysis_data';
const SESSION_CHAT_KEY = 'clausewise_chat_history';

const AnalysisPage = () => {
  const [step, setStep] = useState('upload'); // 'upload' | 'loading' | 'dashboard'
  const [analysisData, setAnalysisData] = useState(null);
  const [extractedText, setExtractedText] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed && parsed.analysis) {
          setAnalysisData(parsed.analysis);
          setExtractedText(parsed.extractedText);
          setStep('dashboard');
        }
      } catch (e) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  }, []);

  const handleFileUpload = async (file) => {
    setError(null);
    setStep('loading');
    
    try {
      const response = await uploadContractPdf(file);
      
      if (response.status === 'success' && response.data) {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(response.data));
        setAnalysisData(response.data.analysis);
        setExtractedText(response.data.extractedText);
        setStep('dashboard');
      } else {
        throw new Error('Failed to retrieve valid data from server.');
      }
    } catch (err) {
      const errorData = {
        isContract: false,
        isExtractionError: true,
        reason: err.message || "Failed to process the document."
      };
      setAnalysisData(errorData);
      setStep('dashboard');
    }
  };

  const handleReset = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_CHAT_KEY);
    setAnalysisData(null);
    setExtractedText(null);
    setError(null);
    setStep('upload');
  };

  return (
    <div className="container py-4 px-lg-4" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {step === 'upload' && <UploadArea onFileUpload={handleFileUpload} error={error} />}
      {step === 'loading' && <Loading />}
      
      {step === 'dashboard' && (
        <div className="d-flex flex-column gap-3 page-fade-in pb-3">
          <Dashboard data={analysisData} onReset={handleReset} />
          {analysisData?.isContract !== false && (
            <Chatbot contractText={extractedText} analysisData={analysisData} />
          )}
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
