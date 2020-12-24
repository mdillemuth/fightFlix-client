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
  },
});

export const { alertAdded } = slice.actions;
export default slice.reducer;

export const setAlert = (message, type) => (dispatch) => {
  const alert = {
    message,
    type,
    id: uuidv4(),
  };

  dispatch(alertAdded(alert));
  // setTimeout(() => dispatch(), 5000);
};
