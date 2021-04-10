console.log("connected")
const question = document.querySelector("#question"); //allows you to change the nature of the element (class to id, vice versa)
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector("#score");
const progressText = document.querySelector('#progressText')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}; //put it into an empty object
let acceptingAnswers = true;
let score = 0; //score starts at 0
let questionCounter = 0; //questions start at 0
let availableQuestions = [];

let questions = [
    {
        question: "What country is Venice located in?",
        choice1: "France",
        choice2: "Italy",
        choice3: "Australia",
        choice4: "Japan",
        answer: 2,
      },
      {
        question: "Who is the main character in Harry Potter?",
        choice1: "Henry Porter",
        choice2: "Hairy Potter",
        choice3: "Harry Potter",
        choice4: "Henrie Potsticker",
        answer: 3,
      },
      {
        question: "Which of these Avengers isn't dead?",
        choice1: "Iron Man",
        choice2: "Hawkeye",
        choice3: "Black Widow",
        choice4: "Vision",
        answer: 2,
      },
      {
        question: "Who is the best spiderman?",
        choice1: "Tobey Maguire",
        choice2: "Andrew Garfield",
        choice3: "Tom Holland",
        choice4: "none of them",
        answer: 3,
      },
]
console.log(questions)

const SCORE_POINTS = 100
const maxquestions = 4

startGame = () => { //starting a function
    questionCounter = 0
    score = 0
    availableQuestions = [...questions] //using ... because using spread we can get the values from the choices
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > maxquestions) {
        localStorage.setItem("mostRecentScore",score) //this will keep track of the score as u take the quiz

        return window.location.assign("/end.html"); // PERHAPS THE PROBLEM ???????????????????????????????????????????????
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${maxquestions}` //means the questions coutner text will be the current questions out of in this case 4 questions
    progressBarFull.style.width = `${(questionCounter/maxquestions) * 100}%` //calculate the question we are on and multiply it by percent 


    const questionsIndex = Math.floor(Math.random() * availableQuestions.length) //this will calculate the question index
    currentQuestion= availableQuestions[questionsIndex] //it will keep track of what question we are on
    question.innerText = currentQuestion.question //show the text the question will show
    console.log(questionsIndex)
        
    choices.forEach((choice) => {
        const number = choice.dataset["number"]; //you'll know what choice we are clicking on
        choice.innerText = currentQuestion["choice" + number];
    });
    
    availableQuestions.splice(questionsIndex, 1); //it adds item to the array

    acceptingAnswers = true;    
};

choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect" //using ternary

        if (classToApply === "correct"){    
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