// src/hooks/useTodos.js
import { useState } from 'react';

export function useTodos() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review Chapter 5', completed: false },
    { id: 2, text: 'Complete practice problems', completed: false },
    { id: 3, text: 'Watch lecture video', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');

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