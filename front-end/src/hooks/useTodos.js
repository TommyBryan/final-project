// src/hooks/useTodos.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import * as todosService from '../services/todos';
import { ensureUserProfile } from '../services/profileHelpers';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) {
        setTodos([]);
        setLoading(false);
        return;
      }
      const data = await todosService.listTodos({ userId });
      setTodos(data);
    } catch (error) {
      console.error('Error loading todos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch todos on mount
  useEffect(() => {
    load();
  }, []);

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      await todosService.updateTodo(id, { completed: !todo.completed });
      setTodos(todos.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      // Ensure profile exists before inserting
      const profile = await ensureUserProfile();
      console.log('Profile for todo:', profile);
      
      const newTodoItem = await todosService.addTodo({
        user_id: profile.id,
        text: newTodo.trim(),
        completed: false,
      });

      console.log('Todo added successfully:', newTodoItem);
      setTodos([newTodoItem, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.error("Error adding todo:", error);
      alert(`Failed to add todo: ${error.message}`);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todosService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return { todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo, loading };
}
