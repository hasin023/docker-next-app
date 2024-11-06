// app/page.tsx

"use client"

import { useState, useEffect } from "react"
import AddUserForm from "@/components/AddUserForm"
import UserList from "@/components/UserList"
import { IUser } from "@/utils/types"

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const response = await fetch("/api/users")
    const data = await response.json()
    setUsers(data)
  }

  const addUser = async (user: {
    name: string
    username: string
    email: string
    password: string
    role: string
  }) => {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
    fetchUsers()
  }

  return (
    <div className='flex flex-col items-center min-h-screen p-8 bg-gray-100'>
      <AddUserForm onAddUser={addUser} />
      <UserList users={users} />
    </div>
  )
}
