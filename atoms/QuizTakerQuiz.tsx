import { atom } from "recoil";
import Quiz from "../util/types/Quiz";

const EmptyQuiz: Quiz = {
    _id: "",
    name: "",
    description: "",
    questions: []
  }

export const quizTakerQuiz = atom<Quiz>({
  key: "QUIZTAKER_QUIZ",
  default: EmptyQuiz,
});

