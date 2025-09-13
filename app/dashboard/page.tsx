'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import TaskBoard from '@/components/TaskBoard'
import { loadRole } from '@/redux/userSlice'
import { loadTasks } from '@/redux/taskSlice'
import { useEffect } from 'react'

export default function Dashboard() {
  const role = useSelector((state: RootState) => state.user.role)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadRole())
    dispatch(loadTasks())
  }, [dispatch])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Team Task Manager ({role})</h1>
      <TaskBoard />
    </div>
  )
}
