const quizData = [
    {
        question: "What is the capital of France?",
        a: "London",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c",
    },
    {
        question: "What is the capital of Spain?",
        a: "London",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "b",
    },
    {
        question: "What is the capital of Portugal?",
        a: "London",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "d",
    },
    {
        question: "What is the capital of England?",
        a: "London",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "a",
    },

    {
        question: "Which planet is known as the Red Planet?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "b",
    },
    {
        question: "Which country is the largest by land area?",
        a: "United States",
        b: "China",
        c: "Canada",
        d: "Russia",
        correct: "d",
    },
    {
        question: "What is the smallest country in the world?",
        a: "Monaco",
        b: "Vatican City",
        c: "Nauru",
        d: "San Marino",
        correct: "b",
    },
    {
        question: "Which is the longest river in the world?",
        a: "Amazon River",
        b: "Nile River",
        c: "Yangtze River",
        d: "Ganges River",
        correct: "b",
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        a: "Oxygen",
        b: "Osmium",
        c: "Ozone",
        d: "Olivine",
        correct: "a",
    },
    {
        question: "Which programming language is known as the mother of all languages?",
        a: "C",
        b: "Assembly Language",
        c: "Java",
        d: "Python",
        correct: "b",
    },
    {
        question: "What is the largest mammal?",
        a: "African Elephant",
        b: "Blue Whale",
        c: "Giraffe",
        d: "Orca",
        correct: "b",
    },
    {
        question: "What is the capital of Japan?",
        a: "Beijing",
        b: "Seoul",
        c: "Tokyo",
        d: "Hanoi",
        correct: "c",
    },
    {
        question: "What is the currency of the United Kingdom?",
        a: "Euro",
        b: "Pound Sterling",
        c: "Dollar",
        d: "Yen",
        correct: "b",
    },
    {
        question: "What is the square root of 64?",
        a: "6",
        b: "8",
        c: "10",
        d: "12",
        correct: "b",
    },
];

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const nextBtn = document.getElementById("next");
const results = document.getElementById("results");
const scoreEl = document.getElementById("score");
const highScores = document.getElementById("highScores");
const restartBtn = document.getElementById("restart");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    resetButtonStyles();
    nextBtn.style.display = "none";

    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    optionButtons.forEach((button) => {
        button.innerText = currentQuizData[button.id];
        button.addEventListener("click", handleAnswer);
    });
}

function handleAnswer(event) {
    const selectedButton = event.target;
    const selectedAnswer = selectedButton.id;

    if (selectedAnswer === quizData[currentQuiz].correct) {
        score++;
        selectedButton.classList.add("correct");
    } else {
        selectedButton.classList.add("wrong");
       
        const correctButton = document.getElementById(quizData[currentQuiz].correct);
        correctButton.classList.add("correct");
    }

    
    optionButtons.forEach((button) => button.removeEventListener("click", handleAnswer));

    nextBtn.style.display = "inline-block";
}

function resetButtonStyles() {
    optionButtons.forEach((button) => {
        button.classList.remove("correct", "wrong");
    });
}

nextBtn.addEventListener("click", () => {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
});

function showResults() {
    quiz.style.display = "none";
    results.style.display = "block";
    scoreEl.innerText = score;
    let highScoresArray = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresArray.push(score);
    highScoresArray.sort((a, b) => b - a);
    highScoresArray = highScoresArray.slice(0, 5);
    highScores.innerHTML = "";
    highScoresArray.forEach((highScore) => {
        const li = document.createElement("li");
        li.innerText = highScore;
        highScores.appendChild(li);
    });
    localStorage.setItem("highScores", JSON.stringify(highScoresArray));
}

restartBtn.addEventListener("click", () => {
    currentQuiz = 0;
    score = 0;
    results.style.display = "none";
    quiz.style.display = "block";
    loadQuiz();
});