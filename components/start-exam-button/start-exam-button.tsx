'use client';

import React from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';

const startExamButton = () => {
  return (
    <Button
      component={Link} // tell MUI Button to render as Next.js Link
      href="/exam"
      variant="contained"
      color="primary"
    >
      start the quiz!
    </Button>
  );
};

export default startExamButton;
