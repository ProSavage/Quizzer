import { atom } from "recoil";
import { QuizQuestion } from "../util/types/Quiz";

export const quizManagerQuestionsState = atom<QuizQuestion[]>({
  key: "QUIZMANAGER_QUESTIONS",
  default: [],
});
