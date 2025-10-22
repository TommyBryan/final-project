// src/hooks/useTodos.js
import { useState, useEffect } from 'react';

const TODOS_KEY = 'iNtellecta-todos';

// helper to get initial state from localStorage
const getInitialTodos = () => {
  try {
    const storedTodos = localStorage.getItem(TODOS_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [
      { id: 1, text: 'Review Chapter 5', completed: false },
      { id: 2, text: 'Complete practice problems', completed: false },
      { id: 3, text: 'Watch lecture video', completed: true }
    ];
  } catch (error) {
    console.error("Failed to load todos from localStorage:", error);
    return [
      { id: 1, text: 'Review Chapter 5', completed: false },
      { id: 2, text: 'Complete practice problems', completed: false },
      { id: 3, text: 'Watch lecture video', completed: true }
    ]; // fallback to default
  }
};

export function useTodos() {
  const [todos, setTodos] = useState(getInitialTodos);
  const [newTodo, setNewTodo] = useState('');

  // effect to save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage:", error);
    }
  }, [todos]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo };
}