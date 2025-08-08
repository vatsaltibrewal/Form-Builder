export type FieldType = 'Text' | 'Number' | 'Textarea' | 'Select' | 'Radio' | 'Checkbox' | 'Date';

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string; // ISO string format
  fields: Field[];
}