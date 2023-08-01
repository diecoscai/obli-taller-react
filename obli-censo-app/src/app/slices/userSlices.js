import { createSlice } from "@reduxjs/toolkit";

//Estado inicial del slice
const initialState = {
    userLogged: null,
    userRegistered: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //Funciones que modifican el estado
        setUserLogged: (state, action) => {
            state.userLogged = action.payload;
        },
        setUserRegistered: (state, action) => {
            state.userRegistered = action.payload;
        },
    }
});

export const { setUserLogged, setUserRegistered } = userSlice.actions;
export default userSlice.reducer;