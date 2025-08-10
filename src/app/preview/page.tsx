'use client';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/lib/hooks';
import { Container, Typography, Box, Button, Paper, Alert } from '@mui/material';
import RenderField from '@/components/RenderField';
import { useDerivedFields } from '@/lib/useDerivedFields';
import { FormSchema } from '@/types/form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function LivePreviewPage() {
  const formBuilderState = useAppSelector((state) => state.formBuilder);
  const formMethods = useForm();
  const { control, handleSubmit } = formMethods;
  
  const liveFormSchema: FormSchema = useMemo(() => ({
    id: 'live-preview-id',
    name: formBuilderState.formName,
    createdAt: new Date().toISOString(),
    fields: formBuilderState.fields,
  }), [formBuilderState.formName, formBuilderState.fields]);

  useDerivedFields({
    formSchema: liveFormSchema,
    useFormMethods: formMethods,
  });

  const onSubmit = (data: any) => {
    console.log('Live Preview Form Submission Data:', data);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info" sx={{ mb: 3 }}>
          This is a live preview. Your data will not be saved.
        </Alert>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {liveFormSchema.name}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {liveFormSchema.fields.map((field) => (
              <RenderField key={field.id} field={field} control={control} />
            ))}
            <Box mt={3}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Submit Form
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}