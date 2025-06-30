'use client';

import React, { useState } from 'react';
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

interface MultipleChoiceQuestionProps {
  question: Question;
  onSelectedAnswerCorrect: () => void;
}

export default function MultipleChoiceQuestion({
  question,
  onSelectedAnswerCorrect,
}: MultipleChoiceQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selected) return;

    setSubmitted(true);

    const isSelectedAnswerCorrect = Number(selected) === question.answer;
    setIsCorrect(isSelectedAnswerCorrect);

    if (isSelectedAnswerCorrect) {
      onSelectedAnswerCorrect();
    }
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
          <FormLabel component="legend">
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
              />
            ))}
          </RadioGroup>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
            disabled={submitted || !selected}
          >
            Submit
          </Button>

          {submitted && (
            <Alert severity={isCorrect ? 'success' : 'error'} sx={{ mt: 2 }}>
              {isCorrect
                ? 'Correct! 🎉'
                : `Incorrect. The correct answer is: ${
                    question?.answer || 'bonus'
                  }`}
            </Alert>
          )}
        </FormControl>
      </CardContent>
    </Card>
  );
}
