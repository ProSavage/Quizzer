import { debug } from "node:console";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { quizTakerQuiz } from "../../atoms/QuizTakerQuiz";
import { QuizAnswer, QuizQuestion } from "../../util/types/Quiz";

export default function QuestionDisplay(props: {
  id: number;
  question: QuizQuestion;
}) {
  const [takerQuiz, setTakerQuiz] = useRecoilState(quizTakerQuiz);

  const setQuestion = (question: QuizQuestion) => {
    const newQs = [...takerQuiz.questions];
    newQs.splice(
      takerQuiz.questions.findIndex(
        (filterQuestion) => filterQuestion === props.question
      ),
      1,
      question
    );
    setTakerQuiz({_id: takerQuiz._id, 
      name: takerQuiz.name, 
      description: takerQuiz.description,
      questions: newQs});
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

  return (
    <Wrapper>
      <Header>
        <label>Question {props.id + 1}</label>
      </Header>
      {props.question.question}
      <AnswerTable>
        <Answer>
        </Answer>
        {props.question.answers.map((answer, i) => (
          <Answer key={i}>
            <AnswerCheckbox>
            <input
                checked={answer.correct}
                type={"checkbox"}
                onChange={() => {
                  editAnswer(answer, {
                    answer: answer.answer,
                    correct: !answer.correct,
                  });
                }}
              />
            </AnswerCheckbox>
            <AnswerOption>
            {answer.answer}
            </AnswerOption>
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
  width: 3%;
`;

const AnswerTable = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
`;
