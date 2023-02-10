import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Login, Logout, Register } from "../../Helpers/AuthService";
import { getUserDetails } from "../../Helpers/SessionHelper";


const user = getUserDetails();

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:""
}

// Register

export const register = createAsyncThunk("/auth/register", async (user, thunkAPI) => {
    try {
        return await Register(user)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// Login

export const login = createAsyncThunk("/auth/login", async (user, thunkAPI) => {
    try {
        return await Login(user)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

// Logout

export const logout = createAsyncThunk("/auth/login", async () => {
    await Logout()

})
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message=""
                
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload,
                    state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isSuccess = true,
                    state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false,
                    state.isError = true,
                    state.message = action.payload,
                    state.user = null
            })
    }
})


export const { reset } = authSlice.actions;
export default authSlice.reducer;