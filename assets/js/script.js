const startQuizBtn = document.querySelector(".start-button");
const highScoreBtn = document.getElementById("show-highscores");

//global variables set up with initial values on page load
let questionNumber = 0;
let quizTime = 60;
let correctAnswersCounter = 0;
let finalScore = 0;
let highScoresArray;

//array of questions as objects
//questions are taken from https://www.w3schools.com/
const question = [
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["1. onclick", "2. onchange", "3. onmouseclick"],
    answer: "1. onclick",
  },
  {
    question: 'How do you call a function named "myFunction"?',
    choices: [
      "1. call function myFunction()",
      "2. myFunction()",
      "3. call myFunction()",
    ],
    answer: "2. myFunction()",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choices: ["1. if i = 5", "2. if i = 5 then", "3. if (i == 5)"],
    answer: "3. if (i == 5)",
  },
  {
    question: "How does a FOR loop start?",
    choices: [
      "1. for (i = 0; i <= 5)",
      "2. for (i = 0; i <= 5; i++)",
      "3. for (i <= 5; i++)",
    ],
    answer: "2. for (i = 0; i <= 5; i++)",
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    choices: [
      '1. var colors = (1:"red", 2:"green", 3:"blue")',
      '2. var colors = "red", "green", "blue"',
      '3. var colors = ["red", "green", "blue"]',
    ],
    answer: '3. var colors = ["red", "green", "blue"]',
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    choices: ["1. Math.round(7.25)", "2. Math.rnd(7.25)", "3. round(7.25)"],
    answer: "1. Math.round(7.25)",
  },
];

let questionsLeft = question.length;

let timerInterval; //setting as global variable to be able to clear interval outside of timer function

//function to count time
function startTimer() {
  let timerCount = document.querySelector(".timer");
  timerInterval = setInterval(function () {
    quizTime--;
    timerCount.textContent = "Timer: " + quizTime;
    timerCount.setAttribute("style", "color: black; font-weight: normal");
if (quizTime<10 && quizTime >0) {
  timerCount.setAttribute("style", "color: red; font-weight: bold");
}

    if (quizTime === 0) {
      clearInterval(timerInterval);
      displayAllDone();
    }
  }, 1000);
}

//function to display High Scores
function showHighscores() {
  //in case jumped from questions screen
  clearInterval(timerInterval);

  //clearing questions section if called from questions screen
  document.getElementById("questions").innerText = "";
  //clearing all done section if called from all done screen
  document.getElementById("all-done").innerText = "";
  //hiding home screen content if called from home screen
  document.querySelector(".welcome-screen").classList.add("hide-content");

  const showScoresSection = document.querySelector("#view-highscores");
  showScoresSection.innerHTML = "";

  //pull scores from local storage
  let highScoresToDisplay = JSON.parse(localStorage.getItem("highScoresArray"));
  highScoresToDisplay.sort((a, b) => b.score - a.score);

  console.log(highScoresToDisplay);
  // showScoresSection.innerHTML = highScoresToDisplay;

  // displaying maximum top 10 records
  let howManyToDisplay = 0;

  if (highScoresToDisplay.length > 10) {
    howManyToDisplay = 10;
  } else {
    howManyToDisplay = highScoresToDisplay.length;
  }

  console.log(howManyToDisplay);
  //create all elements for high scores

  let scoreTitle = document.createElement("h3");
  scoreTitle.innerHTML = "High Scores:";

  let divScore = document.createElement("div");

  for (let i = 0; i < howManyToDisplay; i++) {
    let initials = highScoresToDisplay[i].initials;
    let score = highScoresToDisplay[i].score;
    let position = i+1;  
    let scoreString = position + ". " + "Initials: " + initials + " " + "Score: " + score;
    let scoreToDisplay = document.createElement("p");
    scoreToDisplay.innerHTML = scoreString;
    scoreToDisplay.setAttribute("style", "margin: 2%")
    divScore.appendChild(scoreToDisplay);
  }

  let clearScore = document.createElement("button");
  clearScore.innerHTML = "Clear Score";
  let restartBtn = document.createElement("button");
  restartBtn.innerHTML = "Try again";

  showScoresSection.append(scoreTitle, divScore, clearScore, restartBtn);

  clearScore.addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.clear;
  });

  restartBtn.addEventListener("click", restartQuiz);
}

function saveScores(score, initials) {
  alert("Good job " + initials + "\nScore:" + score);

  if (localStorage.getItem("highScoresArray") === null) {
    highScoresArray = []; //if nothing was stored yet or it was cleared, setting up new array to store highscores
  } else {
    highScoresArray = JSON.parse(localStorage.getItem("highScoresArray"));
  }

  console.log(localStorage.getItem("highScoresArray"));

  const result = {
    initials: initials.trim(),
    score: score,
  };

  highScoresArray.push(result);

  localStorage.setItem("highScoresArray", JSON.stringify(highScoresArray));

  showHighscores();
}

let displayAllDone = function () {
  //clearing questions section
  document.getElementById("questions").innerText = "";

  //clearing all done section
  document.getElementById("all-done").innerText = "";

  //saving leftover time as a final score
  finalScore = quizTime;

  clearInterval(timerInterval);

  //rendering all done section
  let allDoneSection = document.getElementById("all-done");
  let allDoneTitle = document.createElement("h3");
  let finalScoreParagraph = document.createElement("p");
  let enterInitialsLabel = document.createElement("label");
  enterInitialsLabel.for = "initials";
  enterInitialsLabel.innerHTML =
    "Please enter your initials and click Submit button to save your score: ";
  let enterInitials = document.createElement("input");
  enterInitials.id = "initials";
  let submitBtn = document.createElement("button");
  submitBtn.innerHTML = "Submit";
  let restartBtn = document.createElement("button");
  restartBtn.innerHTML = "Try again";

  if (finalScore < 1) {
    allDoneTitle.innerText = "You ran out of time.";
    finalScoreParagraph.innerText = `Your final score is ${finalScore}. Better luck next time. Try again to improve!`;
  } else {
    allDoneTitle.innerText = "Well done!";
    finalScoreParagraph.innerText = `Your final score is ${finalScore}. Try again to improve!`;
  }

  allDoneSection.append(
    allDoneTitle,
    finalScoreParagraph,
    enterInitialsLabel,
    enterInitials,
    submitBtn,
    restartBtn
  );

  submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    saveScores(finalScore, enterInitials.value.toUpperCase());
  });
  restartBtn.addEventListener("click", restartQuiz);
};

//questions display one by one
let loadQuestion = function () {
  //checkTimer();
  let answer = document.getElementById("answer");
  document.getElementById("questions").innerText = "";

  let currentQuestion = question[questionNumber];

  let questionHeader = document.createElement("h2");
  questionHeader.innerText = currentQuestion.question;

  let btnDiv = document.createElement("div"); //division for all the choices
  btnDiv.classList.add("answers-display");

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choiceBtn = document.createElement("button");
    choiceBtn.classList.add("answers-button");
    choiceBtn.innerHTML = currentQuestion.choices[i];
    btnDiv.append(choiceBtn);
    document.getElementById("questions").append(questionHeader, btnDiv);

    //event listener for answer selection
    choiceBtn.addEventListener("click", function (event) {
      event.preventDefault();
      let selectedChoice = event.target.innerText;
      if (selectedChoice === currentQuestion.answer) {
        answer.innerText = "Correct!";
        setTimeout(function () {
          answer.innerText = "";
        }, 500);
        questionNumber++;
        questionsLeft--;

        if (questionsLeft > 0) {
          loadQuestion();
        } else {
          displayAllDone();
        }
      } else {
        //decrease timer by 10 seconds if more than 10 seconds left
        if (quizTime > 10) {
          quizTime -= 10;
        } else {
          quizTime = 1; //not 0 because it will still go through one loop and get to 0
        }
        answer.innerText = "Wrong!";
        setTimeout(function () {
          answer.innerText = "";
        }, 500);
        loadQuestion();
      }
    });
  }
};

let restartQuiz = function (event) {
  event.preventDefault();

  document.getElementById("all-done").innerText = "";
  document.getElementById("view-highscores").innerText = "";

  //resetting all the initial values to 0
  questionNumber = 0;
  quizTime = 60;
  correctAnswersCounter = 0;
  finalScore = 0;
  questionsLeft = question.length;

  //restarting timer
  startTimer();

  //reloading questions
  loadQuestion();
};

let startQuiz = function (event) {
  event.preventDefault();

  //hide welcome screen
  document.querySelector(".welcome-screen").classList.add("hide-content");

  //starting timer
  startTimer();

  //loading questions
  loadQuestion();
};

// Event listener when user clicks Start quiz button
startQuizBtn.addEventListener("click", startQuiz);

//Event listener for Highscores button
highScoreBtn.addEventListener("click", showHighscores);
