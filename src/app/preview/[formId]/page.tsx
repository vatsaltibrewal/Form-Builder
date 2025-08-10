'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormSchema } from '@/types/form';
import { Container, Typography, Box, Button, Paper, CircularProgress } from '@mui/material';
import RenderField from '@/components/RenderField';
import { useDerivedFields } from '@/lib/useDerivedFields';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Link from 'next/link';

export default function SavedFormPreviewPage() {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const formMethods = useForm();
  const { handleSubmit, control } = formMethods;
  
  const { formId } = params;
  useDerivedFields({ formSchema, useFormMethods: formMethods });

  useEffect(() => {
    if (typeof formId === 'string') {
      try {
        const savedFormsStr = localStorage.getItem('forms');
        const savedForms: FormSchema[] = savedFormsStr ? JSON.parse(savedFormsStr) : [];
        const targetForm = savedForms.find((form) => form.id === formId);
        setFormSchema(targetForm || null);
      } catch (error) {
        console.error("Error parsing forms from localStorage:", error);
        setFormSchema(null);
      }
    }
    setIsLoading(false);
  }, [formId]);

  const onSubmit = (data: any) => {
    console.log('Form Submission Data:', data);
    alert('Form submitted! Check the console for the data.');
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!formSchema) {
    return (
      <Container>
        <Box textAlign="center" my={10}>
          <Typography variant="h4" gutterBottom>Form Not Found</Typography>
          <Typography color="text.secondary" paragraph>
            The form you are looking for does not exist or has been deleted.
          </Typography>
          <Button component={Link} href="/myforms" variant="contained">
            Back to My Forms
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {formSchema.name}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formSchema.fields.map((field) => (
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