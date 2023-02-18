import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../state-slice/authSlice';
import TasksReducer from "../state-slice/taskSlice";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks:TasksReducer,
    }
})
