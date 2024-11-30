// components/UserList.tsx
import { useRouter } from "next/navigation"
import { IUser } from "@/utils/types"

interface UserListProps {
  users: IUser[]
}

export default function UserList({ users }: UserListProps) {
  const router = useRouter()

  // Add a check to ensure users is an array before mapping
  if (!Array.isArray(users)) {
    return <div className='text-red-600'>No users available</div>
  }

  // If users array is empty, show a message
  if (users.length === 0) {
    return <div className='text-gray-600'>No users found</div>
  }

  const handleUserClick = (userId: number) => {
    router.push(`/${userId}/notes`)
  }

  return (
    <ul className='w-full max-w-lg mt-4 bg-white shadow-md rounded-lg'>
      {users.map((user) => (
        <li
          key={user.id}
          className='cursor-pointer border-b last:border-b-0 p-3 hover:bg-gray-100 transition duration-200'
          onClick={() => handleUserClick(user.id)}
        >
          <div className='flex justify-between'>
            <span className='font-medium'>{user.name}</span>
            <span className='text-gray-600'>({user.username})</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
