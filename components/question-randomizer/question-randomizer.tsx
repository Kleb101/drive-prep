'use client';

import React, { useEffect, useState } from 'react';
import MultipleChoiceQuestion from '@/components/multiple-choice-question/multiple-choice-question';
import { AnsweredQuestion, Question } from '@/interfaces/question';
import shuffle from 'lodash/shuffle';
import { isArray, isEmpty, sample } from 'lodash';
import {
  getPendingQuestions,
  saveAnsweredQuestionsFromStorage,
  savePendingQuestionsToStorage,
} from '@/app/utils/question';
import { redirect } from 'next/navigation';

interface QuestionRandomizerProps {
  questions: Question[];
}

const QuestionRandomizer = ({ questions }: QuestionRandomizerProps) => {
  const [pendingQuestions, setPendingQuestions] = useState<Question[]>();
  const [answeredQuestions, setAnsweredQuestions] =
    useState<AnsweredQuestion[]>();
  const [question, setQuestion] = useState<Question>();

  const pickRandomQuestion = (questions?: Question[]) => sample(questions);

  const setNextQuestion = (randomQuestion: Question) => {
    setQuestion(randomQuestion);
  };

  const onNextStep = (isCorrect: boolean, selectedAnswerIndex: number) => {
    if (!question) return;

    setAnsweredQuestions((previousValue) => [
      ...(previousValue || []),
      {
        ...question,
        isCorrect,
        selectedAnswerIndex,
      },
    ]);

    setPendingQuestions((previousValue) => [
      ...(previousValue?.filter(
        (pendingQuestion) => pendingQuestion.id !== question.id
      ) || []),
    ]);
  };

  useEffect(() => {
    const pendingQuestionsFromStorage = getPendingQuestions();
    const hasPendingQuestionsSavedToStorage =
      pendingQuestionsFromStorage && pendingQuestionsFromStorage.length > 0;

    if (hasPendingQuestionsSavedToStorage) {
      // use the ones saved in storage
      setPendingQuestions(pendingQuestionsFromStorage);
    } else {
      const newPendingQuestions = shuffle(questions);
      setPendingQuestions(newPendingQuestions);
    }
  }, [questions]);

  useEffect(() => {
    if (answeredQuestions) {
      saveAnsweredQuestionsFromStorage(answeredQuestions);
    }
  }, [answeredQuestions]);

  useEffect(() => {
    if (pendingQuestions) {
      savePendingQuestionsToStorage(pendingQuestions);

      const randomQuestion = pickRandomQuestion(pendingQuestions);
      if (randomQuestion) {
        setNextQuestion(randomQuestion);
      }
    }

    if (isEmpty(pendingQuestions) && isArray(pendingQuestions)) {
      console.log('no remaining questions');
      redirect('/exam-result');
    }
  }, [pendingQuestions]);

  return (
    question && (
      <MultipleChoiceQuestion question={question} onNextStep={onNextStep} />
    )
  );
};

export default QuestionRandomizer;
