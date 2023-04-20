// To start user clicks the start button
const startQuizBtn = document.querySelector(".start-button");

//global variables
let questionNumber = 0;
let quizTime = 60;
let timerCount = document.querySelector(".timer");
let answer = document.getElementById("answer");
let correctAnswersCounter = 0;
let finalScore = 0;

//array of questions as objects
//questions are taken from https://www.w3schools.com/ JavaScript quiz
const question = [
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onclick", "onchange", "onmouseclick"],
    answer: "onclick",
  },
  {
    question: 'How do you call a function named "myFunction"?',
    choices: [
      "call function myFunction()",
      "myFunction()",
      "call myFunction()",
    ],
    answer: "myFunction()",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choices: ["if i = 5", "if i = 5 then", "if (i == 5)"],
    answer: "if (i == 5)",
  },
  {
    question: "How does a FOR loop start?",
    choices: [
      "for (i = 0; i <= 5)",
      "for (i = 0; i <= 5; i++)",
      "for (i <= 5; i++)",
    ],
    answer: "for (i = 0; i <= 5; i++)",
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    choices: [
      'var colors = (1:"red", 2:"green", 3:"blue")',
      'var colors = "red", "green", "blue"',
      'var colors = ["red", "green", "blue"]',
    ],
    answer: 'var colors = ["red", "green", "blue"]',
  },
  {
    question: "How do you round the number 7.25, to the nearest integer?",
    choices: ["Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)"],
    answer: "Math.round(7.25)",
  },
];

let questionsLeft = question.length;
console.log(questionsLeft);

//function to count time
function startTimer() {
  const timerInterval = setInterval(function () {
    quizTime--;
    timerCount.textContent = "Timer: " + quizTime;
    if (quizTime === 0) {
      clearInterval(timerInterval);
      // displayAllDone();
    }
  }, 1000);
}

let displayAllDone = function () {
  finalScore = quizTime;

  //clearing timer
  quizTime = 1;

  //clearing questions section
  document.getElementById("questions").innerText = "";

  //rendering all done section
  let allDoneSection = document.getElementById("all-done");
  let allDoneTitle = document.createElement("h3");

  let finalScoreParagraph = document.createElement("p");

  if (finalScore < 1) {
    allDoneTitle.innerText = "All done.";
    finalScoreParagraph.innerText = `Your final score is ${finalScore}. Better luck next time!`;
  } else {
    allDoneTitle.innerText = "Well done!";
    finalScoreParagraph.innerText = `Your final score is ${finalScore}. Try again to improve!`;
  }

  allDoneSection.append(allDoneTitle, finalScoreParagraph);
};

function showHighscores() {
  //create all elements for high scores
  //pull scores from local storage
}

//questions display one by one
let loadQuestion = function () {
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
        console.log(questionNumber);
        questionsLeft--;
        console.log(questionsLeft);

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

//after all questions are answered, all done screen to appear with final score of how much time left and option to enter initials

//when initials entered and submit button is pressed, highscores to appear

//user can see all saved high scores up to 5 and either clear screen or start over
