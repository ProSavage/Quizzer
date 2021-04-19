import { NextApiRequest, NextApiResponse } from "next";
import { debug } from "node:console";
import { connectToDatabase } from "../../util/mongodb";
import Quiz from "../../util/types/Quiz";
import Results from "../../util/types/Results";
import shortid from "shortid";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  if (req.body.questions.length === 0) {
    res.json({ 
      success: false, 
      message: "A quiz must have at least 1 question.",
    });
    return;
  }
  const quizEntry = {
    _id: req.body._id,
    author: req.body.username,
    name: req.body.name,
    description: req.body.description,
    questions: req.body.questions
  };
  db.collection("quizzes").insertOne(quizEntry);

  res.json({
    success: true,
    message: "Successfully uploaded. You can take the quiz using the following ID: " + req.body._id.toString(),
  });
};