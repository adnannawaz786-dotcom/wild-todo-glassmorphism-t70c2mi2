/* EXPORTS: TodoStats as default */

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target, TrendingUp } from 'lucide-react';

const TodoStats = ({ todos = [] }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      icon: Target,
      label: 'Total Tasks',
      value: totalTasks,
      color: 'text-amber-600',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      icon: CheckCircle2,
      label: 'Completed',
      value: completedTasks,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      icon: Circle,
      label: 'Pending',
      value: pendingTasks,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20'
    },
    {
      icon: TrendingUp,
      label: 'Progress',
      value: `${completionRate}%`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className={`
            relative p-4 rounded-xl border backdrop-blur-md
            bg-white/10 ${stat.borderColor}
            hover:bg-white/20 transition-all duration-300
            group cursor-default
          `}
        >
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-50" />
          
          <div className="relative z-10">
            <div className={`
              inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3
              ${stat.bgColor} ${stat.borderColor} border
              group-hover:scale-110 transition-transform duration-300
            `}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            
            <div className="space-y-1">
              <motion.div
                className={`text-2xl font-bold ${stat.color}`}
                initial={{ scale: 1 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {stat.label}
              </div>
            </div>
          </div>

          {/* Animated border glow on hover */}
          <motion.div
            className={`
              absolute inset-0 rounded-xl border-2 opacity-0
              ${stat.borderColor} group-hover:opacity-50
            `}
            initial={false}
            animate={{ opacity: 0 }}
            whileHover={{ opacity: 0.5 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}

      {/* Progress bar for completion rate */}
      {totalTasks > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="col-span-2 lg:col-span-4 mt-4"
        >
          <div className="relative p-4 rounded-xl border backdrop-blur-md bg-white/10 border-white/20">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-50" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Overall Progress
                </span>
                <span className="text-sm font-semibold text-purple-600">
                  {completedTasks} of {totalTasks} completed
                </span>
              </div>
              
              <div className="w-full bg-slate-200/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-purple-500 rounded-full shadow-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export { TodoStats as default };