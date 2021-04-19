import { NextApiRequest, NextApiResponse } from "next";
import { debug } from "node:console";
import { connectToDatabase } from "../../util/mongodb";
import Quiz from "../../util/types/Quiz";
import Results from "../../util/types/Results";
import shortid from "shortid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const quiz_id = req.body._id;
  const user = req.body.user;
  const quiz_with_user_answers = req.body.quiz;
  const { db } = await connectToDatabase();
  const EmptyQuiz: Quiz = {
    _id: "",
    name: "",
    description: "",
    questions: []
  }
  
  const quiz = await db.collection<Quiz>("quizzes").findOne({_id: quiz_id});

  if (quiz === null) {
    res.json({ 
      success: false, 
      message: "Error submitting quiz.", 
      quiz: quiz_with_user_answers,
    });
    return;
  }

  // CHECK ANSWERS
  var total_correct = 0.0;
  var questions_correct : Boolean[] = [];
  const num_questions = quiz.questions.length;
  for (var i = 0; i < num_questions; i++) {
    const num_answers = quiz.questions[i].answers.length;
    var question_correct = true;
    for (var j = 0; j < num_answers; j++) {
      if (quiz.questions[i].answers[j].correct != quiz_with_user_answers.questions[i].answers[j].correct) {
        question_correct = false;
      }
    }
    questions_correct.push(question_correct);
    if (question_correct) {
        total_correct += 1;
    }
  }
  const score = total_correct / num_questions * 100;
  const results: Results = {
    _id: shortid.generate(),
    username: user.username,
    quiz_id: quiz._id,
    score: score,
    questions_correct: questions_correct,
  };
  db.collection("results").insertOne(results);

  res.json({
    success: true,
    message: "Quiz submitted. You scored a " + score.toString() + "%.",
    quiz: EmptyQuiz,
  });
};