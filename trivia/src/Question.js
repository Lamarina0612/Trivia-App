import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@mui/lab/Alert";

const useStyles = makeStyles({
  card: {
    marginBottom: "16px",
  },
  radioGroup: {
    flexDirection: "column",
  },
});

const Question = ({ questionObj }) => {
  const classes = useStyles();
  const [selectedAnswer, setSelectedAnswer] = React.useState("");
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
    const answerIsCorrect = event.target.value === questionObj.correct_answer;
    setIsCorrect(answerIsCorrect);
    setIsAnswered(true);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Randomize the answer options
  const answers = [
    ...questionObj.incorrect_answers,
    questionObj.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          <div dangerouslySetInnerHTML={{ __html: questionObj.question }} />
        </Typography>
        <RadioGroup
          className={classes.radioGroup}
          value={selectedAnswer}
          onChange={handleChange}
        >
          {answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={answer}
              control={<Radio />}
              label={<div dangerouslySetInnerHTML={{ __html: answer }} />}
              disabled={isAnswered}
            />
          ))}
        </RadioGroup>
      </CardContent>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isCorrect ? "success" : "error"}
        >
          {isCorrect ? "Correct!" : "Incorrect!"}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default Question;
