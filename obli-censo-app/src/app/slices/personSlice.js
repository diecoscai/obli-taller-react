import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  personArr: []
};

export const personSlice = createSlice({
  name: 'personList',
  initialState,
  reducers: {
    onGetPerson: (state, action) => {
      state.personArr = action.payload;
      console.log(state.personArr);
    },
    onDeletePerson: (state, action) => {
      const { payload } = action;
      const newPersonList = state.personList.filter((person) => person.id !== payload);
      state.personList = newPersonList;
    },
    onAddPerson: (state, action) => {
      const { payload } = action;
      state.personList = [...state.personList, payload];
    }
  }
});

export const { onGetPerson, onDeletePerson, onAddPerson } = personSlice.actions;
export default personSlice.reducer;