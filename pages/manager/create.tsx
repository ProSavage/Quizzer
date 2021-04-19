import React, { useState } from "react";
import { useResetRecoilState, useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { quizManagerQuestionsState } from "../../atoms/QuizManagerQuestions";
import QuestionManager from "../../components/manager/QuestionManger";
import { QuizQuestion } from "../../util/types/Quiz";
import getAxios, { buildAxios } from "../../util/AxiosBuilder";
import { userState } from "../../atoms/user";
import shortid from "shortid";

export default function Create() {
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [questions, setQuestions] = useRecoilState(quizManagerQuestionsState);
  const user = useRecoilValue(userState);

  const createQuestion = () => {
    setQuestions(questions.concat(blankQuestion));
  };

  const submitCreatedQuiz = () => {
    getAxios()
    .post("/publisher", {
      _id: shortid.generate(),
      author: user.username,
      name: metadata.name,
      description: metadata.description,
      questions: questions,
    })
    .then((res) => {
      if (res.data.success) {
        buildAxios();
        setSubmissionStatus(res.data.message);
      }
      else {
        setSubmissionStatus(res.data.message);
        return;
      }
    });
  }

  return (
    <Wrapper>
      <h2>Quiz Creator</h2>
      <p>{submissionStatus}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          submitCreatedQuiz();
          }}
          type={"submit"}
      >SUBMIT QUIZ</button>
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
