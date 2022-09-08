//buttons
var highBtn = document.querySelector("#highBtn");
var startBtn = document.querySelector("#startBtn");
//var ansBtn = document.querySelector("#ansBtn");
var subBtn = document.querySelector("#subBtn");

//pages
var beginPg = document.querySelector("#Begin");
var questionPg = document.querySelector("#Question");
var endPg = document.querySelector("#End");
var scorePg = document.querySelector("#Score");

//header elements
var timeFull = document.querySelector(".highRight");
var timer = document.querySelector("#time");

//Question elements
var question = document.querySelector("#hQuest");
var questionAppend = document.querySelector("#btnAppend");

//Other Vars
var points = 0;
//Current page is based on var
//0 = Start, 1 = Quiz, 2 = End, 3 = High
var page = 0;
var totalQ = 0;
var mSecondsLeft = 0;
var usedQuestions = [];

pageStart();


//Page Functions
//Sets which "Page" we are on
function pageStart(){
    page = 0;

    timeFull.style.color = "#2D3047";
    pageReset();
    beginPg.style.display = "block";
}

function pageQuiz(){
    page = 1;

    timeFull.style.color = "#4DA1A9";
    pageReset();
    questionPg.style.display = "block";
}

function pageEnd(points){
    page = 2;

    timeFull.style.color = "#2D3047";
    pageReset();
    endPg.style.display = "block";
}

function pageHigh(){
    page = 3;

    timeFull.style.color = "#2D3047";
    highBtn.textContent = "Start Page"
    pageReset();
    scorePg.style.display = "block";
}

//hides all pages
function pageReset(){
    beginPg.style.display = "none";
    questionPg.style.display = "none";
    endPg.style.display = "none";
    scorePg.style.display = "none";
}


//Button onClick Functions
highBtn.addEventListener("click", function(event) {

    if(page == 3){
        highBtn.textContent = "HighScores"
        pageStart();
    }
    else if (page == 2 || page == 1){
        if(window.confirm("Are you sure?\nYour Progress will be lost!")){
            pageHigh();
        }
    }
    else{
        pageHigh();
    }

});

startBtn.addEventListener("click", function(event) {
    totalQ = 9;
    usedQuestions = [];
    timeStart();
    giveQuestion();
});

subBtn.addEventListener("click", function(event) {


    pageHigh();
});


//Other Functions
function timeStart(){
    mSecondsLeft = 6000;


    var timerInterval = setInterval(function() {
        mSecondsLeft--;
        timer.textContent = (Math.round(mSecondsLeft * 10) / 1000).toFixed(2);
    
        if(mSecondsLeft === 0) {
            clearInterval(timerInterval);
            pageEnd(points)
        }

        if(page != 1){
            clearInterval(timerInterval);
            return;
        }
    
      }, 10);
    
}

function giveQuestion(){
    generateQuestionPage();
    pageQuiz();

    //found this online, works like a charm
    document.querySelectorAll('#ansBtn').forEach(item => {
        item.addEventListener('click', clickevent => {
            

            if (totalQ == 0){
                points += Math.round(mSecondsLeft/2);
                pageEnd();
            }
            else{
                totalQ--;
                giveQuestion();
            }
        })
    })
}

//Question Generation Functions
function generateQuestionPage(){ 
    //removing all previous answers
    var prevQuestions = document.querySelectorAll('[id=ansBtn]')
    for(i = 0; i < prevQuestions.length; i++){
        prevQuestions[i].remove();
    }

    //Getting a number of a question
    //If question already asked, different number is generated
    do{
        var currQuestion = Math.floor(Math.random() * getQuestionAmount());
        break;
    } while (usedQuestions.includes(currQuestion));
    
    //Giving the question
    usedQuestions.push(currQuestion);
    question.textContent = ((10 - totalQ) + ". " + getObjectQuestion(currQuestion));

    //Making and shuffleing an array of answers
    var totalAnswers = [];
    totalAnswers = totalAnswers.concat(allQuestions[currQuestion].wrong);
    totalAnswers.push(getObjectAnswer(currQuestion));
    shuffle(totalAnswers);

    //Adding a button element for each answer
    for(i = 0; i < totalAnswers.length; i++){
        var ansEL = document.createElement("Button");
        ansEL.textContent = totalAnswers[i];
        ansEL.setAttribute('id','ansBtn');
        questionAppend.appendChild(ansEL);
    }
}

//Fisher–Yates shuffle
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


//These are just simpler for me to program with
//I however got a wird error by parsing the erong answers through a function
function getObjectQuestion(num){ return allQuestions[num].question }
function getObjectAnswer(num){ return allQuestions[num].ans}
function getQuestionAmount(){return allQuestions.length}