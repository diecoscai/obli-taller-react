import { createSlice } from '@reduxjs/toolkit';

//Estado inicial del slice
const initialState = {
    totalCensados: []
};

export const totalCensadosSlice = createSlice({
    name: 'totalCensados',
    initialState,
    reducers: {
        getTotalCensados: (state, action) => {
            state.totalCensados = action.payload;
        }
    }
});

export const { getTotalCensados } = totalCensadosSlice.actions;
export default totalCensadosSlice.reducer;
