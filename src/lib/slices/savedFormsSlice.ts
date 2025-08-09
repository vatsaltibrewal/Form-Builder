import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchema } from '@/types/form';

interface SavedFormsState {
  forms: FormSchema[];
  isLoading: boolean;
}

const initialState: SavedFormsState = {
  forms: [],
  isLoading: true,
};

const savedFormsSlice = createSlice({
  name: 'savedForms',
  initialState,
  reducers: {
    loadForms: (state, action: PayloadAction<FormSchema[]>) => {
      state.forms = action.payload.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      state.isLoading = false;
    },
    deleteForm: (state, action: PayloadAction<string>) => {
        state.forms = state.forms.filter(form => form.id !== action.payload);
    }
  },
});

export const { loadForms, deleteForm } = savedFormsSlice.actions;
export default savedFormsSlice.reducer;