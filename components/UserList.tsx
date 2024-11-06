// components/UserList.tsx

import { IUser } from "@/utils/types"

interface UserListProps {
  users: IUser[]
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 max-w-lg w-full mt-8'>
      <h2 className='text-2xl font-semibold text-center text-gray-700 mb-4'>
        Users List
      </h2>
      <ul className='divide-y divide-gray-300'>
        {users.map((user) => (
          <li key={user.id} className='p-4'>
            <p className='font-semibold'>{user.name}</p>
            <p className='text-gray-600'>{user.username}</p>
            <p className='text-gray-600'>{user.email}</p>
            <p className='text-blue-500'>{user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
