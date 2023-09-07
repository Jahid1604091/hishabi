import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { HOST } from "../utils/contstants";

const initialState = {
    userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    // socket:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    
    reducers:{
        setCredentials:(state,action)=>{
            // state.socket = io(HOST);
            state.userInfo = action.payload;
            localStorage.setItem('userInfo',JSON.stringify(action.payload));
        },
        logout:(state,action)=>{
            // state.socket = null;
            state.userInfo = null;
            localStorage.removeItem('userInfo')
            localStorage.removeItem('activeTab')
           
        }
    }
});

export const {setCredentials,logout} = authSlice.actions;
export default authSlice.reducer;