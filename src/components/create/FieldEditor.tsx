'use client';
import { useAppDispatch } from '@/lib/hooks';
import { updateField, removeField } from '@/lib/slices/formBuilderSlice';
import { Field } from '@/types/form';
import { Box, Paper, TextField, Stack, IconButton, Tooltip, FormControlLabel, Switch, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FieldSpecificSettings from '../fieldSettings/FieldSpecificSettings';

interface FieldEditorProps {
  field: Field;
  isSelected: boolean;
  onSelect: () => void;
  dragHandleProps: any;
}

export default function FieldEditor({ field, isSelected, onSelect, dragHandleProps }: FieldEditorProps) {
  const dispatch = useAppDispatch();

  const handleUpdate = (changes: Partial<Field>) => {
    dispatch(updateField({ id: field.id, changes }));
  };

  const handleDelete = () => {
    dispatch(removeField(field.id));
  };

  const borderStyle = isSelected ? { borderLeft: '3px solid', borderColor: 'primary.main' } : {};

  return (
    <Paper
      elevation={isSelected ? 4 : 1}
      sx={{ p: 3, mb: 2, transition: 'elevation 0.3s', ...borderStyle }}
      onClick={onSelect}
    >
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box {...dragHandleProps} sx={{ cursor: 'grab' }}>
            <DragIndicatorIcon color="action" />
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            label="Field Label / Question"
            value={field.label}
            onChange={(e) => handleUpdate({ label: e.target.value })}
            placeholder="e.g., What is your name?"
          />
        </Stack>

        {isSelected && (
          <Box sx={{ pl: 5, borderTop: '1px solid', borderColor: 'divider', pt: 2, mt: 2 }}>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="Placeholder or Helper Text"
                fullWidth
                value={field.placeholder || ''}
                onChange={(e) => handleUpdate({ placeholder: e.target.value })}
              />
              <FieldSpecificSettings field={field} onUpdate={handleUpdate} />
              
            </Stack>
          </Box>
        )}

        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ pt: 1 }}>
           <FormControlLabel
                control={
                  <Switch
                    checked={field.required}
                    onChange={(e) => handleUpdate({ required: e.target.checked })}
                  />
                }
                label="Required"
              />
          <Tooltip title="Delete Field">
            <IconButton onClick={handleDelete}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}