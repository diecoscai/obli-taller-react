import { createSlice } from '@reduxjs/toolkit';

//Estado inicial del slice
const initialState = {
  citiesList: []
};

export const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    getCities: (state, action) => {
      state.citiesList = action.payload;
    }
  }
});

export const { getCities } = citySlice.actions;
export default citySlice.reducer;
