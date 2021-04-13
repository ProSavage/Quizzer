
import { NextApiRequest, NextApiResponse } from "next";
import { debug } from "node:console";
import { connectToDatabase } from "../../util/mongodb";
import Quiz from "../../util/types/Quiz";
import { QuizQuestion, QuizAnswer } from "../../util/types/Quiz";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const quiz_id = req.body._id;
  const { db } = await connectToDatabase();
  const EmptyQuiz: Quiz = {
    _id: "",
    name: "",
    description: "",
    questions: []
  }
  
  var quiz = await db.collection<Quiz>("quizzes").findOne({_id: quiz_id});
  
  if (quiz === null) {
    res.json({ success: false, message: "Invalid quiz ID.", quiz: EmptyQuiz});
    return;
  }

  // INITIALIZE ANSWERS TO FALSE
  var questions: QuizQuestion[] = []
  for (var i = 0; i < quiz.questions.length; i++) {
    var answers: QuizAnswer[] = []
    for (var j = 0; j < quiz.questions[i].answers.length; j++) {
      const newAnswer: QuizAnswer = {answer: quiz.questions[i].answers[j].answer, correct: false};
      answers.push(newAnswer);
    }
    const newQuestion: QuizQuestion = {question: quiz.questions[i].question, answers: answers};
    questions.push(newQuestion);
  }
  quiz = {_id: quiz._id, name: quiz.name, description: quiz.description, questions: questions};

  res.json({
    success: true,
    message: "Quiz found.",
    quiz: quiz,
  });
};
