import { useRouter } from "next/router";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { quizManagerQuestionsState } from "../../atoms/QuizManagerQuestions";
import QuestionManager from "../../components/manager/QuestionManger";
import getAxios from "../../util/AxiosBuilder";
import { QuizQuestion } from "../../util/types/Quiz";

export default function Create() {
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
  });

  const [questions, setQuestions] = useRecoilState(quizManagerQuestionsState);

  const [status, setStatus] = useState("");
  const createQuestion = () => {
    setQuestions(questions.concat(blankQuestion));
  };

  const router = useRouter();

  const submitQuiz = () => {
    if (metadata.name.length === 0) {
      setStatus("name must not be empty");
      return;
    }

    if (metadata.description.length === 0) {
      setStatus("description cannot be empty.");
      return;
    }

    if (questions.length === 0) {
      setStatus("must have atleast one question.");
      return;
    }

    getAxios()
      .post("/create", {
        name: metadata.name,
        questions: questions,
        description: metadata.description,
      })
      .then((res) => {
        router.push("/manager");
      });
  };

  return (
    <Wrapper>
      <h2>Quiz Creator</h2>
      <Metadata>
        <h3>Quiz Metadata</h3>
        <label>Name</label>
        <input
          onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
          value={metadata.name}
        />
        <label>Description</label>
        <input
          onChange={(e) =>
            setMetadata({ ...metadata, description: e.target.value })
          }
          value={metadata.description}
        />
      </Metadata>
      <QuestionManagerContainer>
        <h3>Quiz Question Manager</h3>
        <QuestionManagerHeader>
          <strong>{questions.length} Questions</strong>
          <button onClick={createQuestion}>CREATE</button>
        </QuestionManagerHeader>
        {questions.map((question, key) => (
          <QuestionManager key={key} question={question} id={key} />
        ))}
      </QuestionManagerContainer>
      {status}
      <button onClick={submitQuiz}>SUBMIT QUIZ</button>
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

const QuestionManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
`;

const QuestionManagerHeader = styled.div`
  display: flex;
  justify-content: space-between;
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
