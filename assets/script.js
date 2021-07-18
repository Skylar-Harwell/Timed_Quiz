var startButton = document.getElementById('start-btn')
var questionBoxEl = document.getElementById('question-box')
var questionEl = document.getElementById('question')
var answerBtnEl = document.getElementById('answer-choice')

var score = 0


// let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionBoxEl.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
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

function resetState() {
    while (answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

function selectAnswer(event) {
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnEl.children).forEach (button => {
        setStatusClass(button, button.dataset.correct)
    })
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        
    }
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
        question: 'What are Java Strings used for?',
        answers: [
            { text: 'Adding Numbers', correct: false},
            { text: 'Storing Text', correct: true},
            { text: 'Creating Classes', correct: false},
            { text: 'Going back in time', correct: false},
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
        question: 'What Java class allows you to perform mathematical tasks on numbers??',
        answers: [
            { text: 'Calc', correct: false},
            { text: 'Number', correct: false},
            { text: 'Math', correct: true},
            { text: 'Add', correct: false},
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
