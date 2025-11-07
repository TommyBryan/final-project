// src/components/VideosTab.jsx
import React, { useState, useEffect } from 'react';
import { Video } from 'lucide-react';

export default function VideosTab({ darkMode, cardBg, textClass, secondaryText, borderClass, studyTopic, setStudyTopic }) {
  // videos stored locally: { id, url, videoId, thumbnail, title }
  const [videos, setVideos] = useState(() => {
    try {
      const raw = localStorage.getItem('videos');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Failed to parse stored videos', e);
      return [];
    }
  });

  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editUrl, setEditUrl] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('videos', JSON.stringify(videos));
    } catch (e) {
      console.warn('Failed to save videos', e);
    }
  }, [videos]);

  const extractYouTubeID = (url) => {
    if (!url) return null;
    // common youtube patterns
    const regExp = /(?:youtube(?:-nocookie)?\.com\/(?:.*v=|v\/|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const thumbnailFor = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

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
      title: titleInput.trim() || ''
    };
    setVideos((v) => [...v, newVideo]);
    setUrlInput('');
    setTitleInput('');
  };

  const handleDelete = (id) => {
    setVideos((v) => v.filter((x) => x.id !== id));
  };

  const startEdit = (video) => {
    setEditingId(video.id);
    setEditUrl(video.url);
    setEditTitle(video.title || '');
    setError(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditUrl('');
    setEditTitle('');
    setError(null);
  };

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
          ? { ...v, url: editUrl.trim(), videoId, thumbnail: thumbnailFor(videoId), title: editTitle.trim() }
          : v
      )
    );
    cancelEdit();
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length === 0 && (
          <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass}`}>
            <p className={`${secondaryText}`}>No videos saved yet. Add a YouTube link above to save a tutorial.</p>
          </div>
        )}

        {videos.map((video) => (
          <div key={video.id} className={`${cardBg} rounded-xl shadow-lg overflow-hidden border ${borderClass}`}>
            {editingId === video.id ? (
              <div className="p-4">
                <input className={`w-full px-3 py-2 rounded-lg border ${borderClass} mb-2`} value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
                <input className={`w-full px-3 py-2 rounded-lg border ${borderClass} mb-2`} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded bg-green-600 text-white" onClick={() => saveEdit(video.id)}>Save</button>
                  <button className="px-3 py-1 rounded bg-gray-400 text-black" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className={`aspect-video ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                  {video.thumbnail ? (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img src={video.thumbnail} alt={`Thumbnail for ${video.title || 'video'}`} className="object-cover w-full h-full" />
                  ) : (
                    <Video className={`w-12 h-12 ${secondaryText}`} />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{video.title || studyTopic + ' Tutorial'}</h3>
                  <p className={`text-sm ${secondaryText} mb-3`}>Tutorial about {studyTopic.toLowerCase()}</p>
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