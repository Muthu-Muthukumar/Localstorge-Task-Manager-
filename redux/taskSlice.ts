import { createSlice } from '@reduxjs/toolkit'

export interface Task {
  id: string
  title: string
  status: 'todo' | 'inprogress' | 'done'
}

interface TaskState {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: [],
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    moveTask: (state, action) => {
      const { id, status } = action.payload
      const task = state.tasks.find(t => t.id === id)
      if (task) task.status = status
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    loadTasks: (state) => {
      const stored = localStorage.getItem('tasks')
      if (stored) state.tasks = JSON.parse(stored)
    },
  },
})

export const { addTask, deleteTask, moveTask, loadTasks } = taskSlice.actions
export default taskSlice.reducer
