import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllTasks, CreateTask, TaskUpdate } from "../../Helpers/TaskService";



const initialState = {
    tasks: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:""
}

// Get All Tasks From Server

export const getAllTask = createAsyncThunk("/client/tasks", async (thunkAPI) => {
    try {
        return await AllTasks()
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// Create task

export const createTask = createAsyncThunk("/client/task", async (thunkAPI,taskData) => {
    try {
        return await CreateTask(taskData)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateTask = createAsyncThunk("/client/task/update", async (thunkAPI,taskData) => {
    try {
        const res = await TaskUpdate(taskData)
        console.log(res);
        return res
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        resetTasks: (state) => {
            state.tasks = []
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message=""
                
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllTask.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.tasks = action.payload
            })
            .addCase(getAllTask.rejected, (state, action) =>{
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
            })
            .addCase(createTask.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.tasks = action.payload
            })
            .addCase(createTask.rejected, (state, action) =>{
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload
            })
         
    }
})


export const { resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;