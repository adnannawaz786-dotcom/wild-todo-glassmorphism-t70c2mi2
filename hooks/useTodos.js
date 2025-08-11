/* EXPORTS: useTodos */

import { useState, useEffect, useCallback } from 'react';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadTodos = () => {
      try {
        const savedTodos = localStorage.getItem('wild-todos');
        if (savedTodos) {
          const parsedTodos = JSON.parse(savedTodos);
          setTodos(parsedTodos);
        }
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('wild-todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos, loading]);

  // Add new todo
  const addTodo = useCallback((text) => {
    if (!text.trim()) return;
    
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  // Edit todo text
  const editTodo = useCallback((id, newText) => {
    if (!newText.trim()) return;

    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              text: newText.trim(),
              updatedAt: new Date().toISOString(),
            }
          : todo
      )
    );
  }, []);

  // Clear all completed todos
  const clearCompleted = useCallback(() => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  }, []);

  // Mark all todos as completed
  const markAllCompleted = useCallback(() => {
    setTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: true,
        updatedAt: new Date().toISOString(),
      }))
    );
  }, []);

  // Get filtered todos
  const getFilteredTodos = useCallback((filter) => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos]);

  // Get todo statistics
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
  };

  return {
    todos,
    loading,
    stats,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    markAllCompleted,
    getFilteredTodos,
  };
};

export { useTodos };