'use client';
import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetFormBuilder } from '@/lib/slices/formBuilderSlice';
import { FormSchema } from '@/types/form';

import { Box, Container } from '@mui/material';
import CreatePageHeader from '@/components/create/CreatePageHeader';
import FieldPalette from '@/components/create/FieldPalette';
import FormCanvas from '@/components/create/FormCanvas';


export default function CreatePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formState = useAppSelector((state) => state.formBuilder);

  const handleSaveForm = () => {
    const newForm: FormSchema = {
      id: nanoid(),
      name: formState.formName,
      createdAt: new Date().toISOString(),
      fields: formState.fields,
    };

    const savedFormsStr = localStorage.getItem('forms');
    const savedForms: FormSchema[] = savedFormsStr ? JSON.parse(savedFormsStr) : [];

    const updatedForms = [...savedForms, newForm];
    localStorage.setItem('forms', JSON.stringify(updatedForms));

    dispatch(resetFormBuilder());
    router.push('/myforms');
  };

  return (
    <Box sx={{ position: 'relative' }}>
        <CreatePageHeader onSave={handleSaveForm} />
        <Container maxWidth="md">
            <FormCanvas />
        </Container>
        <FieldPalette />
    </Box>
  );
}