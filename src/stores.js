import { createSlice ,configureStore } from '@reduxjs/toolkit'

const initialState ={
    token:"",
    userId:"",
    isLogged:false,
    task:[],
    user:{}
}
export const wizLabsTaskSlice = createSlice({
    name: 'whizlabstask',
    initialState,
    reducers: {
      login: (state,action) => {
        state.token=action.payload.token
        state.userId=action.payload.user._id
        state.user =action.payload.user
        state.isLogged=true
      },
      logout: (state) => {
        state.token=''
        state.userId=''
        state.user = {}
        state.isLogged=false
      },
      viewTask:(state,action)=>{
        state.task =action.payload.tasks;
      },
      deleteTask:(state,action)=>{
        const task = state.task
        const newTask = task.filter(item=>item._id!==action.payload)
        state.task=newTask
      },
      updateTask:(state,action)=>{
        const task = state.task
        const editTaskIndex=task.findIndex(item => item._id===action.payload._id)
        task[editTaskIndex] = action.payload
        state.task=task
      } 
    },
  })

  export const actions=wizLabsTaskSlice.actions
  export default wizLabsTaskSlice.reducer


export const store = configureStore({
  reducer: wizLabsTaskSlice.reducer,
})