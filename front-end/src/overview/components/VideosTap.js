// src/components/VideosTab.js
import React from 'react';
import { Video } from 'lucide-react';

export default function VideosTab({ darkMode, cardBg, textClass, secondaryText, borderClass, studyTopic, setStudyTopic }) {
  return (
    <div>
      <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass} mb-6`}>
        <div className="flex items-center gap-2 mb-4">
          <Video className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-semibold">Study Topic</h2>
        </div>
        <input
          type="text"
          value={studyTopic}
          onChange={(e) => setStudyTopic(e.target.value)}
          placeholder="Enter your study topic..."
          className={`w-full px-4 py-2 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-700' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-indigo-600`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className={`${cardBg} rounded-xl shadow-lg overflow-hidden border ${borderClass}`}>
            <div className={`aspect-video ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
              <Video className={`w-12 h-12 ${secondaryText}`} />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{studyTopic} Tutorial Part {i}</h3>
              <p className={`text-sm ${secondaryText}`}>Educational content about {studyTopic.toLowerCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}