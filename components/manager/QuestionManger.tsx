import { useRecoilState } from "recoil";
import styled from "styled-components";
import { quizManagerQuestionsState } from "../../atoms/QuizManagerQuestions";
import { QuizAnswer, QuizQuestion } from "../../util/types/Quiz";

export default function QuestionManager(props: {
  id: number;
  question: QuizQuestion;
}) {
  const [questions, setQuestions] = useRecoilState(quizManagerQuestionsState);

  const deleteQuestion = () => {
    const questionsAfterRemove = questions.filter(
      (filterQuestion) => filterQuestion !== props.question
    );
    setQuestions(questionsAfterRemove);
  };

  const setQuestion = (question: QuizQuestion) => {
    const newQs = [...questions];
    newQs.splice(
      questions.findIndex(
        (filterQuestion) => filterQuestion === props.question
      ),
      1,
      question
    );
    setQuestions(newQs);
  };

  const editAnswer = (answer: QuizAnswer, newAnswer: QuizAnswer) => {
    const newAnswers = [...props.question.answers];
    newAnswers.splice(
      props.question.answers.findIndex((oldAnswer) => oldAnswer === answer),
      1,
      newAnswer
    );
    setQuestion({ ...props.question, answers: newAnswers });
  };

  const createAnswer = () => {
    setQuestion({
      ...props.question,
      answers: props.question.answers.concat({
        answer: "new Answer",
        correct: false,
      }),
    });
  };

  const deleteAnswer = (answer: QuizAnswer) => {
    const newAnswers = [...props.question.answers];
    newAnswers.splice(
      props.question.answers.findIndex((oldAnswer) => oldAnswer === answer),
      1
    );
    setQuestion({ ...props.question, answers: newAnswers });
  };

  return (
    <Wrapper>
      <Header>
        <label>Question {props.id + 1}</label>
        <button onClick={deleteQuestion}>DELETE</button>
      </Header>
      <input
        onChange={(e) =>
          setQuestion({ ...props.question, question: e.target.value })
        }
        value={props.question.question}
      />
      <AnswerTable>
        <Answer>
          <AnswerOption>
            Answer Choices
            <button onClick={createAnswer}>CREATE ANSWER</button>
          </AnswerOption>
          <AnswerCheckbox>Is Correct</AnswerCheckbox>
          <AnswerActions>Actions</AnswerActions>
        </Answer>
        {props.question.answers.map((answer, i) => (
          <Answer key={i}>
            <AnswerOption>
              <input
                style={{ width: "100%" }}
                value={answer.answer}
                onChange={(e) => {
                  editAnswer(answer, {
                    answer: e.target.value,
                    correct: answer.correct,
                  });
                }}
              />
            </AnswerOption>
            <AnswerCheckbox>
              <input
                checked={answer.correct}
                onChange={() => {
                  editAnswer(answer, {
                    answer: answer.answer,
                    correct: !answer.correct,
                  });
                }}
                type={"checkbox"}
              />
            </AnswerCheckbox>
            <AnswerActions>
              <button onClick={() => deleteAnswer(answer)}>DELETE</button>
            </AnswerActions>
          </Answer>
        ))}
      </AnswerTable>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.25em 0;
`;

const Answer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.25em 0;
  flex-wrap: wrap;
`;

const AnswerOption = styled.div`
  width: 60%;
  padding-right: 0.5em;
  display: flex;
  justify-content: space-between;
`;

const AnswerCheckbox = styled.div`
  width: 20%;
`;

const AnswerActions = styled.div`
  width: 20%;
`;

const AnswerTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
`;
