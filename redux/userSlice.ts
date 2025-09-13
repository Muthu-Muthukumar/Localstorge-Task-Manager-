import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  role: 'admin' | 'user' | null
}

const initialState: UserState = {
  role: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload
      localStorage.setItem('userRole', action.payload)
    },
    loadRole: (state) => {
      const role = localStorage.getItem('userRole') as 'admin' | 'user' | null
      state.role = role
    },
  },
})

export const { setRole, loadRole } = userSlice.actions
export default userSlice.reducer
