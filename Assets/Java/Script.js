//buttons
var highBtn = document.querySelector("#highBtn");
var startBtn = document.querySelector("#startBtn");
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

//End Elements
var endPoints = document.querySelector("#endPoints");
var inName = document.querySelector("#inName");

//Score Elements
var highTable = document.querySelector("#highTable");

//Other Vars
var points = 0;
//Current page is based on var
//0 = Start, 1 = Quiz, 2 = End, 3 = High
var page = 0;
var totalQ = 0;
var mSecondsLeft = 0;
var usedQuestions = [];
var currQuestion = 0;
var correctQuestions = 0;
var timeLeft = 0;
var highscores;

//starts user off on start page
pageStart();

//Page Functions
//Sets which "Page" we are on
function pageStart(){
    //changes page to start page
    page = 0;
    timeFull.style.color = "#2D3047";
    pageReset();
    beginPg.style.display = "block";
}

function pageQuiz(){
    //changes page to Quiz page
    page = 1;
    timeFull.style.color = "#4DA1A9";
    pageReset();
    questionPg.style.display = "block";
}

function pageEnd(points){
    //changes page to score page, uises points for page content
    page = 2;
    endPoints.textContent = points;
    timeFull.style.color = "#2D3047";
    pageReset();
    endPg.style.display = "block";
}

function pageHigh(){
    //changes page to highscore page
    page = 3;
    timeFull.style.color = "#2D3047";
    highBtn.textContent = "Start Page"
    pageReset();
    setTable();
    scorePg.style.display = "block";
}

function pageReset(){
    //hides all pages
    beginPg.style.display = "none";
    questionPg.style.display = "none";
    endPg.style.display = "none";
    scorePg.style.display = "none";
}


//Button onClick Functions
highBtn.addEventListener("click", function(event) {

    if(page == 3){
        //changing from high score page to start page
        highBtn.textContent = "HighScores"
        pageStart();
    }
    else if (page == 2 || page == 1){
        //changing from either quiz or end page
        //asks if they are sure
        if(window.confirm("Are you sure?\nYour Progress will be lost!")){
            pageHigh();
        }
    }
    else{
        //changing from start to highscore page
        pageHigh();
    }

});

startBtn.addEventListener("click", function(event) {
    //Starts test by reseting variables
    points = 0;
    totalQ = 9;
    usedQuestions = [];
    correctQuestions = 0;
    timeLeft = 0;

    //starts test by calling functions
    timeStart();
    giveQuestion();
});

subBtn.addEventListener("click", function(event) {
    //submits score with name
    
    //checks if box is empty
    if (inName.value != "")
    {
        checkAddHighscore(inName.value, points, correctQuestions, timeLeft)
        pageHigh();
    }
});

//HighScore Functions
function checkAddHighscore(name, points, correct, times){


    //gets the local variable after checked
    storageCheck();
    highscores = JSON.parse(localStorage.getItem("highscoresLS"));

    //loops through the array to see if new score is higher than a previous score
    for(i = 0; i < 5; i++){
        if(highscores[i][1] <= points){
            //moves all lower high scores down
            for (j = 4; j > i ; j--){
                highscores[j] = highscores[j-1]
            }

            //sets new highscore
            highscores[i] = [name, points, correct, times];
            break;
        }
    }

    //pushes new highscore list to storage
    localStorage.setItem("highscoresLS", JSON.stringify(highscores));
    console.log(JSON.parse(localStorage.getItem("highscoresLS")));
}

function setTable(){

    storageCheck();
    highscores = JSON.parse(localStorage.getItem("highscoresLS"));

    for(i = 0; i < 5; i++){
        highTable.children.item(0).children.item(i+1).children.item(1).textContent = highscores[i][0];
        highTable.children.item(0).children.item(i+1).children.item(2).textContent = highscores[i][1];
        highTable.children.item(0).children.item(i+1).children.item(3).textContent = highscores[i][2];
        highTable.children.item(0).children.item(i+1).children.item(4).textContent = highscores[i][3];
    }
}

function storageCheck(){
    //checks if the local variable already exists
    //makes a new var and sends it to local
    if (localStorage.getItem("highscoresLS") === null){
        highscores = [["N/A", 0, 0, 0], ["N/A", 0, 0, 0], ["N/A", 0, 0, 0], ["N/A", 0, 0, 0], ["N/A", 0, 0, 0]]
        localStorage.setItem("highscoresLS", JSON.stringify(highscores));
    }
}


//Other Functions
function timeStart(){
    //Setting Timer to 60 seconds
    mSecondsLeft = 6000;

    //Timer set
    var timerInterval = setInterval(function() {
        //updates time on website
        mSecondsLeft--;
        timer.textContent = (Math.round(mSecondsLeft * 10) / 1000).toFixed(2);
        
        //checks if time runs out, clears timer
        if(mSecondsLeft <= 0) {
            timeLeft = 0;
            clearInterval(timerInterval);
            pageEnd(points)
            timer.textContent = "00.00";
        }

        //checks if page changed, clears timer
        if(page != 1){
            clearInterval(timerInterval);
            return;
        }
    
      }, 10);
    
}

function timePenalty(){
    //Removes 10 seconds from timer
    mSecondsLeft -= 1000;

    //Just for fun and for the UI looking good:
    //Turns timer red, then fades out:
    timer.setAttribute('class','penalty');
    setTimeout(function(){
        timer.removeAttribute('class','penalty');
    }, 1000);
    
}

function giveQuestion(){
    //generates question and pulls up "page"
    generateQuestionPage();
    pageQuiz();

    //Adds a event listener to each button
    document.querySelectorAll('#ansBtn').forEach(item => {
        item.addEventListener('click', clickevent => {
            //checks whether the button text equals the answer and acts scordingly
            if (item.textContent == getObjectAnswer(currQuestion)){
                points += 5;
                correctQuestions++;
            }
            else{
                timePenalty();
            }

            //Checks number of questions left and ends the test if none
            if (totalQ == 0){
                points += Math.round(mSecondsLeft/100);
                timeLeft = Math.round(mSecondsLeft/100);
                pageEnd(points);
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
        currQuestion = Math.floor(Math.random() * getQuestionAmount());
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