import { createSlice } from '@reduxjs/toolkit';
import { fetchMovies } from './movies';
import { setAlert } from './alerts';
import axios from 'axios';

const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    favorites: [],
    loading: false,
  },
  reducers: {
    userRetrieved: (state, action) => {
      state.user = action.payload;
      state.favorites = action.payload.FavoriteMovies;
    },

    requestSent: (state) => {
      state.loading = true;
    },

    requestResolved: (state) => {
      state.loading = false;
    },

    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    userLoggedOut: (state) => {
      state.user = null;
      state.token = null;
    },

    accountDeleted: (state) => {
      state.user = null;
      state.token = null;
    },

    accountUpdated: (state) => {
      state.user = null;
      state.token = null;
    },

    favoriteAdded: (state, action) => {
      state.favorites = action.payload.FavoriteMovies;
    },

    favoriteRemoved: (state, action) => {
      state.favorites = action.payload.FavoriteMovies;
    },
  },
});

export const {
  requestSent,
  requestResolved,
  userLoggedIn,
  userLoggedOut,
  userRetrieved,
  accountDeleted,
  accountUpdated,
  favoriteAdded,
  favoriteRemoved,
} = slice.actions;
export default slice.reducer;

// API call to log in user
export const loginUser = (username, password) => (dispatch) => {
  dispatch(requestSent());

  axios
    .post(`https://my-fight-flix.herokuapp.com/api/login`, {
      Username: username,
      Password: password,
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', response.data.user.Username);
      dispatch(fetchMovies(response.data.token));
      dispatch(userLoggedIn(response.data));
      dispatch(requestResolved());
    })
    .catch((e) => {
      dispatch(setAlert('Invalid username or password', 'danger'));
      dispatch(requestResolved());
    });
};

// API call to retrieve user information
export const fetchUser = () => async (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `https://my-fight-flix.herokuapp.com/api/users/${username}`,
    config
  );

  dispatch(userRetrieved(response.data[0]));
};

// API call to update user's account and log them out
export const updateAccount = (
  newUsername,
  newPassword,
  newEmail,
  newBirthday
) => (dispatch) => {
  dispatch(requestSent());
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  axios
    .put(
      `https://my-fight-flix.herokuapp.com/api/users/${username}`,
      {
        Username: newUsername,
        Password: newPassword,
        Email: newEmail,
        Birthday: newBirthday,
      },
      config
    )
    .then(() => {
      dispatch(accountUpdated());
      dispatch(requestResolved());
      window.open('/', '_self');
      dispatch(
        setAlert('Account Update Successful: Please login again', 'success')
      );

      removeLocalStorage();
    })
    .catch(() => {
      dispatch(
        setAlert('Update Failed: Username or email unavailable', 'danger')
      );
      dispatch(requestResolved());
    });
};

// API call to delete user's account and log them out
export const deleteAccount = () => (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (window.confirm('Are you sure you wish to remove your account?')) {
    axios
      .delete(
        `https://my-fight-flix.herokuapp.com/api/users/${username}`,
        config
      )
      .then(() => {
        dispatch(accountDeleted());
        dispatch(setAlert('Account Deleted Successfully', 'success'));
        removeLocalStorage();
      })
      .catch((e) => {
        dispatch(setAlert('Account Deletion Failed', 'danger'));
      });
  }
};

// API call to register a new user
export const registerAccount = (username, password, email, birthday) => (
  dispatch
) => {
  dispatch(requestSent());

  axios
    .post('https://my-fight-flix.herokuapp.com/api/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
    .then(() => {
      window.open('/', '_self');
      dispatch(setAlert(`Registration Successful!`, 'success'));
      dispatch(requestResolved());
    })
    .catch(() => {
      dispatch(
        setAlert('Registration Failed: Email or Username unavailable', 'danger')
      );
      dispatch(requestResolved());
    });
};

// Logging out user
export const logoutUser = () => (dispatch) => {
  removeLocalStorage();
  dispatch(userLoggedOut());
};

// Helper function to clean up local storage
const removeLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// API call to add favorite movie
export const addFavorite = (movieId) => async (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
    {},
    config
  );

  dispatch(favoriteAdded(response.data));
};

// API call to remove favorite movie
export const removeFavorite = (movieId) => async (dispatch) => {
  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `https://my-fight-flix.herokuapp.com/api/users/${username}/${movieId}`,
    config
  );

  dispatch(favoriteRemoved(response.data));
};
