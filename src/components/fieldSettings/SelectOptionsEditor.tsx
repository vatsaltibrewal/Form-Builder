'use client';

import React, { useState, useEffect } from 'react';
import { Field, FieldOption } from '@/types/form';
import { Stack, TextField, Button, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface SelectOptionsEditorProps {
  field: Field;
  onUpdate: (changes: Partial<Field>) => void;
}

export default function SelectOptionsEditor({ field, onUpdate }: SelectOptionsEditorProps) {
  const [options, setOptions] = useState<FieldOption[]>(field.options || []);

  useEffect(() => {
    setOptions(field.options || [{ value: 'option-1', label: 'Option 1' }]);
  }, [field.options]);

  const handleOptionChange = (index: number, newLabel: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], label: newLabel, value: newLabel.toLowerCase().replace(/\s+/g, '-') };
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const newOptionNumber = options.length + 1;
    setOptions([...options, { value: `option-${newOptionNumber}`, label: `Option ${newOptionNumber}` }]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };
  
  const handleSaveChanges = () => {
      onUpdate({ options: options });
  };

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">Options</Typography>
      {options.map((option, index) => (
        <Stack direction="row" key={index} spacing={1} alignItems="center">
          <TextField
            fullWidth
            variant="standard"
            value={option.label}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            onBlur={handleSaveChanges} // Save when user clicks away
          />
          <IconButton size="small" onClick={() => handleRemoveOption(index)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button startIcon={<AddIcon />} onClick={handleAddOption}>
        Add Option
      </Button>
    </Stack>
  );
}