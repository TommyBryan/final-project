// src/hooks/useTodos.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';

// Helper to fetch todos from Supabase
const fetchTodos = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) return [];

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error);
    return [];
  }

  return data || [];
};

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch todos on mount
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setLoading(false);
    };
    loadTodos();
  }, []);

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    const { error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id);

    if (!error) {
      setTodos(todos.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } else {
      console.error("Error updating todo:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    const { data, error } = await supabase
      .from('todos')
      .insert([{ 
        text: newTodo.trim(), 
        completed: false,
        user_id: (await supabase.auth.getSession()).data.session?.user?.id
      }])
      .select()
      .single();

    if (!error && data) {
      setTodos([data, ...todos]);
      setNewTodo('');
    } else {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (!error) {
      setTodos(todos.filter(todo => todo.id !== id));
    } else {
      console.error("Error deleting todo:", error);
    }
  };

  return { todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo, loading };
}
