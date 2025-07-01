'use client';

import ExamResult from '@/components/exam-result/exam-result';
import { useEffect, useState } from 'react';
import questions from '@/app/data/questions.json';
import { getAnsweredQuestions } from '../utils/question';
import { Button } from '@mui/material';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AnsweredQuestion } from '@/interfaces/question';

export default function ExamPage() {
  const [score, setScore] = useState<number>();
  const [results, setResults] = useState<AnsweredQuestion[]>();
  const [isDone, setIsDone] = useState<boolean>();
  const total = questions.length;

  useEffect(() => {
    const answeredQuestions = getAnsweredQuestions();
    const isExamDone = answeredQuestions?.length === total;
    setIsDone(isExamDone);

    if (isExamDone) {
      const totalScore = answeredQuestions.filter(
        (answeredQuestion) => answeredQuestion.isCorrect
      ).length;
      setScore(totalScore);
      setResults(answeredQuestions);
    }
  }, [total]);

  const continueToQuiz = () => {
    redirect('/exam');
  };

  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>TDC Exam Practice</h1>
      {isDone && score !== undefined && results && (
        <ExamResult score={score} total={total} results={results} />
      )}

      {isDone === false && (
        <Button
          onClick={continueToQuiz}
          component={Link} // tell MUI Button to render as Next.js Link
          href="/exam"
          variant="contained"
          color="primary"
        >
          continue the quiz!
        </Button>
      )}
    </main>
  );
}
