'use client';
import { Control, Controller } from 'react-hook-form';
import { Field } from '@/types/form';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from '@mui/material';

interface RenderFieldProps {
  field: Field;
  control: Control<any>;
}

export default function RenderField({ field, control }: RenderFieldProps) {
  const rules = {
    required: field.required ? 'This field is required' : false,
    minLength: field.validation?.minLength
      ? { value: field.validation.minLength, message: `Minimum length is ${field.validation.minLength}` }
      : undefined,
    maxLength: field.validation?.maxLength
      ? { value: field.validation.maxLength, message: `Maximum length is ${field.validation.maxLength}` }
      : undefined,
    pattern: field.validation?.isEmail
      ? { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' }
      : field.validation?.isPassword
      ? { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, message: 'Password must be at least 8 characters and contain a number' }
      : undefined,
  };

  return (
    <Controller
      name={field.id}
      control={control}
      rules={rules}
      defaultValue={field.defaultValue || ''}
      render={({ field: controllerField, fieldState: { error } }) => {
        switch (field.type) {
          case 'Text':
          case 'Number':
          case 'Textarea':
            return (
              <TextField
                {...controllerField}
                fullWidth
                multiline={field.type === 'Textarea'}
                rows={field.type === 'Textarea' ? 4 : 1}
                type={field.type === 'Number' ? 'number' : 'text'}
                label={field.label}
                placeholder={field.placeholder}
                error={!!error}
                helperText={error ? error.message : ''}
                margin="normal"
              />
            );

          case 'Radio':
            return (
              <FormControl component="fieldset" margin="normal" error={!!error}>
                <FormLabel component="legend">{field.label}</FormLabel>
                <RadioGroup {...controllerField}>
                  {(field.options || []).map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            );

          case 'Select':
            return (
              <FormControl fullWidth margin="normal" error={!!error}>
                <InputLabel>{field.label}</InputLabel>
                <Select {...controllerField} label={field.label}>
                  {(field.options || []).map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            );

          case 'Checkbox':
            return (
              <FormControl component="fieldset" margin="normal" error={!!error}>
                <FormControlLabel
                  control={<Checkbox {...controllerField} checked={!!controllerField.value} />}
                  label={field.label}
                />
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            );

          case 'Date':
            return (
              <TextField
                {...controllerField}
                label={field.label}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={!!error}
                helperText={error ? error.message : field.placeholder}
                margin="normal"
              />
            );

          default:
            return <></>;
        }
      }}
    />
  );
}
