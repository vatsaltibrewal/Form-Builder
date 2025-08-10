'use client';
import { Field } from '@/types/form';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import SelectOptionsEditor from './SelectOptionsEditor';

interface FieldSpecificSettingsProps {
  field: Field;
  onUpdate: (changes: Partial<Field>) => void;
}

export default function FieldSpecificSettings({ field, onUpdate }: FieldSpecificSettingsProps) {
  const handleValidationChange = (key: string, value: any) => {
    onUpdate({
      validation: { ...field.validation, [key]: value },
    });
  };

  switch (field.type) {
    case 'ShortText':
    case 'LongText':
      return (
        <Box>
            <FormControl fullWidth margin="normal">
                <InputLabel>Input Format</InputLabel>
                <Select
                    value={field.validation?.format || 'text'}
                    label="Input Format"
                    onChange={(e) => handleValidationChange('format', e.target.value)}
                >
                    <MenuItem value="text">Plain Text</MenuItem>
                    <MenuItem value="email">Email Address</MenuItem>
                    <MenuItem value="phone">Phone Number</MenuItem>
                </Select>
            </FormControl>
        </Box>
      );

    case 'Number':
       return (
        <Box>
          <TextField
            label="Minimum Value"
            type="number"
            fullWidth
            margin="normal"
            value={field.validation?.minLength || ''}
            onChange={(e) => handleValidationChange('minLength', Number(e.target.value))}
          />
          <TextField
            label="Maximum Value"
            type="number"
            fullWidth
            margin="normal"
            value={field.validation?.maxLength || ''}
            onChange={(e) => handleValidationChange('maxLength', Number(e.target.value))}
          />
        </Box>
      );

    case 'Select':
    case 'Radio':
    case 'Checkbox':
      return <SelectOptionsEditor field={field} onUpdate={onUpdate} />;
    default:
      return null;
  }
}