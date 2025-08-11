/* EXPORTS: TodoForm as default */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

const TodoForm = ({ onAddTodo, isOpen, onToggle }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onAddTodo(newTodo);
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('general');
    
    // Close form on mobile after adding
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low', color: 'text-emerald-600' },
    { value: 'medium', label: 'Medium', color: 'text-amber-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ];

  const categoryOptions = [
    { value: 'general', label: 'General', icon: '📝' },
    { value: 'work', label: 'Work', icon: '💼' },
    { value: 'personal', label: 'Personal', icon: '🏠' },
    { value: 'health', label: 'Health', icon: '🌿' },
    { value: 'learning', label: 'Learning', icon: '📚' }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500/80 to-teal-600/80 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -20,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`
          ${isOpen ? 'block' : 'hidden md:block'}
          w-full mb-8 overflow-hidden
        `}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Add New Task</h2>
            <button
              onClick={onToggle}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Task Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                maxLength={100}
              />
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add more details..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                maxLength={300}
              />
            </div>

            {/* Priority and Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Priority Select */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                >
                  {priorityOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-800">
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!title.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200"
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Task</span>
              </div>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export { TodoForm as default };