// To start user clicks the start button



const startQuizBtn = document.querySelector(".start-button");
let questionNumber = 0;
let quizTime = 60;
const timerCount = document.querySelector(".timer");

//function to count time
function startTimer() {
  const timerInterval = setInterval(function () {
    quizTime--;
    timerCount.textContent = "Timer: " + quizTime;

    if (quizTime <= 0) {
      // Stops execution of action at set interval
      //clearInterval(timerInterval);
      //displayAllDone(); //do i need to display all done if timer is 0?
      clearTimeout(timerInterval);
      
    }
  }, 1000);
}

function displayAllDone() {
  //create all elements
  //calculate score based on time left
}

function showHighscores() {
  //create all elements for high scores
  //pull scores from local storage
}

//quiz questions
const question = [
  {
    question: "First question",
    choices: ["opt1", "opt2", "opt3"],
    answer: "opt1",
  },
  {
    question: "second question",
    choices: ["opt4", "opt5", "opt6"],
    answer: "opt6",
  },
  {
    question: "third question",
    choices: ["opt4", "opt5", "opt6"],
    answer: "opt6",
  },
  {
    question: "fourth question",
    choices: ["opt4", "opt5", "opt6"],
    answer: "opt4",
  },
  {
    question: "fifth question",
    choices: ["opt4", "opt5", "opt6"],
    answer: "opt5",
  },
];

// displayCorrect = function () {
//   let correctAnswer = document.createElement("p");
//   correctAnswer.innerText = 'Correct!';
// correctAnswer.parentElement.append(correctAnswer);
// }

//questions constructor
let loadQuestion = function () {

  document.getElementById("questions").innerText = "";
  let currentQuestion = question[questionNumber];
  let parentDiv = document.createElement("div");
  //parentDiv.classList.add("questions-display");

  let questionHeader = document.createElement("h2");
  questionHeader.innerText = currentQuestion.question;
  
  let btnDiv = document.createElement("div"); //division for all the choices
  btnDiv.classList.add("answers-display");

  //let correctOrWrong = document.createElement("p");

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choiceBtn = document.createElement("button");
    choiceBtn.classList.add("answers-button");
    choiceBtn.innerHTML = currentQuestion.choices[i];
    choiceBtn.addEventListener("click", function (event) {
      event.preventDefault();
      let selectedChoice = event.target.innerText;
      if (selectedChoice === currentQuestion.answer) {
        // displayCorrect();
        //display that answers is correct
        //correctOrWrong.innerText = "Correct!";
        //go to the next question
        questionNumber++;
        loadQuestion();
      } else {
        //decrease timer by 10 seconds if more than 10 seconds left
        if (quizTime > 10) {
          quizTime -= 10;
        } else {
          quizTime = 1;
        }
        // displayWrong();
        //display that answer is incorrect
        //correctOrWrong.innerText = "Wrong!";
        //go to the same question again
        loadQuestion(); 
      }
    });
    btnDiv.append(choiceBtn);
  }
  parentDiv.append(questionHeader, btnDiv);
  document.getElementById("questions").append(parentDiv);

};

startQuiz = function (event) {
  event.preventDefault();

  //hide welcome screen
  document.querySelector(".welcome-screen").classList.add("hide-content");
  startTimer();
  loadQuestion();
};

// Event listener when user clicks Start quiz button
startQuizBtn.addEventListener("click", startQuiz);

//when start button pressed times start counting down and first quiz question to appear and welcome screen to disappear

//user to select answer (even listener to click)

//if correct answer selected, show Correct! underneath and jump to next question

//if incorrect answer is selected, show "Wrong!", deduct 10 second from the timer and allow user to select new answer until correct answer is selected

//after all questions are answered, all done screen to appear with final score of how much time left and option to enter initials

//when initials entered and submit button is pressed, highscores to appear

//user can see all saved high scores up to 5 and either clear screen or start over
