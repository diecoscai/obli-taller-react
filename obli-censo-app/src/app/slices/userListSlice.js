import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userArr: [],
};

export const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    onGetUser: (state, action) => {
      state.userArr = action.payload;
      console.log(state.userArr);
    },
    onDeleteUser: (state, action) => {
      const { payload } = action; 
      const newUserList = state.userList.filter((user) => user.id !== payload);
      state.userList = newUserList;
    },
    onAddUser: (state, action) => {
      const { payload } = action;
      state.userList = [...state.userList, payload];
    },
  },
});

export const { onGetUser, onDeleteUser, onAddUser } = userListSlice.actions;
export default userListSlice.reducer;
