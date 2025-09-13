'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/redux/store'
import { addTask, deleteTask, moveTask } from '@/redux/taskSlice'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import TaskCard from './TaskCard'
import { v4 as uuid } from 'uuid'

const statuses: ('todo' | 'inprogress' | 'done')[] = ['todo', 'inprogress', 'done']

export default function TaskBoard() {
  const { tasks } = useSelector((state: RootState) => state.tasks)
  const role = useSelector((state: RootState) => state.user.role)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')

  const handleAdd = () => {
    if (!title.trim()) return
    dispatch(addTask({ id: uuid(), title, status: 'todo' }))
    setTitle('')
  }

  const onDragEnd = (event: any) => {
    const { active, over } = event
    if (!over) return
    const status = over.id
    dispatch(moveTask({ id: active.id, status }))
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      {role === 'admin' && (
        <div className="mb-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="border px-2 py-1" placeholder="New task" />
          <button onClick={handleAdd} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Add</button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {statuses.map(status => (
          <div key={status} id={status} className="bg-gray-100 p-4 rounded shadow-md min-h-[200px]">
            <h2 className="font-bold capitalize mb-2">{status}</h2>
            {tasks.filter(t => t.status === status).map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ))}
      </div>
    </DndContext>
  )
}
