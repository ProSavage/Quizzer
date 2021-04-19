import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { quizTakerQuiz } from "../../atoms/QuizTakerQuiz";
import { userState } from "../../atoms/user";
import QuestionDisplay from "../../components/manager/QuestionDisplay";
import getAxios, { buildAxios } from "../../util/AxiosBuilder";
import Quiz, { QuizQuestion } from "../../util/types/Quiz";

export default function Participate() {
  const [quizID, setQuizID] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [quiz, setQuiz] = useRecoilState(quizTakerQuiz);
  const user = useRecoilValue(userState);

  const loadQuestions = () => {
    getAxios()
      .post("/loader", {
        _id: quizID,
      })
      .then((res) => {
        if (res.data.success) {
          buildAxios();
          setQuiz(res.data.quiz);
          setSearchMessage(res.data.message);
        } else {
          setSearchMessage(res.data.message);
          setQuiz(res.data.quiz);
        }
      });
  };

  const submitAnswers = () => {
    getAxios()
      .post("/grader", {
        _id: quizID,
        user: user,
        quiz: quiz,
      })
      .then((res) => {
        if (res.data.success) {
          buildAxios();
          setQuiz(res.data.quiz);
          setSearchMessage(res.data.message);
        } else {
          setSearchMessage(res.data.message);
          setQuiz(res.data.quiz);
        }
      });
  };

  return (
    <Wrapper>
      <p>{searchMessage}</p>
      <FormInput
        placeholder={"QUIZ ID: "}
        type={"_id"}
        value={quizID}
        onChange={(e) => setQuizID(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          loadQuestions();
        }}
        type={"submit"}
      >
        START
      </button>
      <Metadata>
        <h3>{quiz.name}</h3>
        <label>{quiz.description}</label>
      </Metadata>
      <button
        onClick={(e) => {
          e.preventDefault();
          submitAnswers();
        }}
        type={"submit"}
      >
        SUBMIT QUIZ
      </button>
      <QuestionsContainer>
        {quiz.questions.map((question, key) => (
          <QuestionDisplay key={key} question={question} id={key} />
        ))}
      </QuestionsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1em 0;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  max-width: 720px;
`;

const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
`;

const QuestionManagerHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FormInput = styled.input`
  margin: 0.5em 0;
`;

const blankQuestion: QuizQuestion = {
  question: "What is 3 + 4?",
  answers: [
    {
      answer: "5",
      correct: false,
    },
    {
      answer: "7",
      correct: true,
    },
    {
      answer: "8",
      correct: false,
    },
  ],
};

const blankQuestion2: QuizQuestion = {
  question: "What is 2 + 2?",
  answers: [
    {
      answer: "3",
      correct: false,
    },
    {
      answer: "4",
      correct: true,
    },
    {
      answer: "5",
      correct: false,
    },
  ],
};

const ExampleQuiz: Quiz = {
  _id: "aaaaaa",
  name: "Example Quiz",
  description: "A quiz made for debugging",
  questions: [blankQuestion, blankQuestion2],
};

const EmptyQuiz: Quiz = {
  _id: "",
  name: "",
  description: "",
  questions: [],
};
