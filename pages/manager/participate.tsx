import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { QuizQuestion } from "../../util/types/Quiz";
import Quiz from "../../util/types/Quiz";
import QuestionDisplay from "../../components/manager/QuestionDisplay";
import { quizTakerQuiz } from "../../atoms/QuizTakerQuiz";
import getAxios, { buildAxios } from "../../util/AxiosBuilder";
import { debug } from "node:console";

export default function Participate() {
  
    const [quizID, setQuizID] = useState("");
    const [searchMessage, setSearchMessage] = useState("");
    const [quiz, setQuiz] = useRecoilState(quizTakerQuiz);

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
        }
        else {
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
        >START</button>
        <Metadata>
          <h3>{quiz.name}</h3>
          <label>{quiz.description}</label>
        </Metadata>
        <QuestionsContainer>
          <QuestionManagerHeader>
            <strong>{quiz.questions.length} Questions</strong>
          </QuestionManagerHeader>
          {quiz.questions.map((question, key) => (
            <QuestionDisplay key={key} question={question} id={key} />
          ))}
        </QuestionsContainer>
        <button>SUBMIT QUIZ</button>
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
      questions: []
    }