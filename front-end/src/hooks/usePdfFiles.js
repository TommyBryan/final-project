
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import * as pdfService from '../services/pdfFiles';
import { ensureUserProfile } from '../services/profileHelpers';

export function usePdfFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) {
        setFiles([]);
        setLoading(false);
        return;
      }
      const data = await pdfService.listPdfFiles({ userId });
      setFiles(data);
    } catch (err) {
      console.error('Error fetching pdf files:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    const channel = supabase
      .channel('public:pdf_files')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pdf_files' }, () => {
        load();
      })
      .subscribe();

    return () => channel.unsubscribe();
  }, []);

  const add = async ({ file_name, file_url }) => {
    // Ensure profile exists before inserting
    const profile = await ensureUserProfile();
    const newFile = await pdfService.addPdfFile({ user_id: profile.id, file_name, file_url });
    setFiles(prev => [newFile, ...prev]);
    return newFile;
  };

  const remove = async (id) => {
    await pdfService.deletePdfFile(id);
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return { files, loading, error, add, remove, reload: load };
}
