import React, { useState, useRef, useEffect } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  function saveEdit() {
    const trimmed = draft.trim()
    if (!trimmed) {
      // optional: deleting when emptied
      onDelete()
    } else {
      onEdit(trimmed)
    }
    setIsEditing(false)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="checkbox">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      </label>

      {!isEditing ? (
        <div className="view" onDoubleClick={() => { setDraft(todo.text); setIsEditing(true) }}>
          <span className="text">{todo.text}</span>
          <div className="actions">
            <button onClick={() => { setDraft(todo.text); setIsEditing(true) }} title="Edit">Edit</button>
            <button onClick={onDelete} title="Delete">Delete</button>
          </div>
        </div>
      ) : (
        <div className="edit">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit()
              if (e.key === 'Escape') { setIsEditing(false); setDraft(todo.text) }
            }}
          />
          <button onClick={saveEdit}>Save</button>
        </div>
      )}
    </li>
  )
}
