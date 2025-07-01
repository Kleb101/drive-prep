import { AnsweredQuestion, Question } from '@/interfaces/question';

const PENDING_QUESTION_STORAGE_KEY = 'pending_questions';
const ANSWERED_QUESTION_STORAGE_KEY = 'answered_questions';

export const getQuestionsFromStorage =
  <QuestionType extends Question>(questionStorageKey: string) =>
  () => {
    const randomQuestions = sessionStorage.getItem(questionStorageKey);
    return randomQuestions
      ? (JSON.parse(randomQuestions) as QuestionType[])
      : undefined;
  };

export const saveQuestionsToStorage =
  <QuestionType extends Question>(questionStorageKey: string) =>
  (questions: QuestionType[]) => {
    const questionsToSave = JSON.stringify(questions);
    sessionStorage.setItem(questionStorageKey, questionsToSave);
  };

export const removeQuestionFromStorage =
  <QuestionType extends Question>(questionStorageKey: string) =>
  (question?: QuestionType) => {
    const getQuestionsBasedOnStorageKey =
      getQuestionsFromStorage(questionStorageKey);
    const questionsFromStorage = getQuestionsBasedOnStorageKey();
    if (questionsFromStorage && question) {
      const filteredQuestion = questionsFromStorage.filter(
        (questionFromStorage) => questionFromStorage.id !== question.id
      );

      saveQuestionsToStorage(questionStorageKey)(filteredQuestion);
    }
  };

export const resetQuestions = () => {
  sessionStorage.removeItem(PENDING_QUESTION_STORAGE_KEY);
  sessionStorage.removeItem(ANSWERED_QUESTION_STORAGE_KEY);
};

export const getPendingQuestions = getQuestionsFromStorage(
  PENDING_QUESTION_STORAGE_KEY
);

export const savePendingQuestionsToStorage = saveQuestionsToStorage(
  PENDING_QUESTION_STORAGE_KEY
);

export const removePendingQuestionFromStorage = removeQuestionFromStorage(
  PENDING_QUESTION_STORAGE_KEY
);

export const getAnsweredQuestions = getQuestionsFromStorage<AnsweredQuestion>(
  ANSWERED_QUESTION_STORAGE_KEY
);

export const saveAnsweredQuestionsFromStorage =
  saveQuestionsToStorage<AnsweredQuestion>(ANSWERED_QUESTION_STORAGE_KEY);
