// app/[user_id]/notes/page.tsx

"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { INote } from "@/utils/types"

export default function UserNotesPage() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const { user_id } = useParams()

  // Fetch notes for a specific user
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`/api/users/${user_id}/notes`)
      const data = await response.json()
      setNotes(data)
    }

    fetchNotes()
  }, [user_id])

  // Handle adding a new note
  const handleAddNote = async () => {
    if (newNote.trim() === "") return

    await fetch(`/api/users/${user_id}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newNote }),
    })

    setNewNote("")

    // Refresh notes
    const response = await fetch(`/api/users/${user_id}/notes`)
    const data = await response.json()
    setNotes(data)
  }

  return (
    <div className='p-4'>
      <h2 className='text-xl font-bold mb-4'>Notes for User {user_id}</h2>
      <ul className='mb-4'>
        {notes.map((note: INote) => (
          <li key={note.id} className='border-b p-2'>
            {note.content}
          </li>
        ))}
      </ul>
      <div>
        <input
          type='text'
          placeholder='Add a new note'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className='border p-2 mb-2 w-full'
        />
        <button
          onClick={handleAddNote}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Add Note
        </button>
      </div>
    </div>
  )
}
