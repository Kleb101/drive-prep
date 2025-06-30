'use client';

import React, { useEffect, useState } from 'react';
import MultipleChoiceQuestion from '@/components/multiple-choice-question/multiple-choice-question';
import { Question } from '@/interfaces/question';
import shuffle from 'lodash/shuffle';
import { sample } from 'lodash';
import {
  getParsedQuestions,
  removeAnsweredQuestion,
  saveQuestions,
} from '@/app/utils/question';

interface QuestionRandomizerProps {
  questions: Question[];
}
const QuestionRandomizer = ({ questions }: QuestionRandomizerProps) => {
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>();
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    const randomQuestions = getParsedQuestions();
    if (!randomQuestions) {
      const newRandomizedQuestions = shuffle(questions);
      saveQuestions(newRandomizedQuestions);
      setRandomizedQuestions(newRandomizedQuestions);
    } else {
      setRandomizedQuestions(randomQuestions);
    }
  }, [questions]);

  useEffect(() => {
    const randomQuestion = sample(randomizedQuestions);
    setQuestion(randomQuestion);
  }, [randomizedQuestions]);

  const handleOnSelectedAnswerCorrect = () => {
    removeAnsweredQuestion(question);
  };

  return (
    question && (
      <MultipleChoiceQuestion
        question={question}
        onSelectedAnswerCorrect={handleOnSelectedAnswerCorrect}
      />
    )
  );
};

export default QuestionRandomizer;
