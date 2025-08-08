export type FieldType = 'Text' | 'Number' | 'Textarea' | 'Select' | 'Radio' | 'Checkbox' | 'Date';

export interface FieldOption {
  value: string;
  label: string;
}

export interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isPassword?: boolean;
}

export interface Derivation {
  parentFields: string[];
  logic: 'ageFromDate';
}

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  defaultValue?: any;
  placeholder?: string;

  options?: FieldOption[];
  
  validation?: ValidationRules;

  isDerived?: boolean;
  derivation?: Derivation;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string; // ISO string format
  fields: Field[];
}