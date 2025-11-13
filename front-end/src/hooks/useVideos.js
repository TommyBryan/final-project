import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import * as videosService from '../services/videos';
import { ensureUserProfile } from '../services/profileHelpers';

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) {
        setVideos([]);
        setLoading(false);
        return;
      }
      const data = await videosService.listVideos({ userId });
      setVideos(data);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    const channel = supabase
      .channel('public:videos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'videos' }, () => {
        load();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const add = async ({ topic, title, video_url }) => {
    // Ensure profile exists before inserting
    const profile = await ensureUserProfile();
    const newVideo = await videosService.addVideo({ user_id: profile.id, topic, title, video_url });
    setVideos(prev => [newVideo, ...prev]);
    return newVideo;
  };

  const remove = async (id) => {
    await videosService.deleteVideo(id);
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const update = async (id, changes) => {
    const updated = await videosService.updateVideo(id, changes);
    setVideos(prev => prev.map(v => (v.id === id ? updated : v)));
    return updated;
  };

  return { videos, loading, error, add, remove, update, reload: load };
}
