// Array of question objects. Each object has a string for the question, an array of strings for the choices and the answer
var questionObjectArray = [
    {
        question: "Which CSS position is positioned at default value ?",
        choices: ["Fixed Postion" , "Relative Position" , "Static Position" , "Absolute Position"],
        answer: "Static Position"
    },
    {
        question: "How would you declare an array named exArray and fill it 3 different choices in Javascript style ?",
        choices: ["array exArray(3);","var[] exArray = {1,2,3};","var[3] exArray = []","var exArray = [1,2,3]"],
        answer: "var exArray = [1,2,3]"
    },  
    {
        question: "Which is the correct way to write an IF statement ?",
        choices: ["if (i = 0){code};","if(i == 0){code};","if(i == 0)code;","if i = 0{code};"],
        answer: "if(i == 0){code};"
    },
    {
        question: "Loops can contain these features ...",
        choices: ["counter & condition","counter, condition, & iterator","counter, condition, & parallel","counter"],
        answer: "counter, condition, & iterator"
    }, 
    {
        question: "Which was created by Facebook?",
        choices: ["MongoDB Atlas","SQL","React","OPP"],
        answer: "React"
    } 
];

var currentTimeEl = document.querySelector("#currentTime");
var timerEl = document.querySelector("#start");
var questionsEl = document.querySelector("#questions");
var wrapperEl = document.querySelector(".wrapper");
var quizScore = 0;
var questionIndex = 0;
var secondsLeft = 100;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul")

timerEl.addEventListener("click", function(){
    
    if(holdInterval === 0){
        holdInterval = setInterval(function(){
            secondsLeft--;
            currentTimeEl.textContent = "Time: " + secondsLeft;
            
            if(secondsLeft <= 0){
                clearInterval(holdInterval);
                finished();
                currentTimeEl.textContent = "Time is up!";
            }
        }, 1000);
    }
    createQuestion(questionIndex);
});

function createQuestion(questionIndex){

    questionsEl.innerHTML = "";
    ulCreate.innerHTML = "";

    for(var i =0; i < questionObjectArray.length; i++){

        var usersQuestion = questionObjectArray[questionIndex].question;
        var usersChoices = questionObjectArray[questionIndex].choices;
        questionsEl.textContent = usersQuestion;
        questionsEl.setAttribute("style", "color: Darkblue; font-size: 18px;")
        
    }

    usersChoices.forEach(function (newItem) {

        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsEl.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compareUsersChoice));
    })
}

function compareUsersChoice(event){
  
    var element = event.target;
    if(element.matches("li")){
        
        var createdDivEl = document.createElement("div");
        createdDivEl.setAttribute("id", "createDivEl");

        if(element.textContent == questionObjectArray[questionIndex].answer){
            quizScore++;
            createdDivEl.textContent = "Correct! The answer is: " + questionObjectArray[questionIndex].answer;
        }
       
        else{
            secondsLeft -= penalty;
            createdDivEl.textContent = "Wrong! The correct answer is " + questionObjectArray[questionIndex].answer  
        }
    }
    questionIndex++;

    if(questionIndex >= questionObjectArray.length){
        finished();
        createdDivEl.textContent = "End of quiz! You got " + quizScore + "/" + questionObjectArray.length + " Correct!"; 
    }
    else{
        createQuestion(questionIndex);
    }
    questionsEl.appendChild(createdDivEl);
}


function finished(){
 
    questionsEl.innerHTML = "";
    currentTimeEl.innerHTML = "";
    var h1El = document.createElement("h1");
    h1El.setAttribute("id","h1El");
    h1El.textContent = "All Done!";
    questionsEl.appendChild(h1El);
    var createParagraphEl = document.createElement("p");
    createParagraphEl.setAttribute("id", "createdP");
    questionsEl.appendChild(createParagraphEl);

    if(secondsLeft >= 0){
        var timeRemaining = secondsLeft;
        var createParagraphEl2 = document.createElement("p");
        clearInterval(holdInterval);
        createParagraphEl.textContent = "Your final score is: " + timeRemaining;
        questionsEl.appendChild(createParagraphEl2);
    }

    var createLabelEl = document.createElement("label");
    createLabelEl.setAttribute("type", "text");
    createLabelEl.textContent = "Enter your initials: ";
    questionsEl.appendChild(createLabelEl);
    var createInputEl = document.createElement("input")
    createInputEl.setAttribute("type", "text");
    createInputEl.setAttribute("id", "initials");
    createInputEl.textContent = "";
    questionsEl.appendChild(createInputEl);
    var createSubmitEl = document.createElement("button");
    createSubmitEl.setAttribute("type", "submit");
    createSubmitEl.setAttribute("id", "Submit");
    createSubmitEl.textContent = "Submit";
    questionsEl.appendChild(createSubmitEl);

    createSubmitEl.addEventListener("click", function(){
        
        var initials = createInputEl.value;

        if (initials === null){
           console.log("No initials entered")
        }
        else{
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            var allScoresKey = localStorage.getItem("allScoresKey");
            
            if(allScoresKey === null){
                allScoresKey = [];
            }
            else{
                allScoresKey = JSON.parse(allScoresKey);
            }
            allScoresKey.push(finalScore);
            var newestScore = JSON.stringify(allScoresKey);
            localStorage.setItem("allScoresKey", newestScore);
            window.location.replace("./highScorePage.html");
        }
    });
}
