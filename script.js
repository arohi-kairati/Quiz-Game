//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("maximum-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the Capital city of France?",
    answer: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answer: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answer: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//Quiz State Vars
let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;



//Event Listeners
startButton.addEventListener('click', startQuizMethod);
restartButton.addEventListener('click', restartQuizMethod);

function startQuizMethod(){
    // reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    //reset state
    answerDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];

    currentQuestionSpan.textContent = currentQuestionIndex + 1;

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + '%';

    questionText.textContent = currentQuestion.question;

    //to removde previous question options
    answersContainer.innerHTML = "";

    currentQuestion.answer.forEach((answer)=> {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('answer-btn');

        button.dataset.correct = answer.correct;

        button.addEventListener('click', selectAnswerMethod);

        answersContainer.appendChild(button);
    })
}


function selectAnswerMethod(event){
  if(answerDisabled) return;

  answerDisabled = true;

  const selectAnswerButton = event.target;
  const isCorrect = selectAnswerButton.dataset.correct === 'true';

  //answersContainer.children is not an array so forEach can't be used directly on it
  Array.from(answersContainer.children).forEach((button) => {
    if(button.dataset.correct === 'true') {
      button.classList.add('correct');
    } else {
      button.classList.add('incorrect');
    }
  });


  if(isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;


    //check if there more question or quiz is over
    if(currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000); //milliseconds
}

function showResults(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;
  const percentage = (score/quizQuestions.length) * 100;
  if(percentage == 100){
    resultMessage.textContent = "Perfect! You are a genius!";
  } else if(percentage >= 80){
    resultMessage.textContent = "Great job! You know your stuff";
  } else if(percentage >= 60){
    resultMessage.textContent = "Good effort! Keep Learning!";
  } else if(percentage >= 40){
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}


function restartQuizMethod(){
    resultScreen.classList.remove("active");

    startQuizMethod();
}

