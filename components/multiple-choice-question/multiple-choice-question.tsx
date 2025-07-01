'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Box,
} from '@mui/material';
import { Question } from '@/interfaces/question';
import { CORRECT_ANSWER, INCORRECT_ANSWER } from '@/app/constants';

interface MultipleChoiceQuestionProps {
  question: Question;
  onNextStep: (isCorrect: boolean, selected: number) => void;
}

export default function MultipleChoiceQuestion({
  question,
  onNextStep,
}: MultipleChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(false);
  }, [question]);

  const handleSubmit = () => {
    if (!selected) return;

    setSubmitted(true);

    const isSelectedAnswerCorrect = Number(selected) === question.answer;
    setIsCorrect(isSelectedAnswerCorrect);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <FormControl component="fieldset" fullWidth>
          {question.imageSrc && (
            <Box sx={{ textAlign: 'center', mb: 2, mt: 2 }}>
              <img
                src={question.imageSrc}
                alt="Question visual"
                style={{
                  maxHeight: '120px',
                  height: 'auto',
                }}
              />
            </Box>
          )}
          <FormLabel
            component="legend"
            sx={{
              mb: {
                xs: 2,
                md: 0,
              },
            }}
          >
            <Typography variant="h6">{question.question}</Typography>
          </FormLabel>

          <RadioGroup
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {question.choices.map((choice, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={choice}
                disabled={submitted}
                sx={{
                  mb: {
                    xs: 2,
                    md: 0,
                  },
                }}
              />
            ))}
          </RadioGroup>

          {!submitted && (
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
              Submit
            </Button>
          )}

          {submitted && (
            <>
              <Alert severity={isCorrect ? 'success' : 'error'} sx={{ mt: 2 }}>
                {isCorrect
                  ? CORRECT_ANSWER
                  : `${INCORRECT_ANSWER} ${question.choices[question?.answer]}`}
              </Alert>

              <Button
                variant="contained"
                onClick={() => onNextStep(isCorrect, Number(selected))}
                sx={{ mt: 2 }}
              >
                Next question
              </Button>
            </>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
}
