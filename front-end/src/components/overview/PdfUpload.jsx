// src/components/overview/PdfUpload.jsx
import React from 'react';
import { Upload, FileText } from 'lucide-react';

export default function PdfUpload({ darkMode, cardBg, secondaryText, borderClass }) {
  return (
    <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass} lg:col-span-3`}>
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">Upload Study Materials</h2>
      </div>
      <div className={`border-2 border-dashed ${borderClass} rounded-lg p-8 text-center cursor-pointer hover:border-indigo-600 transition-colors`}>
        <FileText className={`w-12 h-12 mx-auto mb-3 ${secondaryText}`} />
        <p className="font-medium mb-1">Click to upload or drag and drop</p>
        <p className={`text-sm ${secondaryText}`}>PDF files up to 10MB</p>
      </div>
    </div>
  );
}
