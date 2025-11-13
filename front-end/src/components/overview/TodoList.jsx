// src/components/overview/TodoList.jsx
import React from 'react';
import { ListTodo, Plus, Check, X } from 'lucide-react';

export default function TodoList({ darkMode, cardBg, borderClass, todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo }) {
  return (
    <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass} lg:col-span-2`}>
      <div className="flex items-center gap-2 mb-4">
        <ListTodo className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">To-Do List</h2>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-2 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-700' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-indigo-600`}
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-3 p-3 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                todo.completed
                  ? 'bg-indigo-600 border-indigo-600'
                  : darkMode ? 'border-gray-500' : 'border-gray-400'
              }`}
            >
              {todo.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <span className={`flex-1 ${todo.completed ? 'line-through opacity-60' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
