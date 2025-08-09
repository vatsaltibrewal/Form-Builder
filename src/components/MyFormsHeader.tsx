'use client';
import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function MyFormsHeader() {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">
                    My Forms
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    href="/create"
                    startIcon={<AddCircleOutlineIcon />}
                >
                    Create New Form
                </Button>
            </Box>
        </Container>
    </Box>
  );
}