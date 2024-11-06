// components/UserList.tsx

import { useRouter } from "next/navigation"
import { IUser } from "@/utils/types"

interface UserListProps {
  users: IUser[]
}

export default function UserList({ users }: UserListProps) {
  const router = useRouter()

  const handleUserClick = (userId: number) => {
    router.push(`/${userId}/notes`)
  }

  return (
    <ul>
      {users.map((user) => (
        <li
          key={user.id}
          className='cursor-pointer border-b p-2 hover:bg-gray-100'
          onClick={() => handleUserClick(user.id)}
        >
          {user.name} ({user.username})
        </li>
      ))}
    </ul>
  )
}
