
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
          padding: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to Quiz App
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 4 }}>
          Create, share, and take quizzes with ease.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/dashboard")}
          sx={{ marginBottom: 2 }}
        >
          Go to Dashboard
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/public/sample-quiz")}
        >
          Try a Sample Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
