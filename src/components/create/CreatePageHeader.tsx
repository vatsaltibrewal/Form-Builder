'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setFormName } from '@/lib/slices/formBuilderSlice';
import { Box, TextField, Button, Stack, Paper } from '@mui/material';
import Link from 'next/link';

interface CreatePageHeaderProps {
  onSave: () => void;
}

export default function CreatePageHeader({ onSave }: CreatePageHeaderProps) {
  const dispatch = useAppDispatch();
  const formName = useAppSelector((state) => state.formBuilder.formName);

  return (
    <Paper
      elevation={2}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        p: 2,
        mb: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <TextField
          variant="outlined"
          size="small"
          value={formName}
          onChange={(e) => dispatch(setFormName(e.target.value))}
          placeholder="Untitled Form"
          sx={{ flexGrow: 1, maxWidth: '50%' }}
        />
        <Stack direction="row" spacing={2}>
          <Button component={Link} href="/preview" variant="outlined">
            Preview
          </Button>
          <Button variant="contained" onClick={onSave}>
            Save Form
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}