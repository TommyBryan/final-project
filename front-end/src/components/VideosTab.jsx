// src/components/VideosTab.jsx
import React, { useState, useEffect } from 'react';
import { Video } from 'lucide-react';

export default function VideosTab({ darkMode, cardBg, textClass, secondaryText, borderClass, studyTopic, setStudyTopic }) {
  // videos stored locally: { id, url, videoId, thumbnail, title }
  // Load videos from localStorage and normalize structure
  const [videos, setVideos] = useState(() => {
    try {
      const raw = localStorage.getItem('videos');
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      // normalize older entries so they always have a title and topic snapshot
      if (!Array.isArray(parsed)) return [];
      return parsed.map((v) => ({
        id: v.id ?? Date.now(),
        url: v.url ?? '',
        videoId: v.videoId ?? '',
        thumbnail: v.thumbnail ?? '',
        title: v.title && v.title.trim() !== '' ? v.title : (v.topic ? v.topic : 'Saved Video'),
        topic: v.topic ?? '',
      }));
    } catch (e) {
      console.warn('Failed to parse stored videos', e);
      return [];
    }
  });

  // State for new video input fields
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  // State for editing an existing video
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState('');
  const [editTitle, setEditTitle] = useState('');
  // Error state for form validation
  const [error, setError] = useState(null);

  // Persist videos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('videos', JSON.stringify(videos));
    } catch (e) {
      console.warn('Failed to save videos', e);
    }
  }, [videos]);

  // Extract YouTube video ID from various URL formats
  const extractYouTubeID = (url) => {
    if (!url) return null;
    // common youtube patterns
    const regExp = /(?:youtube(?:-nocookie)?\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // Get YouTube thumbnail URL for a given video ID
  const thumbnailFor = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // Handle adding a new video
  const handleAdd = (e) => {
    e.preventDefault();
    setError(null);
    const videoId = extractYouTubeID(urlInput.trim());
    if (!videoId) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    const newVideo = {
      id: Date.now(),
      url: urlInput.trim(),
      videoId,
      thumbnail: thumbnailFor(videoId),
      // snapshot a non-empty title so it won't change when global studyTopic changes
      title: titleInput.trim() || (studyTopic ? studyTopic : 'Saved Video'),
      topic: studyTopic || '',
    };
    setVideos((v) => [...v, newVideo]);
    setUrlInput('');
    setTitleInput('');
  };

  // Handle deleting a video by id
  const handleDelete = (id) => {
    setVideos((v) => v.filter((x) => x.id !== id));
  };

  // Start editing a video
  const startEdit = (video) => {
    setEditingId(video.id);
    setEditUrl(video.url);
    setEditTitle(video.title || '');
    setError(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditUrl('');
    setEditTitle('');
    setError(null);
  };

  // Save edits to a video
  const saveEdit = (id) => {
    setError(null);
    const videoId = extractYouTubeID(editUrl.trim());
    if (!videoId) {
      setError('Please enter a valid YouTube URL');
      return;
    }
    setVideos((list) =>
      list.map((v) =>
        v.id === id
          ? {
              ...v,
              url: editUrl.trim(),
              videoId,
              thumbnail: thumbnailFor(videoId),
              // ensure title remains non-empty; fall back to previous title or topic-based default
              title: editTitle.trim() || v.title || (v.topic ? v.topic : 'Saved Video'),
            }
          : v
      )
    );
    cancelEdit();
  };

  return (
    <div>
      {/* Study Topic input card */}
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

        {/* Add video form */}
        <form onSubmit={handleAdd} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="YouTube URL"
            className={`col-span-2 w-full px-3 py-2 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
          />
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            placeholder="Optional title"
            className={`w-full px-3 py-2 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
          />
          <div className="md:col-span-3 flex gap-2 mt-2">
            <button type="submit" className="px-4 py-2 rounded bg-indigo-600 text-white">Add Video</button>
            {error && <div className="text-sm text-red-500 px-2 py-2">{error}</div>}
          </div>
        </form>
      </div>

      {/* Video cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length === 0 && (
          <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass}`}>
            <p className={`${secondaryText}`}>No videos saved yet. Add a YouTube link above to save a tutorial.</p>
          </div>
        )}

        {videos.map((video) => (
          <div key={video.id} className={`${cardBg} rounded-xl shadow-lg overflow-hidden border ${borderClass}`}>
            {editingId === video.id ? (
              // Edit mode for a video card
              <div className="p-4">
                <input className={`w-full px-3 py-2 rounded-lg border ${borderClass} mb-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`} value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
                <input className={`w-full px-3 py-2 rounded-lg border ${borderClass} mb-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-green-600 text-white" onClick={() => saveEdit(video.id)}>Save</button>
                  <button className="px-3 py-1 rounded bg-gray-400 text-black" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                {/* Video thumbnail */}
                <div className={`aspect-video ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                  {video.thumbnail ? (
                    <img src={video.thumbnail} alt={`Thumbnail for ${video.title || 'video'}`} className="object-cover w-full h-full" />
                  ) : (
                    <Video className={`w-12 h-12 ${secondaryText}`} />
                  )}
                </div>
                <div className="p-4">
                  {/* Video title and topic */}
                  <h3 className="font-semibold mb-2">{video.title || (video.topic ? `${video.topic} Tutorial` : 'Saved Video')}</h3>
                  <p className={`text-sm ${secondaryText} mb-3`} > {video.topic ? video.topic.toLowerCase() : 'this topic'}</p>
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <a href={video.url} target="_blank" rel="noreferrer" className="px-3 py-1 rounded bg-indigo-600 text-white">Open</a>
                    <button onClick={() => startEdit(video)} className="px-3 py-1 rounded bg-yellow-400 text-black">Edit</button>
                    <button onClick={() => handleDelete(video.id)} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
