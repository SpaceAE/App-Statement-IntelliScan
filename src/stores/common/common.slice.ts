import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    hideLoading: state => {
      state.loading = false;
    },
    showLoading: state => {
      state.loading = true;
    },
  },
});

export const { hideLoading, showLoading } = commonSlice.actions;

export default commonSlice.reducer;
