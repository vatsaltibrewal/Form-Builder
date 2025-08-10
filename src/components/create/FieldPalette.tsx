'use client';
import { useAppDispatch } from '@/lib/hooks';
import { addField } from '@/lib/slices/formBuilderSlice';
import { FieldType } from '@/types/form';
import { Paper, IconButton, Tooltip, Stack, Typography } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubjectIcon from '@mui/icons-material/Subject';
import NumbersIcon from '@mui/icons-material/Numbers';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import EventIcon from '@mui/icons-material/Event';

const fieldTypes: { type: FieldType; icon: React.ReactElement; label: string }[] = [
    { type: 'Header', icon: <TitleIcon />, label: 'Title and Description' },
    { type: 'ShortText', icon: <ShortTextIcon />, label: 'Short Answer' },
    { type: 'LongText', icon: <SubjectIcon />, label: 'Paragraph' },
    { type: 'Number', icon: <NumbersIcon />, label: 'Number' },
    { type: 'Radio', icon: <RadioButtonCheckedIcon />, label: 'Multiple Choice (Single Answer)' },
    { type: 'Checkbox', icon: <CheckBoxIcon />, label: 'Checkboxes (Multiple Answers)' },
    { type: 'Select', icon: <ArrowDropDownCircleIcon />, label: 'Dropdown (Single Answer)' },
    { type: 'Date', icon: <EventIcon />, label: 'Date' },
];

export default function FieldPalette() {
  const dispatch = useAppDispatch();

  const handleAddField = (type: FieldType) => {
    dispatch(addField({ type }));
  };

  return (
    <Paper
      elevation={4}
      sx={{ position: 'fixed', top: '150px', right: '40px', p: 1, borderRadius: 2 }}
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