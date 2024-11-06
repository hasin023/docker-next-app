// components/AddUserForm.tsx

import { useState } from "react"

interface AddUserFormProps {
  onAddUser: (user: {
    name: string
    username: string
    email: string
    password: string
    role: string
  }) => void
}

export default function AddUserForm({ onAddUser }: AddUserFormProps) {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddUser({ name, username, email, password, role })
    setName("")
    setUsername("")
    setEmail("")
    setPassword("")
    setRole("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='bg-white shadow-lg rounded-lg p-6 max-w-lg w-full flex flex-col gap-4'
    >
      <h2 className='text-2xl font-semibold text-center text-gray-700 mb-4'>
        Add New User
      </h2>
      <input
        type='text'
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <input
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <input
        type='text'
        placeholder='Role'
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className='border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        required
      />
      <button
        type='submit'
        className='bg-blue-500 text-white rounded-lg py-2 mt-2 hover:bg-blue-600 transition duration-200'
      >
        Add User
      </button>
    </form>
  )
}
