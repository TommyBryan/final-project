// src/components/DocumentTab.jsx
import React, { useState } from 'react';
import { Upload, Trash2, FileText } from 'lucide-react';
import { usePdfFiles } from '../hooks/usePdfFiles';
import * as storageService from '../services/storage';

export default function DocumentTab({ cardBg, textClass, secondaryText, borderClass, darkMode }) {
  const { files, loading, add, remove } = usePdfFiles();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Handle file uploads
  const handleUpload = async (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const pdfFiles = uploadedFiles.filter(file => file.type === 'application/pdf');

    if (pdfFiles.length === 0) {
      setUploadError('Please select PDF files only');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      for (const file of pdfFiles) {
        // Upload file to Supabase Storage
        const { publicUrl } = await storageService.uploadFile({
          bucket: 'documents',
          file,
          path: `pdfs/${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`,
        });

        // Add to database
        await add({
          file_name: file.name,
          file_url: publicUrl,
        });
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadError('Failed to upload files: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Delete document
  const deleteDocument = async (file) => {
    try {
      // Extract file path from URL if it's in Supabase storage
      if (file.file_url.includes('supabase')) {
        const urlParts = file.file_url.split('/');
        const filePath = urlParts.slice(urlParts.indexOf('pdfs')).join('/');
        
        // Delete from storage
        await storageService.deleteFile({
          bucket: 'documents',
          path: filePath,
        });
      }

      // Delete from database
      await remove(file.id);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload box */}
      <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass}`}>
        <div className="flex items-center gap-2 mb-4">
          <Upload className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Upload Study Materials</h2>
        </div>
        <label className={`border-2 border-dashed ${borderClass} rounded-lg p-8 text-center cursor-pointer hover:border-indigo-600 transition-colors block ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          {uploading ? (
            <>
              <div className="w-12 h-12 mx-auto mb-3 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <p className="font-medium mb-1">Uploading...</p>
            </>
          ) : (
            <>
              <Upload className={`w-12 h-12 mx-auto mb-3 ${secondaryText}`} />
              <p className="font-medium mb-1">Click to upload or drag and drop</p>
              <p className={`text-sm ${secondaryText}`}>PDF files up to 10MB</p>
            </>
          )}
          <input 
            type="file" 
            multiple 
            accept="application/pdf" 
            className="hidden" 
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
        {uploadError && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-lg text-red-700 dark:text-red-200 text-sm">
            {uploadError}
          </div>
        )}
      </div>

      {/* Display uploaded PDFs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Loading skeleton
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`${cardBg} rounded-xl shadow-lg p-4 border ${borderClass} animate-pulse`}
            >
              <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-2`} />
              <div className={`h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-2/3`} />
            </div>
          ))
        ) : files.length === 0 ? (
          <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass}`}>
            <p className={`${secondaryText}`}>No PDFs uploaded yet.</p>
          </div>
        ) : (
          files.map(file => (
            <div key={file.id} className={`${cardBg} rounded-xl shadow-lg p-4 border ${borderClass} relative hover:shadow-xl transition-shadow`}>
              <button
                onClick={() => deleteDocument(file)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors"
                title="Delete document"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="flex items-start gap-3 pr-8">
                <FileText className={`w-8 h-8 ${secondaryText} flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <a 
                    href={file.file_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`text-lg font-medium hover:text-indigo-600 ${textClass} block truncate`}
                    title={file.file_name}
                  >
                    {file.file_name}
                  </a>
                  <p className={`text-xs ${secondaryText} mt-1`}>
                    {new Date(file.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
