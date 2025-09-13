'use client'
import { useDraggable } from '@dnd-kit/core'
import { Task } from '@/redux/taskSlice'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '@/redux/taskSlice'
import { RootState } from '@/redux/store'

export default function TaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef } = useDraggable({ id: task.id })
  const role = useSelector((state: RootState) => state.user.role)
  const dispatch = useDispatch()

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
         className="bg-white p-2 rounded shadow mb-2 cursor-move flex justify-between items-center">
      <span>{task.title}</span>
      {role === 'admin' && (
        <button onClick={() => dispatch(deleteTask(task.id))} className="text-red-600">X</button>
      )}
    </div>
  )
}
