var startButton = document.getElementById('start-btn')
var scoreButton = document.getElementById('high-scores')
var questionBoxEl = document.getElementById('question-box')
var questionEl = document.getElementById('question')
var answerBtnEl = document.getElementById('answer-choice')
var timerDisplay = document.getElementById('time-left')

var isWin = false;
var timer;
var timerCount;
var availQuestions = [];
var currentQuestionIndex = 0;
var score = 0;

function startGame() {
    isWin = false
    startButton.classList.add('hide')
    availQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionBoxEl.classList.remove('hide')
    setNextQuestion()
    timerCount = 30;
    startTimer()
}

function setNextQuestion() {
    resetContainer()
    showQuestion(availQuestions[currentQuestionIndex])
    }

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerBtnEl.appendChild(button)
    })
}

function resetContainer() {
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    if (!correct) {
        timerCount = timerCount - 5
    } else {
        score = score + 12
    }
    
    // setStatusClass(document.body, correct)
    // Array.from(answerBtnEl.children).forEach(button =>{
    //     setStatusClass(button, button.dataset.correct)
    // })

}

function checkWin() {
    if(availQuestions.length === currentQuestionIndex) {
        isWin = true;
        return true;
    }
}

// function setStatusClass(element, correct) {
//     clearStatusClass(element)
//     if (correct) {
//         element.classList.add('correct')
//     } else {
//         element.classlist.add('wrong')
//     }
// }

// function clearStatusClass(element) {
//     element.classList.remove('correct')
//     element.classList.remove('wrong')
// }

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerDisplay.textContent = timerCount;
        if (timerCount >= 0) {
            if (isWin && timerCount > 0) {
            clearInterval(timer);
            winGame();
            }
        }
        if (timerCount <= 0) {
        timerCount = 0;
        timerDisplay.textContent = timerCount;
        clearInterval(timer);
        loseGame();
        }
    }, 1000);
}

function winGame() { 
    questionEl.textContent = "WINNER!!🏆";
    setHighScore();
}

function loseGame() {
    questionEl.textContent = "GAME OVER";
    loseSound()
}

function setHighScore() {
    var highScore = timerCount + score;
    var previousHigh = localStorage.getItem("score");
    var initials = userInput;
    if (previousHigh < highScore) {
        var userInput = window.prompt("Congrats WINNER!!🏆Please enter your initals.");
        localStorage.setItem("score", highScore);
        localStorage.setItem("initials", userInput);
    }
    console.log(highScore);
    console.log(userInput);
}

function loseSound() {
    var audio = document.createElement("audio")
    audio.src = "/assets/sad_trombone.wav"
    // audio.addEventListener("ended", function () {
    //     document.removeChild(this);
    // }, false);
    audio.play();
}

var questions = [
    {
        question: 'A boolean takes the values of?',
        answers: [
            { text: 'True & False', correct: true},
            { text: 'Numbers', correct: false},
            { text: 'Items', correct: false},
            { text: 'Warewolves', correct: false}
        ]
    },
    {
        question: 'What are Javascript Strings used for?',
        answers: [
            { text: 'Going back in time', correct: false},
            { text: 'Adding Numbers', correct: false},
            { text: 'Storing Text', correct: true},
            { text: 'Creating Classes', correct: false},
        ]
    },
    {
        question: 'When you know how many times you want to loop through a code what loop would you use?',
        answers: [
            { text: 'Else', correct: false},
            { text: 'While', correct: false},
            { text: 'For', correct: true},
            { text: 'Jewlers', correct: false},
        ]
    },
    {
        question: 'What Javascript class allows you to perform mathematical tasks on numbers??',
        answers: [
            { text: 'Calc', correct: false},
            { text: 'Number', correct: false},
            { text: 'Add', correct: false},
            { text: 'Math', correct: true},
        ]
    },
    {
        question: 'What method would you use to join two or more arrays?',
        answers: [
            { text: 'parseInt', correct: false},
            { text: 'concat', correct: true},
            { text: 'combine', correct: false},
            { text: 'hotGlue', correct: false},
        ]
    }
]


startButton.addEventListener('click', startGame);
answerBtnEl.addEventListener('click', () => {
    currentQuestionIndex++
        if (checkWin() === true) {
            answerBtnEl.classList.add('hide')
            winGame()
        } else {
            setNextQuestion()
        }
})
// scoreButton.addEventListener('click', () => {
//     alert(localStorage.getItem(highScore) + (localStorage.getItem(highScore)));
// })