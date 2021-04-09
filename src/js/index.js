const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('#choices-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {} //put it into an empty object
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: "What name starts with C ?",
        choices1: 'Chandler' ,
        choices2: 'Kristina',
        choices3: 'Melony',
        choices4: 'Henry',
        answer: 1,       
      },
    {
        question: "What name starts with B ?",
        choices1: 'Chandler' ,
        choices2: 'Kristina',
        choices3: 'Melony',
        choices4: 'Henry',
        answer: 2,       
      },
    {
        question: "What name starts with Z ?",
        choices1: 'Chandler' ,
        choices2: 'Kristina',
        choices3: 'Melony',
        choices4: 'Henry',
        answer: 3,       
      },
      
    {
        question: "What name starts with G ?",
        choices1: 'Chandler' ,
        choices2: 'Kristina',
        choices3: 'Melony',
        choices4: 'Henry',
        answer: 4,       
      },     
]
console.log(questions)

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4


startGame = () => { //starting a function
    questionCounter = 0
    score = 0
    availableQuestions = [...questions] //using ... because using spread we can get the values from the choices
    getNewQuestion()
}

console.log(startGame)

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore',score) //this will keep track of the score as u take the quiz

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}` //means the questions coutner text will be the current questions out of in this case 4 questions
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%` //calculate the question we are on and multiply it by percent 

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length) //this will calculate the question index
    currentQuestion= availableQuestions[questionsIndex] //it will keep track of what question we are on
    question.innerText = currentQuestion.question //show the text the question will show

    choices.forEach(choice => {
        const number = choice.dataset['number'] //you'll know what choice we are clicking on
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1) //it adds item to the array

    acceptingAnswers = true 
}

console.log(getNewQuestion)

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return    

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer =  selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect' //using ternary

        if (classToApply === 'correct'){    
            incrementScore(SCORE_POINTS)
        }

         selectedChoice.parentElement.classList.add(classToApply) //this will count if you answer the question correctly
         
         setTimeout(() => {
           selectedChoice.parentElement.classList.remove(classToApply) //this will allow score to change if u get it wrong
             getNewQuestion ()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

console.log(incrementScore)

startGame()