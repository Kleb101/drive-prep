'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { resetQuestions } from '@/app/utils/question';

const startExamButton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        gap: '25px',
      }}
    >
      <h1>Welcome to DrivePrep!</h1>
      <p
        style={{
          textAlign: 'justify',
          maxWidth: '500px',
        }}
      >
        Get ready to master the basics of driving! Drive Prep is designed to
        help new drivers prepare for their Theoretical Driving Course (TDC) with
        engaging quizzes and practical learning materials. Boost your confidence
        and knowledge before you hit the road.
      </p>

      <Button
        onClick={resetQuestions}
        component={Link} // tell MUI Button to render as Next.js Link
        href="/exam"
        variant="contained"
        color="primary"
      >
        start the quiz!
      </Button>
    </Box>
  );
};

export default startExamButton;
