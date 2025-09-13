'use client'
import { useDispatch } from 'react-redux'
import { setRole } from '@/redux/userSlice'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSelect = (role: 'admin' | 'user') => {
    dispatch(setRole(role))
    router.push('/dashboard')
  }

  return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-2xl mb-4">Select Role</h1>
      <button onClick={() => handleSelect('admin')} className="bg-blue-600 text-white px-4 py-2 m-2 rounded">Admin</button>
      <button onClick={() => handleSelect('user')} className="bg-green-600 text-white px-4 py-2 m-2 rounded">User</button>
    </div>
  )
}
