import { createSlice } from '@reduxjs/toolkit';

//Estado inicial del slice
const initialState = {
  occupationsList: []
};

export const occupationSlice = createSlice({
  name: 'occupations',
  initialState,
  reducers: {
    getOccupations: (state, action) => {
      state.occupationsList = action.payload;
    }
  }
});

export const { getOccupations } = occupationSlice.actions;
export default occupationSlice.reducer;
