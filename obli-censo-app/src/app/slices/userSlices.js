import { createSlice } from "@reduxjs/toolkit";

//Estado inicial del slice
const initialState = {
    userLogged: null,
    userRegistered: [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //Funciones que modifican el estado
        setUserLogged: (state, action) => {
            state.userLogged = action.payload;
        },
        onAddUser: (state, action) => {
            const { payload } = action;
            console.log('Payload:' + payload);
            state.userRegistered = [...state.userRegistered, payload];
        },
    }
});

export const { setUserLogged, setUserRegistered } = userSlice.actions;
export default userSlice.reducer;