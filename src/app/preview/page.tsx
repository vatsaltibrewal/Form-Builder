'use client';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '@/lib/hooks';
import { Container, Typography, Box, Button, Paper, Alert } from '@mui/material';
import RenderField from '@/components/RenderField';

export default function LivePreviewPage() {
  const formSchema = useAppSelector((state) => state.formBuilder);
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Form Submission Data:', data);
    alert('Form submitted! Check the console for the data.');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
       <Alert severity="info" sx={{ mb: 3 }}>
        This is a live preview. Your data will not be saved.
      </Alert>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {formSchema.formName}
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
  );
}