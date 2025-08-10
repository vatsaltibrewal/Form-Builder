'use client';
import { useAppSelector } from '@/lib/hooks';
import { Field } from '@/types/form';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';

interface DerivationSettingsProps {
  field: Field;
  onUpdate: (changes: Partial<Field>) => void;
}

export default function DerivationSettings({ field, onUpdate }: DerivationSettingsProps) {
  const allFields = useAppSelector((state) => state.formBuilder.fields);

  const potentialParents = allFields.filter(f => f.type === 'Date' && f.id !== field.id);
  
  const handleParentChange = (parentId: string) => {
    onUpdate({
      derivation: {
        parentFields: [parentId],
        logic: 'ageFromDate',
      },
    });
  };

  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', p: 2, borderRadius: 1, mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Derivation Logic</Typography>
        {potentialParents.length > 0 ? (
            <FormControl fullWidth>
                <InputLabel id="parent-field-select-label">Parent Date Field</InputLabel>
                <Select
                    labelId="parent-field-select-label"
                    value={field.derivation?.parentFields[0] || ''}
                    label="Parent Date Field"
                    onChange={(e) => handleParentChange(e.target.value)}
                >
                    {potentialParents.map((parent) => (
                    <MenuItem key={parent.id} value={parent.id}>
                        {parent.label}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
        ) : (
            <Typography variant="body2" color="text.secondary">
                No compatible parent fields (type: Date) found in this form.
            </Typography>
        )}
    </Box>
  );
}