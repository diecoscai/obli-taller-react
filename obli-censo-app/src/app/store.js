import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlices';
import deptoSlice from './slices/deptoSlice';
import citySlice from './slices/citySlice';
import occupationSlice from './slices/occupationSlice';
import personSlice from './slices/personSlice';
import totalCensadosSlice from './slices/totalCensadosSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    deptos: deptoSlice,
    cities: citySlice,
    occupations: occupationSlice,
    personList: personSlice,
    totalCensados: totalCensadosSlice
  }
});
