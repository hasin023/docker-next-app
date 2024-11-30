// app/page.tsx
"use client"
import { useState, useEffect } from "react"
import AddUserForm from "@/components/AddUserForm"
import UserList from "@/components/UserList"
import { IUser } from "@/utils/types"

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/users")

      if (!response.ok) {
        throw new Error("Failed to fetch users")
      }

      const data = await response.json()

      // Validate that data is an array
      if (!Array.isArray(data)) {
        console.error("Received non-array data:", data)
        throw new Error("Received invalid data format")
      }

      setUsers(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching users:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  const addUser = async (user: {
    name: string
    username: string
    email: string
    password: string
    role: string
  }) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })

      if (!response.ok) {
        throw new Error("Failed to add user")
      }

      await fetchUsers()
    } catch (err) {
      console.error("Error adding user:", err)
      setError(err instanceof Error ? err.message : "Failed to add user")
    }
  }

  return (
    <div className='flex flex-col items-center min-h-screen p-8 bg-gray-100'>
      <AddUserForm onAddUser={addUser} />
      {isLoading ? (
        <div className='mt-4 text-gray-600'>Loading users...</div>
      ) : error ? (
        <div className='mt-4 text-red-600'>{error}</div>
      ) : (
        <UserList users={users} />
      )}
    </div>
  )
}
