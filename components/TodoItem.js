/* EXPORTS: TodoItem */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Edit2, Trash2, X, Save } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        layout: { duration: 0.3 }
      }}
      className="group relative overflow-hidden rounded-xl backdrop-blur-md bg-white/10 border border-white/20 p-4 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Glassmorphism overlay with wild colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-amber-400/5 pointer-events-none" />
      
      <div className="relative flex items-center gap-3">
        {/* Complete/Incomplete Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            todo.completed
              ? 'bg-emerald-500/80 border-emerald-400 text-white shadow-lg shadow-emerald-500/25'
              : 'border-white/40 hover:border-emerald-400/60 hover:bg-emerald-400/10'
          }`}
        >
          {todo.completed && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Check size={14} />
            </motion.div>
          )}
        </motion.button>

        {/* Todo Text or Edit Input */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <motion.input
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 backdrop-blur-sm"
              placeholder="Enter todo text..."
              autoFocus
            />
          ) : (
            <motion.p
              layout
              className={`text-white/90 transition-all duration-300 ${
                todo.completed 
                  ? 'line-through text-white/50' 
                  : 'group-hover:text-white'
              }`}
            >
              {todo.text}
            </motion.p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-1"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 hover:text-emerald-200 transition-all duration-200"
              >
                <Save size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-red-200 transition-all duration-200"
              >
                <X size={16} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 transition-all duration-200"
              >
                <Edit2 size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 hover:text-red-200 transition-all duration-200"
              >
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Completion timestamp */}
      {todo.completed && todo.completedAt && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-white/10"
        >
          <p className="text-xs text-white/40">
            Completed {new Date(todo.completedAt).toLocaleDateString()}
          </p>
        </motion.div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export { TodoItem };