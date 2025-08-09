'use client';
import { useAppDispatch } from '@/lib/hooks';
import { addField } from '@/lib/slices/formBuilderSlice';
import { FieldType } from '@/types/form';
import { Box, Paper, IconButton, Tooltip, Stack, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import EventIcon from '@mui/icons-material/Event';

const fieldTypes: { type: FieldType; icon: React.ReactElement; label: string }[] = [
    { type: 'Text', icon: <TextFieldsIcon />, label: 'Text Input' },
    { type: 'Number', icon: <NumbersIcon />, label: 'Number Input' },
    { type: 'Textarea', icon: <SubjectIcon />, label: 'Text Area' },
    { type: 'Checkbox', icon: <CheckBoxIcon />, label: 'Checkbox' },
    { type: 'Radio', icon: <RadioButtonCheckedIcon />, label: 'Radio Buttons' },
    { type: 'Select', icon: <ArrowDropDownCircleIcon />, label: 'Select Dropdown' },
    { type: 'Date', icon: <EventIcon />, label: 'Date Picker' },
];


export default function FieldPalette() {
  const dispatch = useAppDispatch();

  const handleAddField = (type: FieldType) => {
    dispatch(addField({ type }));
  };

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        top: '150px',
        right: '40px',
        p: 1,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={1}>
        <Typography variant="overline" sx={{ pl: 1 }}>Add Field</Typography>
        {fieldTypes.map(({type, icon, label}) => (
             <Tooltip key={type} title={label} placement="left">
                <IconButton onClick={() => handleAddField(type)}>
                    {icon}
                </IconButton>
            </Tooltip>
        ))}
      </Stack>
    </Paper>
  );
}