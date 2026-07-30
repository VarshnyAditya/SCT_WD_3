const correctSound = new Audio("sounds/freesound-community-good-6081_f1KKtydP.mp3");
const wrongSound = new Audio("sounds/mrstokes302-oops-sfx-mrstokes302-527192_5ngaL0tx.mp3");

const questions = [
    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<img>", correct: false },
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<p>", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "Netscape", correct: true },
            { text: "Apple", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "<!-- -->", correct: false },
            { text: "//", correct: true },
            { text: "**", correct: false },
            { text: "##", correct: false }
        ]
    },
    {
        question: "Which method is used to print something in the browser console?",
        answers: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "document.write()", correct: false },
            { text: "alert.log()", correct: false }
        ]
    }
];
// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const feedback = document.getElementById("feedback");

// Variables
let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Show Question
function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

// Reset
function resetState() {
    nextButton.style.display = "none";
    feedback.textContent = "";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Select Answer
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        correctSound.currentTime = 0;
        correctSound.play();

        feedback.textContent = "✅ Good!";
        feedback.style.color = "green";

        selectedBtn.style.background = "green";
        selectedBtn.style.color = "#fff";

        score++;
    } else {
        wrongSound.currentTime = 0;
        wrongSound.play();

        feedback.textContent = "❌ Oops!";
        feedback.style.color = "red";

        selectedBtn.style.background = "red";
        selectedBtn.style.color = "#fff";
    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {
            button.style.background = "green";
            button.style.color = "#fff";
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Score
function showScore() {
    resetState();
    questionElement.innerHTML = `🎉 You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>!`;

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Next Button
function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Start Button
startBtn.addEventListener("click", () => {

    startScreen.style.display = "none";
    quizScreen.style.display = "block";

    startQuiz();

});

// Next / Play Again
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        handleNextButton();
    } else {

        if (nextButton.innerHTML === "Play Again") {

            startScreen.style.display = "block";
            quizScreen.style.display = "none";

        } else {

            showScore();

        }

    }

});