export type FieldType = 'Header' | 'ShortText' | 'LongText' | 'Number' | 'Select' | 'Radio' | 'Checkbox' | 'Date';

export interface FieldOption {
  value: string;
  label: string;
}

export interface ValidationRules {
  format?: 'text' | 'email' | 'phone';
  minLength?: number;
  maxLength?: number;
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
  required?: boolean; 
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