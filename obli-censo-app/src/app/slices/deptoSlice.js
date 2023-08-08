import { createSlice } from '@reduxjs/toolkit';

//Estado inicial del slice
const initialState = {
  deptoList: []
};

export const deptoSlice = createSlice({
  name: 'deptos',
  initialState,
  reducers: {
    getDeptos: (state, action) => {
      state.deptoList = action.payload;
      console.log("deptoSlice: ", state.deptoList)
    }
  }
});

export const { getDeptos } = deptoSlice.actions;
export default deptoSlice.reducer;
