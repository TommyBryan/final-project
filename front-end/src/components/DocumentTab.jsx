// src/components/DocumentTab.jsx
import React, { useState, useEffect } from 'react';
import { Upload, Trash2 } from 'lucide-react';

const DOCUMENTS_KEY = "iNtellecta-documents";

export default function DocumentTab({ darkMode, cardBg, textClass, secondaryText, borderClass }) {
  const [documents, setDocuments] = useState([]);

  // Load saved documents from localStorage on mount
  useEffect(() => {
    try {
      const storedDocs = localStorage.getItem(DOCUMENTS_KEY);
      if (storedDocs) setDocuments(JSON.parse(storedDocs));
    } catch (error) {
      console.error("Failed to load documents from localStorage:", error);
    }
  }, []);

  // Save documents whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(documents));
    } catch (error) {
      console.error("Failed to save documents to localStorage:", error);
    }
  }, [documents]);

  // Handle file uploads
  const handleUpload = (event) => {
    const files = Array.from(event.target.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');

    const newDocs = pdfFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setDocuments(prev => [...prev, ...newDocs]);
  };

  // Delete document
  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Upload box */}
      <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Upload Study Materials</h2>
        </div>
        <label className={`border-2 border-dashed ${borderClass} rounded-lg p-8 text-center cursor-pointer hover:border-indigo-600 transition-colors block`}>
          <Upload className={`w-12 h-12 mx-auto mb-3 ${secondaryText}`} />
          <p className="font-medium mb-1">Click to upload or drag and drop</p>
          <p className={`text-sm ${secondaryText}`}>PDF files up to 10MB</p>
          <input type="file" multiple accept="application/pdf" className="hidden" onChange={handleUpload} />
        </label>
      </div>

      {/* Display uploaded PDFs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map(doc => (
          <div key={doc.id} className={`${cardBg} rounded-xl shadow-lg p-4 border ${borderClass} relative`}>
            <button
              onClick={() => deleteDocument(doc.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Delete document"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <a href={doc.url} target="_blank" rel="noopener noreferrer" className={`text-lg font-medium hover:text-indigo-600 ${textClass}`}>
              {doc.name}
            </a>
          </div>
        ))}
        {documents.length === 0 && <p className={`${secondaryText}`}>No PDFs uploaded yet.</p>}
      </div>
    </div>
  );
}
