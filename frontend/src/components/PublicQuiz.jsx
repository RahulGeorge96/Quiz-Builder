import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from "@mui/material";
import api from "../api";
import { useParams } from "react-router-dom";

const PublicQuiz = () => {
  const { permalink } = useParams(); // Get the permalink from the URL
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(`/quizzes/public/${permalink}`);
        setQuiz(response.data); // Store quiz data including questions and options
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [permalink]);

  // Handle answer changes
  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setAnswers(updatedAnswers);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await api.post(`/quizzes/public/${permalink}/submit`, {
        answers,
      });
      alert(`You scored ${response.data.score}!`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h5">{quiz.title}</Typography>
      {quiz.questions.map((question, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{question.questionText}</Typography>
            {question.questionType === "single" ? (
              <FormControl component="fieldset">
                <RadioGroup
                  name={`question-${index}`}
                  value={answers[index] || ""}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                >
                  {question.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ) : (
              <FormControl component="fieldset">
                <FormGroup>
                  {question.options.map((option, i) => (
                    <FormControlLabel
                      key={i}
                      control={<Checkbox />}
                      label={option}
                      onChange={(e) => {
                        const updatedAnswers = [...answers];
                        if (e.target.checked) {
                          updatedAnswers[index] = [
                            ...(updatedAnswers[index] || []),
                            option,
                          ];
                        } else {
                          updatedAnswers[index] = updatedAnswers[index]?.filter(
                            (ans) => ans !== option
                          );
                        }
                        setAnswers(updatedAnswers);
                      }}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Quiz
      </Button>
    </Box>
  );
};

export default PublicQuiz;
