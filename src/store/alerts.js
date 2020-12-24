import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const slice = createSlice({
  name: 'alerts',
  initialState: {
    list: [],
  },
  reducers: {
    alertAdded: (alerts, action) => {
      alerts.list.push(action.payload);
    },
    alertRemoved: (alerts, action) => {
      alerts.list = alerts.list.filter((a) => a.id !== action.payload);
    },
  },
});

export const { alertAdded, alertRemoved } = slice.actions;
export default slice.reducer;

export const setAlert = (message, type, timeout = 5000) => (dispatch) => {
  const alert = { message, type, id: uuidv4() };

  dispatch(alertAdded(alert));

  setTimeout(() => dispatch(alertRemoved(alert.id)), timeout);
};
