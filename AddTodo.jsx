import React, { useState } from 'react'

export default function AddTodo({ onAdd }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text)
    setText('')
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What do you need to do?"
        aria-label="Add todo"
      />
      <button type="submit">Add</button>
    </form>
  )
}
