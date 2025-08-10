'use client';
import { Control, Controller } from 'react-hook-form';
import { Field } from '@/types/form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  TextField, FormControl, FormLabel, RadioGroup, FormGroup, FormControlLabel, Radio, Checkbox, Select, MenuItem, InputLabel, FormHelperText, Typography, Box
} from '@mui/material';

const emailRegex = /^\S+@\S+$/i;
const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

interface RenderFieldProps {
  field: Field;
  control: Control<any>;
}

export default function RenderField({ field, control }: RenderFieldProps) {
  const rules = {
    required: field.required ? 'This field is required' : false,
    pattern: field.validation?.format === 'email' ? { value: emailRegex, message: 'Please enter a valid email address' }
           : field.validation?.format === 'phone' ? { value: phoneRegex, message: 'Please enter a valid phone number' }
           : undefined,
  };

  if (field.type === 'Header') {
    return (
      <Box sx={{ my: 3, borderLeft: 4, borderColor: 'primary.main', pl: 2 }}>
        <Typography variant="h4" component="h2">{field.label}</Typography>
        {field.placeholder && <Typography color="text.secondary">{field.placeholder}</Typography>}
      </Box>
    );
  }

  return (
    <Controller
      name={field.id}
      control={control}
      rules={rules}
      defaultValue={field.type === 'Checkbox' ? [] : field.defaultValue || ''}
      render={({ field: controllerField, fieldState: { error } }) => {
        switch (field.type) {
          case 'ShortText':
          case 'LongText':
          case 'Number':
            return (
              <TextField
                {...controllerField}
                fullWidth
                disabled={field.isDerived}
                multiline={field.type === 'LongText'}
                rows={field.type === 'LongText' ? 4 : 1}
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
                <FormLabel component="legend">{field.label}</FormLabel>
                <FormGroup>
                  {(field.options || []).map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={controllerField.value.includes(option.value)}
                          onChange={(e) => {
                            const newValues = e.target.checked
                              ? [...controllerField.value, option.value]
                              : controllerField.value.filter((v: string) => v !== option.value);
                            controllerField.onChange(newValues);
                          }}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            );

          case 'Date':
            return (
              <DatePicker
                label={field.label}
                value={controllerField.value ? new Date(controllerField.value) : null}
                onChange={(date) => controllerField.onChange(date?.toISOString())}
                sx={{ width: '100%', mt: 2, mb: 1 }}
              />
            );

          default:
            return <></>;
        }
      }}
    />
  );
}
