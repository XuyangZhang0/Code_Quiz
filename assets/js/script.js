// get all buttons and sections
const timeEl = document.getElementById("timeleft");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const btnStartEl = document.getElementById("btn_start");
const resultEl = document.getElementById("result");
console.log(timeEl);
console.log(questionEl);
console.log(answersEl);
console.log(btnStartEl);
// declare global variables
let currentQuestion;
let answers;
let points;
let secondsLeft;
// initialize question pool
const myQuestions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            "Douglas Crockford",
            "Sheryl Sandberg",
            "Brendan Eich"
        ],
        correctAnswer: 2,
        explanation: ""
    },
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        answers: [
            `javascript`,
            `scripted`,
            `script`,
            `js`
        ],
        correctAnswer: 2,
        explanation: "If we want to write a JavaScript code under HTML tag, you will have to use the “script” tag."
    },
    {
        question: `Choose the correct JavaScript syntax to change the content of the following HTML code.
        <p id="geek">GeeksforGeeks</p>`,
        answers: [
            `document.getElement(“geek”).innerHTML=”I am a Geek”;`,
            `document.getElementById(“geek”).innerHTML=”I am a Geek”`,
            `document.getId(“geek”)=”I am a Geek”;`,
            `document.getElementById(“geek”).innerHTML=I am a Geek;`
        ],
        correctAnswer: 1,
        explanation: "The correct syntax to access the element is document.getElementById(“geek”). Here we want to access the content written under that id, so we used .innerHTML to specify that and finally we replaced the content with whatever is written inside the quotes."
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            "Node.js",
            "TypeScript",
            "npm"
        ],
        correctAnswer: 2,
        explanation: ""
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            "Angular",
            "jQuery",
            "RequireJS",
            "ESLint"
        ],
        correctAnswer: 3,
        explanation: ""
    }
];

console.log(myQuestions);


// Button 1 (Start Game) Event Listener
btnStartEl.addEventListener("click", startQuiz);

answersEl.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches(".answer")) {
        var index = parseInt(element.getAttribute("id"), 10);
        if (currentQuestion.correctAnswer === index) {
            resultEl.textContent = "Congrats! You got it right! 10 points added!"
            points += 10;
            setTimeout(() => {
                showNextQuestion();
            }, 2000);

        } else {
            resultEl.textContent = `Wrong! Correct answer is ${currentQuestion.correctAnswer + 1}.
            Explanation: ${currentQuestion.explanation}`
            // answersEl.innerHTML="";
            // How do I prevent user from clicking on other answers before I show the next question?
            secondsLeft -= 10;
            setTimeout(() => {
                showNextQuestion();
            }, 5000);
        }

    }

})






// show next question on the screen
function showNextQuestion() {
    resultEl.textContent = "";
    let questionAnswersHTML = "";
    currentQuestion = myQuestions.shift();
    if (typeof currentQuestion == "object") {
        questionEl.textContent = currentQuestion.question;
        answers = currentQuestion.answers;


        for (var i = 0; i < currentQuestion.answers.length; i++) {
            questionAnswersHTML += `<p class="answer" id="${i}">${i + 1}. ${answers[i]}</p>`;
            // questionAnswersHTML += "<p>lalala</p>"

            // console.log(i);
        }

        answersEl.innerHTML = questionAnswersHTML;

    } else {
        alert("reached last question!");
    }


}

// Count Down
function startQuiz() {
    // Sets interval in variable
    btnStartEl.setAttribute("style", "display: none")
    secondsLeft = 75;
    showNextQuestion();
    var timerInterval = setInterval(function () {

        timeEl.textContent = `Time: ${secondsLeft}`;


        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function end the quiz
            endQuiz();
        }
        secondsLeft--;
    }, 1000);
}

// Set high score (use local storage)

// read high score

// start game
// showNextQuestion();

// startQuiz();
