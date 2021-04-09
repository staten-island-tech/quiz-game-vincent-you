const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const qImage  = document.getElementById("qImage");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("scoreContainer");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");

let questions = [
    {
        question : "Which animal can live the longest",
        choiceA : "giraffe",
        choiceB : "Cow",
        choiceA : "Pig",
        correct : "A"
    }, {
        question : "Which animal can run the fastest",
        choiceA : "Rhino",
        choiceB : "Cheeta",
        choiceA : "Kangaroo",
        correct : "B"
    },
]


const lastQuestion = question.length - 1;
let runningQuestion = 0;
let count = 0
const questionTime = 10;
const gaugeWidth = 150;
const gaugeUnit = gaugeWidth / questionTime;

function renderQuestion (){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    qImg.innerHTML = "<img src=" + q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;  
}

start.style.display = "none";
renderQuestion();
quiz.style.display = "block";  
renderProgress()

//progress

function renderProgress(){
    for(let qIndex = 0; qIndex <=lastQuestion; 
        qIndex++){
        progress.innerHTML += "<div class= 'prog' id= "+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime) {
        counter.innerHTML = count; 
        timeGauge.style.width = count * gaugeUnit; count++
    } else{
        count=0
    }
} 
