import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import api from "../api";
import { useNavigate } from "react-router-dom";

const QuizForm = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", ""],
        correctAnswers: [],
        questionType: "single",
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async () => {
      const token = localStorage.getItem("token");
    await api.post(
      "/quizzes",
      { title, questions },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate("/quizzes");
  };

  return (
    <Container>
      <Typography variant="h4">Create Quiz</Typography>
      <TextField
        label="Quiz Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      {questions.map((question, index) => (
        <Box key={index} mt={2}>
          <TextField
            label={`Question ${index + 1}`}
            value={question.questionText}
            onChange={(e) =>
              updateQuestion(index, "questionText", e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <Typography variant="body2">Options</Typography>
          {question.options.map((option, optIndex) => (
            <TextField
              key={optIndex}
              value={option}
              onChange={(e) => {
                const newOptions = [...question.options];
                newOptions[optIndex] = e.target.value;
                updateQuestion(index, "options", newOptions);
              }}
              fullWidth
              margin="dense"
            />
          ))}
          <Button
            onClick={() =>
              updateQuestion(index, "options", [...question.options, ""])
            }
          >
            Add Option
          </Button>
          <Box display="flex" mt={1}>
            <Button
              variant="contained"
              onClick={() => updateQuestion(index, "questionType", "single")}
            >
              Single Answer
            </Button>
            <Button
              variant="contained"
              onClick={() => updateQuestion(index, "questionType", "multiple")}
              sx={{ ml: 2 }}
            >
              Multiple Answers
            </Button>
          </Box>
        </Box>
      ))}
      <Button variant="outlined" onClick={addQuestion}>
        Add Question
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Create Quiz
      </Button>
    </Container>
  );
};

export default QuizForm;
