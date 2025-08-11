/* EXPORTS: default (Home component) */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Load todos from localStorage on component mount
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
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, todo]);
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

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Wild Todo</h1>
          <p className="text-emerald-100">Organize your tasks in nature's embrace</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex justify-between items-center text-white">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalCount}</div>
              <div className="text-sm opacity-80">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{completedCount}</div>
              <div className="text-sm opacity-80">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalCount - completedCount}</div>
              <div className="text-sm opacity-80">Pending</div>
            </div>
          </div>
        </motion.div>

        {/* Add Todo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-6"
        >
          <div className="flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, addTodo)}
              placeholder="Add a new task..."
              className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            <button
              onClick={addTodo}
              className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl px-4 py-3 text-white transition-all duration-200 backdrop-blur-sm hover:scale-105"
            >
              <Plus size={20} />
            </button>
          </div>
        </motion.div>

        {/* Todo List */}
        <div className="space-y-3">
          <AnimatePresence>
            {todos.map((todo, index) => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -300, scale: 0.95 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`glass-card rounded-xl p-4 ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                {editingId === todo.id ? (
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                      className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="text-green-200 hover:text-green-100 p-1 transition-colors"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="text-red-200 hover:text-red-100 p-1 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        todo.completed
                          ? 'bg-green-400 border-green-400'
                          : 'border-white/50 hover:border-white/70'
                      }`}
                    >
                      {todo.completed && <Check size={12} className="text-white" />}
                    </button>
                    
                    <span
                      className={`flex-1 text-white transition-all ${
                        todo.completed ? 'line-through opacity-60' : ''
                      }`}
                    >
                      {todo.text}
                    </span>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="text-blue-200 hover:text-blue-100 p-1 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-200 hover:text-red-100 p-1 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-white/60 text-lg">No tasks yet</div>
            <div className="text-white/40 text-sm mt-2">Add your first task above</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;