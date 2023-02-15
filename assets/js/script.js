// Array of question objects. Each object has a string for the question, an array of strings for the choices and the answer
var questionObjectArray = [
    {
        question: "Which CSS position is positioned at default value ?",
        choices: ["Fixed Postion" , "Relative Position" , "Static Position" , "Absolute Position"],
        answer: "Static Position"
    },
    {
        question: "How would you declare an array named exArray and fill it 3 different choices in Javascript style ?",
        choices: ["array exArray(3);","var[] exArray = {1,2,3};","var[3] exArray = [];","var exArray = [1,2,3];"],
        answer: "var exArray = [1,2,3];"
    },  
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup Language","none of the above"],
        answer: "Hyper Text Markup Language"
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
    },
    {
        question: "Choose the correct HTML element for the largest heading:",
        choices: ["<head>","<h6>","h1","heading>"],
        answer: "<h1>"
    },
    {
        question: "Which of these elements are all <table> elements?",
        choices: ["<table><tr><td>","<table><head><tfoot>","<table><tr><tt>","none of the above"],
        answer: "<table><tr><td>"
    },
    {
        question: "What is the correct HTML element for playing video files?",
        choices:["<media>","<video>","<movie>","none of the ablove"],
        answer: "<video>"
    },
    {
        question: "What is the correct HTML element for playing audio files?",
        choices: ["<audio>","<sound>","<mp3>","<auto-sound>"],
        answer: "<audio>"
    },
    {
        question: "The HTML global attribute, contenteditable is used to:",
        choices: ["Specify whether the content of an element should be editable or not","Return the position of the first found occurrence of content inside a string","Specifies a context menu for an element. The menu appears when a user right-clicks on the element","Update content from the server"],
        answer: "Specify whether the content of an element should be editable or not"
    }
];

//Created variables to hold the element needed
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

//click action funtion for timer to start
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
        // Interval before timer appears.
      }, 1000);
    }
    createQuestion(questionIndex);
});

//parameter created for the questions
function createQuestion(questionIndex){
    questionsEl.innerHTML = "";
    ulCreate.innerHTML = "";

    for(var i =0; i < questionObjectArray.length; i++){

        var usersQuestion = questionObjectArray[questionIndex].question;
        var usersChoices = questionObjectArray[questionIndex].choices;
        questionsEl.textContent = usersQuestion;
        questionsEl.setAttribute("style", "color: Darkblue; font-size: 18px;")
        
    }
    //Each method to loop, all array elements in usersChoice array must add a function that takes in a new item
    usersChoices.forEach(function (newItem) {

        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsEl.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compareUsersChoice));
    })
}
//compareUserChoice is taking in a event parameter in this section
function compareUsersChoice(event){
  
    var element = event.target;
    if(element.matches("li")){
        var createdDivEl = document.createElement("div");
        createdDivEl.setAttribute("id", "createDivEl");

        if(element.textContent == questionObjectArray[questionIndex].answer){
            quizScore++;
            createdDivEl.textContent = "Correct! The answer is: " + questionObjectArray[questionIndex].answer;
        }else{
            secondsLeft -= penalty;
            createdDivEl.textContent = "Wrong! The correct answer is " + questionObjectArray[questionIndex].answer  
        }
    }
    questionIndex++;

    if(questionIndex >= questionObjectArray.length){
        finished();
        createdDivEl.textContent = "End of quiz! You got " + quizScore + "/" + questionObjectArray.length + " Correct!"; 
    }else{
        createQuestion(questionIndex);
    }
    questionsEl.appendChild(createdDivEl);
}

//function needed for finishing quiz
function finished(){
    questionsEl.innerHTML = "";
    currentTimeEl.innerHTML = "";

    // Created a heading for the finished page
    var finishedEl = document.createElement("h1");
    finishedEl.setAttribute("id", "finished");
    finishedEl.textContent = "Finished!"

    questionsEl.appendChild(finishedEl);

    // paragraph for final score 
    var paragraphEl = document.createElement("p");
    paragraphEl.setAttribute("id", "paragraphEl");

    questionsEl.appendChild(paragraphEl);

    // Calculating score
    if(secondsLeft >= 0){
        var timeRemaining = secondsLeft;
        clearInterval(holdInterval);
        paragraphEl.textContent = "Your final score is: " + (quizScore + timeRemaining);
    }else{
        clearInterval(holdInterval);
        paragraphEl.textContent = "Your final score is: " + quizScore;
    }

    // label element for initials
    var labelEl = document.createElement("label");
    labelEl.setAttribute("id", "labelEl");
    labelEl.textContent = "Enter your initials: ";

    questionsEl.appendChild(labelEl);

    // input element for initials
    var inputEl = document.createElement("input");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "initials");
    inputEl.setAttribute("name", "initials");
    inputEl.textContent = "";

    questionsEl.appendChild(inputEl);

    // submit button
    var submitEl = document.createElement("button");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "submit");
    submitEl.textContent = "Submit";

    questionsEl.appendChild(submitEl);

    // Adding event listener to the submit button
    submitEl.addEventListener("click", function () {
        var initials = inputEl.value;
        if (initials === "") {
            alert("Please enter your initials.");
        } else {
            var highscores =
                JSON.parse(window.localStorage.getItem("highscores")) || [];

            var newScore = {
                score: quizScore,
                initials: initials
            };

            highscores.push(newScore);
            window.localStorage.setItem("highscores", JSON.stringify(highscores));

            window.location.href = "highscores.html";
        }
    });
}
