export default interface Results {
    _id: string;
    username: string;
    quiz_id: string;
    score: Number;
    questions_correct: Boolean[];
  }