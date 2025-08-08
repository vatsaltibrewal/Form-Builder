'use client';

import * as React from 'react';
import { Container, Typography, Button, Stack, Box } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dynamic Form Builder
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph align="center">
          A project for the Associate Software Developer assignment at upliance.ai.
          <br />
          Built with Next.js, MUI, TypeScript, and Redux.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button
            component={Link}
            href="/create"
            variant="contained"
            color="primary"
            size="large"
          >
            Create a New Form
          </Button>
          <Button
            component={Link}
            href="/myforms"
            variant="outlined"
            color="secondary"
            size="large"
          >
            View Saved Forms
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}