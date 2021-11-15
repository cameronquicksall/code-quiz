var countdown = 90;
var timerId;
var currentQuestionIndex = 0;

var startBtn = document.getElementById("start");
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("countdown");
var choiceEl = document.getElementById("choice-options");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
    var startScreen = document.getElementById("start-screen");
    startScreen.setAttribute("class","hide");
    //Start Timer
    questionsEl.setAttribute("class", " ");
    timerId = setInterval(function(){
        clockTick();
    }, 1000);
    timerEl.textContent = countdown;

    getQuestion();

}
function clockTick() {
    countdown--;
    timerEl.textContent = countdown;
    if (countdown === 0) {
        quizEnd();
    }
}
var questionsList = [
    {
        question: "Commonly used data types include all of the following EXCEPT ___",
        choice: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts",

    },
    {
        question: "A very useful tool during development and debugging for print content is ___",
        choice : ["for loops","console.log","terminal bash","JavaScript"],
        answer: "console.log",

    },
    {
        question: "Arrays in JavaScript can be used to store  ____",
        choice: ["Numbers and Strings","Other Arrays","Booleans", "All of the Above",],
        answer: "All of the Above",

    },
    {
        question: "The condition in an if/else statement is enclosed in ____",
        choice: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        answer: "Parenthesis",

    },
    {
        question: "String values must be enclosed in ____ when being assigned to variables",
        choice: ["Commas", "Curly Brackets","Quotes", "Brackets"],
        answer: "Quotes",

    }
]

function getQuestion() {
    var currentQuestion = questionsList[currentQuestionIndex];
    questionsEl.children[0].textContent = currentQuestion.question;
    while (choiceEl.hasChildNodes()) {
        choiceEl.removeChild(choiceEl.lastChild);
    };
    for (var i = 0; i < currentQuestion.choice.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.textContent = currentQuestion.choice[i];

        choiceEl.appendChild(choiceButton);
    };
    choiceEl.children[0].addEventListener("click", function(e){
        questionClick(choicesEl.children[0]);
    });
    choiceEl.children[1].addEventListener("click", function(e){
        questionClick(choicesEl.children[1]);
    });
    choiceEl.children[2].addEventListener("click", function(e){
        questionClick(choicesEl.children[2]);
    });
    choiceEl.children[3].addEventListener("click", function(e){
        questionClick(choicesEl.children[3]);
    });
}


function questionClick(answerChoice) {
    if(answerChoice.textContent != questionsList[currentQuestionIndex].answer){
        //reduce time if incorrect
        countdown -= 10;
        feedbackEl.textContent ="Incorrect";
    }
    else{
        feedbackEl.textContent = "Correct";
    };

    feedbackEl.setAttribute("class", "feedback");

    currentQuestionIndex++;

    if(currentQuestionIndex === questionsList.length){
        quizEnd();
    }else{
        getQuestion();
    };
}
function quizEnd() {
    clearInterval(timerId);
    timerEl.textContent = countdown;

    var questionSub = document.getElementById("questions");
    questionSub.setAttribute("class", "hidden");
    feedbackEl.setAttribute("class", "hidden");

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class", "hidden");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = countdown;
}

function saveHighscore() {
    var initials = initialsEl.value;
    if (initials === "") {
        alert("Initials cannot be blank!");
        return;
    } else {
        var highscores;
        if (JSON.parse(localStorage.getItem("highscores")) !=null) {
            highscores = JSON.parse(window.localStorage.getItem("highscores"));
        } else {
            highscores = [];
        };
        var newScore = {
            initials: initials,
            score: countdown
        };
        highscores.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(highscores));
        // Highscore page
        location.href = "highscores.html";
    };
}

submitBtn.onclick = saveHighscore;
startBtn.onclick = startQuiz;
