import { Question } from '@/interfaces/question';

export const getParsedQuestions = () => {
  const randomQuestions = sessionStorage.getItem('questions');
  return randomQuestions
    ? (JSON.parse(randomQuestions) as Question[])
    : undefined;
};

export const saveQuestions = (questions: Question[]) => {
  const questionsToSave = JSON.stringify(questions);
  sessionStorage.setItem('questions', questionsToSave);
};

export const removeAnsweredQuestion = (question?: Question) => {
  const parsedQuestions = getParsedQuestions();
  if (parsedQuestions && question) {
    const filteredQuestion = parsedQuestions.filter(
      (parsedQuestion) => parsedQuestion.id !== question.id
    );

    saveQuestions(filteredQuestion);
  }
};
