/* EXPORTS: TodoApp as default */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('wild-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('wild-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
          Wild Todo
        </h1>
        <p className="text-emerald-100 text-lg">
          Organize your tasks in nature's embrace
        </p>
      </motion.div>

      {/* Add Todo Input */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-6 mb-6"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, addTodo)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl 
                     text-white placeholder-white/70 backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-emerald-400/50 
                     focus:border-emerald-400/50 transition-all duration-300"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTodo}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 
                     text-white rounded-xl font-medium shadow-lg
                     hover:from-emerald-600 hover:to-teal-700 
                     transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 mb-6"
      >
        <div className="flex gap-2 justify-center">
          {['all', 'active', 'completed'].map((filterType) => (
            <motion.button
              key={filterType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all duration-300 ${
                filter === filterType
                  ? 'bg-white/30 text-white shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {filterType}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Todo List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              layout
              className="glass-card p-4 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {/* Complete Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleComplete(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                           transition-all duration-300 ${
                    todo.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-white/50 hover:border-emerald-400'
                  }`}
                >
                  {todo.completed && <Check size={14} />}
                </motion.button>

                {/* Todo Content */}
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                      className="w-full px-3 py-1 bg-white/20 border border-white/30 
                               rounded-lg text-white placeholder-white/70 backdrop-blur-sm
                               focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`text-white transition-all duration-300 ${
                        todo.completed
                          ? 'line-through opacity-60'
                          : 'opacity-90'
                      }`}
                    >
                      {todo.text}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {editingId === todo.id ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={saveEdit}
                        className="p-2 text-emerald-400 hover:text-emerald-300 
                                 hover:bg-white/10 rounded-lg transition-all duration-300"
                      >
                        <Check size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={cancelEdit}
                        className="p-2 text-red-400 hover:text-red-300 
                                 hover:bg-white/10 rounded-lg transition-all duration-300"
                      >
                        <X size={16} />
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEdit(todo.id, todo.text)}
                        className="p-2 text-blue-400 hover:text-blue-300 
                                 hover:bg-white/10 rounded-lg transition-all duration-300"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTodo(todo.id)}
                        className="p-2 text-red-400 hover:text-red-300 
                                 hover:bg-white/10 rounded-lg transition-all duration-300"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredTodos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-8 text-center"
        >
          <div className="text-white/60 text-lg">
            {filter === 'active' && 'No active tasks'}
            {filter === 'completed' && 'No completed tasks'}
            {filter === 'all' && 'No tasks yet'}
          </div>
          <div className="text-white/40 text-sm mt-2">
            {filter === 'all' && 'Add your first task above to get started!'}
            {filter === 'active' && 'All tasks are completed!'}
            {filter === 'completed' && 'Complete some tasks to see them here.'}
          </div>
        </motion.div>
      )}

      {/* Stats */}
      {todos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 mt-6"
        >
          <div className="flex justify-center gap-6 text-sm text-white/80">
            <span>Total: {todos.length}</span>
            <span>Active: {todos.filter(t => !t.completed).length}</span>
            <span>Completed: {todos.filter(t => t.completed).length}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export { TodoApp as default };