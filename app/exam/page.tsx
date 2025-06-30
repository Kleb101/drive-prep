import QuestionRandomizer from '@/components/question-randomizer/question-randomizer';
import questions from '@/app/data/questions.json';

export default function ExamPage() {
  return (
    <main>
      <h1 style={{ textAlign: 'center' }}>TDC Exam Practice</h1>
      <QuestionRandomizer questions={questions} />
    </main>
  );
}
