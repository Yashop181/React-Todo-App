import { createSlice } from "@reduxjs/toolkit";

const initialState={
    task:[],
    status:false,
    workdata:"",
}

const todoSlice = createSlice({
    name : "todo",
    initialState:initialState,
    reducers:{
        addTask:(state,action)=>{
            state.task.push({id:Date.now(),work:action.payload,status:true});
        },
        deleteTask:(state,action)=>{
            state.task = state.task.filter(item => item.id!==action.payload)        
        },
        CompleteTask:(state,action)=>{
            for (let i=0;i<state.task.length;i++){
                if(state.task[i].id === action.payload){
                    state.task[i].status = false;
                }
            }
        },
        unCompleteTask:(state,action)=>{
            for (let i=0;i<state.task.length;i++){
                if(state.task[i].id === action.payload){
                    state.task[i].status = true;
                }
            }
        },

        editData:(state, action)=>{
            for (let i=0;i<state.task.length;i++){
                if(state.task[i].id === action.payload){
                   state.workdata=state.task[i].work ;
                }
            }

        },

        MyEditSave:(state, action)=>{
            for (let i=0;i<state.task.length;i++){
                if(state.task[i].id === action.payload.id){
                    state.task[i].work=action.payload.myData;
                }
            }

        }
    }

})

export const {addTask,deleteTask,CompleteTask,unCompleteTask, editData, MyEditSave} = todoSlice.actions;
export default todoSlice.reducer;