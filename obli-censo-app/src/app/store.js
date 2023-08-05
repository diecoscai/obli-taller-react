import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlices';
import userListSlice from './slices/userListSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
        userList: userListSlice,
    },
});
