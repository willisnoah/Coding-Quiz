var startBtn = document.getElementById("start-btn")
var questionEl = document.getElementById("question")
var questionTextEl = document.getElementById("question-text")
var shuffledQuestions; 
var currentQuestionIndex;
var answerBtnEl = document.getElementById("answer-btn")
var element = document.getElementById("feedback")
var timerInterval;
var score = 0;
var endScreen = document.getElementById("end-screen")


startBtn.addEventListener("click", startQuiz)

startBtn.addEventListener("click", function() {
    time.textContent = count;
    setInterval(function () {
        count-=1;
        time.textContent = count;
    }, 1000);
})

function startQuiz() {
    startBtn.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionEl.classList.remove("hide");
    setNextQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
      time.textContent = timeLeft;
      if (timeLeft <= 0) {
        endQuiz();
      }
    }, 1000);
  }

var time = document.getElementById("timer-text")
var count = 60;

function endQuiz() {
    clearInterval(timerInterval);
   questionTextEl.classList.add("hide");
    endScreen.classList.remove("hide");
    var combinedScore = timeLeft + score;
    finalScore.textContent = combinedScore;
  }

function saveScore() {
    var initials = initialsInput.value.trim();
    if (initials !== "") {
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      var newScore = { initials: initials, finalScore: timeLeft + score };
      highScores.push(newScore);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      location.href = "highscores.html";
    }
  }

function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    currentQuestionIndex++;
}

function showQuestion(question) {
    questionTextEl.textContent = question.question;
    answerBtnEl.innerHTML = "",
    question.answer.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectedAnswer);
        answerBtnEl.appendChild(button);
})
}

function selectedAnswer(event) {
    var clickedEl = event.target;
    var correct = Boolean(clickedEl.dataset.correct);
        if (correct) {
            element.textContent = "Correct!";
            score++
          } else {
            element.textContent = "Wrong!";
          }
          element.classList.remove("hide");
        setTimeout(() => {
        element.classList.add("hide");
    }, 500);
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
      }
    }

var questions = [
    {
        question: "How do you create a variable?",
        answer: [
            {text: '1. Use "var" ', correct: true},
            {text: '2. Use "iable" ', correct: false},
            {text: '3. Use "function" ', correct: false},
            {text: '4. Use "variable" ', correct: false},
        ]   
    },
    {
        question: "What does a boolean represent?",
        answer: [
            {text: "1. Type of variable that represents a series of characters", correct: false},
            {text: "2. A result that can only have one of two possible values", correct: true},
            {text: "3. A way a programmer scares a ghost", correct: false}, 
            {text: "4. All of the above", correct: false},
        ]
    },
    {
        question: "What is an array?",
        answer: [
            {text: "1. A css style", correct: false},
            {text: "2. A type of html", corect: false},
            {text: "3. A single variable that is used to hold a group of data", correct: true},
            {text: "4. A type of REAME file", correct: false},
        ]
    }
]