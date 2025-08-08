import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Field, FieldType } from '@/types/form';

interface FormBuilderState {
  formName: string;
  fields: Field[];
  selectedFieldId: string | null;
}

const initialState: FormBuilderState = {
  formName: 'Untitled Form',
  fields: [],
  selectedFieldId: null,
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setFormName: (state, action: PayloadAction<string>) => {
      state.formName = action.payload;
    },

    addField: (state, action: PayloadAction<{ type: FieldType }>) => {
      const newField: Field = {
        id: nanoid(),
        type: action.payload.type,
        label: `New ${action.payload.type} Field`,
        required: false,
      };
      state.fields.push(newField);
    },

    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter(field => field.id !== action.payload);
    },

    updateField: (state, action: PayloadAction<{ id: string; changes: Partial<Field> }>) => {
      const field = state.fields.find(f => f.id === action.payload.id);
      if (field) {
        Object.assign(field, action.payload.changes);
      }
    },

    reorderFields: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      const [removed] = state.fields.splice(action.payload.startIndex, 1);
      state.fields.splice(action.payload.endIndex, 0, removed);
    },

    selectField: (state, action: PayloadAction<string | null>) => {
      state.selectedFieldId = action.payload;
    },

    resetFormBuilder: () => initialState,
  },
});

export const {
  setFormName,
  addField,
  removeField,
  updateField,
  reorderFields,
  selectField,
  resetFormBuilder,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;