
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Link,
// } from "@mui/material";
// import api from "../api";

// const QuizList = () => {
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await api.get("/quizzes", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setQuizzes(response.data);
//       } catch (error) {
//         console.error("Error fetching quizzes:", error);
//       }
//     };
//     fetchQuizzes();
//   }, []);

//   // Function to handle publishing a quiz
//   const handlePublish = async (quizId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await api.post(
//         `/quizzes/${quizId}/publish`, // Call the backend to publish the quiz
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Update the quiz state with the published quiz and its permalink
//       setQuizzes((prevQuizzes) =>
//         prevQuizzes.map((quiz) =>
//           quiz._id === quizId
//             ? { ...quiz, isPublished: true, permalink: response.data.permalink }
//             : quiz
//         )
//       );

//       console.log("Quiz published:", response.data);
//     } catch (error) {
//       console.error("Failed to publish quiz:", error);
//     }
//   };

//   // Function to handle deleting a quiz
//   const handleDelete = async (quizId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await api.delete(`/quizzes/${quizId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Remove the deleted quiz from the state
//       setQuizzes((prevQuizzes) =>
//         prevQuizzes.filter((quiz) => quiz._id !== quizId)
//       );

//       console.log("Quiz deleted:", response.data);
//     } catch (error) {
//       console.error("Failed to delete quiz:", error);
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h5">My Quizzes</Typography>
//       {quizzes.map((quiz) => (
//         <Card key={quiz._id} sx={{ marginBottom: 2 }}>
//           <CardContent>
//             <Typography variant="h6">{quiz.title}</Typography>
//             {/* Only show the Publish button if the quiz is not published yet */}
//             {!quiz.isPublished ? (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ marginTop: 2 }}
//                 onClick={() => handlePublish(quiz._id)}
//               >
//                 Publish
//               </Button>
//             ) : (
//               <>
//                 <Typography
//                   variant="body2"
//                   color="success.main"
//                   sx={{ marginTop: 2 }}
//                 >
//                   Published
//                 </Typography>
//                 {/* Display the permalink (published link) */}
//                 <Typography variant="body2" sx={{ marginTop: 1 }}>
//                   <strong>Published Link: </strong>
//                   <Link
//                     href={`/public/${quiz.permalink}`} // Display the permalink as a link
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     color="primary"
//                   >
//                     {`/public/${quiz.permalink}`}
//                   </Link>
//                 </Typography>

//                 {/* Show the delete button only for published quizzes */}
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   sx={{ marginTop: 2 }}
//                   onClick={() => handleDelete(quiz._id)}
//                 >
//                   Delete
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </Box>
//   );
// };

// export default QuizList;


import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Link,
} from "@mui/material";
import api from "../api";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/quizzes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, []);

  // Function to handle publishing a quiz
  const handlePublish = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/quizzes/${quizId}/publish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz._id === quizId
            ? { ...quiz, isPublished: true, permalink: response.data.permalink }
            : quiz
        )
      );
    } catch (error) {
      console.error("Failed to publish quiz:", error);
    }
  };

  // Function to handle deleting a quiz
  const handleDelete = async (quizId) => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/quizzes/${quizId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz._id !== quizId)
      );
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h5">My Quizzes</Typography>
      {quizzes.map((quiz) => (
        <Card key={quiz._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">{quiz.title}</Typography>
            {!quiz.isPublished ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2 }}
                onClick={() => handlePublish(quiz._id)}
              >
                Publish
              </Button>
            ) : (
              <>
                <Typography
                  variant="body2"
                  color="success.main"
                  sx={{ marginTop: 2 }}
                >
                  Published
                </Typography>
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  <strong>Published Link: </strong>
                  <Link
                    href={`/public/${quiz.permalink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                  >
                    {`/public/${quiz.permalink}`}
                  </Link>
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginTop: 2 }}
                  onClick={() => handleDelete(quiz._id)}
                >
                  Delete
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default QuizList;
