import React, { useState, useEffect } from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import './App.css'

const STORAGE_KEY = 'my_todos_v1'

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [filter, setFilter] = useState('all') 

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addTodo(text) {
    const newTodo = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      text: text.trim(),
      completed: false,
      createdAt: Date.now()
    }
    setTodos(prev => [newTodo, ...prev])
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function editTodo(id, newText) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text: newText } : t))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const remaining = todos.filter(t => !t.completed).length

  return (
    <div className="container">
      <header>
        <h1>To-Do List</h1>
      </header>

      <main>
        <AddTodo onAdd={addTodo} />

        <div className="controls">
          <div className="filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')} style={{ color: 'var(--text)' }}>All</button>
            <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')} style={{ color: 'var(--text)' }}>Active</button>
            <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')} style={{ color: 'var(--text)' }}>Completed</button>
          </div>

          <div className="meta">
            <span>{remaining} left</span>
            <button onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>

        <TodoList
          todos={filtered}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </main>
    </div>
  )
}

export default App
