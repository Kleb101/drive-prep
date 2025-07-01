'use client';

import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { AnsweredQuestion } from '@/interfaces/question';
import { resetQuestions } from '@/app/utils/question';
import { redirect } from 'next/navigation';

interface ExamResultPageProps {
  score: number;
  total: number;
  results: AnsweredQuestion[];
}

const ExamResult: React.FC<ExamResultPageProps> = ({
  score,
  total,
  results,
}) => {
  const handleRetake = () => {
    resetQuestions();
    redirect('/exam');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Results
          </Typography>
          {/* <Typography variant="h6">Student: {studentName}</Typography> */}
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            Score: {score} / {total}
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Question</TableCell>
                  <TableCell>Your Answer</TableCell>
                  <TableCell>Correct Answer</TableCell>
                  <TableCell>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ minWidth: '250px', verticalAlign: 'top' }}>
                      {row.question}
                    </TableCell>
                    <TableCell sx={{ minWidth: '300px', verticalAlign: 'top' }}>
                      {row.choices[row.selectedAnswerIndex]}
                    </TableCell>
                    <TableCell sx={{ minWidth: '300px', verticalAlign: 'top' }}>
                      {row.choices[row.answer]}
                    </TableCell>
                    <TableCell sx={{ verticalAlign: 'top' }}>
                      <Typography color={row.isCorrect ? 'green' : 'error'}>
                        {row.isCorrect ? 'Correct' : 'Incorrect'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={handleRetake}
          >
            Retake exam
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ExamResult;
