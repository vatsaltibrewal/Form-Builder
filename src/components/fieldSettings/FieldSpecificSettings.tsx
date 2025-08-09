'use client';
import { Field } from '@/types/form';
import { Box, TextField, FormControlLabel, Checkbox } from '@mui/material';
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
    case 'Text':
    case 'Textarea':
      return (
        <Box>
          <TextField
            label="Minimum Length"
            type="number"
            fullWidth
            margin="normal"
            value={field.validation?.minLength || ''}
            onChange={(e) => handleValidationChange('minLength', Number(e.target.value))}
          />
          <TextField
            label="Maximum Length"
            type="number"
            fullWidth
            margin="normal"
            value={field.validation?.maxLength || ''}
            onChange={(e) => handleValidationChange('maxLength', Number(e.target.value))}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={field.validation?.isEmail || false}
                onChange={(e) => handleValidationChange('isEmail', e.target.checked)}
              />
            }
            label="Validate as Email"
          />
           <FormControlLabel
            control={
              <Checkbox
                checked={field.validation?.isPassword || false}
                onChange={(e) => handleValidationChange('isPassword', e.target.checked)}
              />
            }
            label="Is a Password field (min 8 chars, 1 number)"
          />
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
      return <SelectOptionsEditor field={field} onUpdate={onUpdate} />;
    
    // Checkbox, Date, etc., have no extra settings for now, but can be added here.
    default:
      return null;
  }
}