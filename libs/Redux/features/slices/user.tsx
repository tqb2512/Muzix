import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
}

const initialState: User = {
    id: "",
    username: "",
    email: "",
    password: "",
    role: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.role = action.payload.role;
        },
        clearUser: (state) => {
            state.id = "";
            state.username = "";
            state.email = "";
            state.password = "";
            state.role = "";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
