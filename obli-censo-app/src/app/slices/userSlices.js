import { createSlice } from '@reduxjs/toolkit';
import {
  getItemFromLocalSotrage,
  removeUserFromLocalStorage,
  setUserToLocalStorage
} from '../../utils/storage';
//Estado inicial del slice
const initialState = {
  userLogged: getItemFromLocalSotrage('censoAppUser')
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //Funciones que modifican el estado
    onLogin: (state, action) => {
      state.userLogged = action.payload;
      setUserToLocalStorage(action.payload);
    },
    onLogout: (state) => {
      removeUserFromLocalStorage();
      state.userLogged = null;
    },
  }
});

export const { onLogin, onLogout, setUserRegistered } = userSlice.actions;
export default userSlice.reducer;
