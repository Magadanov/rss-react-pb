import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '@app/types/form.type';
import { countries } from '@app/data/countries';

interface State {
  data: FormData[];
  countries: string[];
}

const initialState: State = {
  data: [],
  countries,
};

export const formSlicer = createSlice({
  name: 'formSlicer',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<FormData>) => {
      state.data.unshift({ ...action.payload, isNew: true });
    },
    makeFormDataReadable: (state) => {
      state.data = state.data.map((form) => ({ ...form, isNew: false }));
    },
  },
});

export const formReducer = formSlicer.reducer;
export const { addData, makeFormDataReadable } = formSlicer.actions;
