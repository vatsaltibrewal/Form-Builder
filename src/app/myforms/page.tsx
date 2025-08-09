'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loadForms } from '@/lib/slices/savedFormsSlice';
import { FormSchema } from '@/types/form';
import { format } from 'date-fns';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
  CircularProgress,
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import MyFormsHeader from '@/components/MyFormsHeader';

export default function MyFormsPage() {
  const dispatch = useAppDispatch();
  const { forms, isLoading } = useAppSelector((state) => state.savedForms);

  useEffect(() => {
    try {
      const savedFormsStr = localStorage.getItem('forms');
      const formsFromStorage: FormSchema[] = savedFormsStr ? JSON.parse(savedFormsStr) : [];
      dispatch(loadForms(formsFromStorage));
    } catch (error) {
      console.error("Failed to parse forms from localStorage", error);
      dispatch(loadForms([]));
    }
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <MyFormsHeader />

      {forms.length === 0 ? (
        <Container>
          <Box textAlign="center" my={10}>
            <Typography variant="h4" gutterBottom>No Forms Found</Typography>
            <Typography color="text.secondary" paragraph>
              You haven't created any forms yet. Click the button above to start.
            </Typography>
          </Box>
        </Container>
      ) : (
        <Container sx={{ py: 4 }} maxWidth="lg">
            <Grid container spacing={4}>
                {forms.map((form) => (
                    <Grid key={form.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardActionArea component={Link} href={`/preview/${form.id}`} sx={{ flexGrow: 1 }}>
                                <CardContent>
                                    <ArticleIcon sx={{ fontSize: 40, mb: 1 }} color="secondary" />
                                    <Typography gutterBottom variant="h6" component="div" noWrap>
                                        {form.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Created: {format(new Date(form.createdAt), 'PPpp')}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
      )}
    </Box>
  );
}