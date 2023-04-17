// To start user clicks the start button

const startQuizBtn = document.querySelector(".start-button");
let questionNumber = 0;
let quizTime = 60;
const timerCount = document.querySelector(".timer");
let answer = document.getElementById("answer");


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

//questions constructor
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



//questions display one by one
let loadQuestion = function () {
  document.getElementById("questions").innerText = "";

  let currentQuestion = question[questionNumber];

  let questionHeader = document.createElement("h2");
  questionHeader.innerText = currentQuestion.question;

  let btnDiv = document.createElement("div"); //division for all the choices
  btnDiv.classList.add("answers-display");

  //  let correctOrWrong = document.createElement("p");

  for (let i = 0; i < currentQuestion.choices.length; i++) {
    let choiceBtn = document.createElement("button");
    choiceBtn.classList.add("answers-button");
    choiceBtn.innerHTML = currentQuestion.choices[i];

    //event listener for answer selection
    choiceBtn.addEventListener("click", function (event) {
      event.preventDefault();
      let selectedChoice = event.target.innerText;
      if (selectedChoice === currentQuestion.answer) {
        answer.innerText = "Correct!";
        questionNumber++;
        loadQuestion();
      } else {
        //decrease timer by 10 seconds if more than 10 seconds left
        if (quizTime > 10) {
          quizTime -= 10;
        } else {
          quizTime = 1; //not 0 because it will still go through one loop and get to 0
        }
        answer.innerText = "Wrong!";
        loadQuestion();
      }
    });
    btnDiv.append(choiceBtn);
  }

  document.getElementById("questions").append(questionHeader, btnDiv);
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
