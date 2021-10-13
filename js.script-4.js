//Named elements
const start_btn = document.querySelector(".start_btn button");
const info_box= document.querySelector(".info_box");
const exit_btn= info_box.querySelector(".button .quit");
const continue_btn= info_box.querySelector(".button .restart");
const quiz_box= document.querySelector(".quiz_box");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");
const option_list = document.querySelector(".option_list");
const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


/*Start Quiz Button on Click*/
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Shows info Box
}

/*Exit Button on Click*/
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");  //Hides Info Box
}

/*Contine Button on Click*/
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //Hides Info Box
    quiz_box.classList.add("activeQuiz"); //Shows Quiz Box
    showQuestions(0);
    queCounter(1);
    startTimerLine(0);
    startTimer(50);
}

let que_count =0;
let que_numb = 1;
let counter;
let timeValue = 50;
let widthValue = 0;
let userScore = 0;
showQuestions(que_count);
queCounter(que_numb);
clearInterval(counter);
startTimer(timeValue);
clearInterval(counterLine);
startTimerLine(widthValue);
next_btn.style.display = "none";
timeOff.textContent = "Time Left"




/*If quit is clicked, it will reload page to starter screen*/
restart_quiz.onclick = ()=>{
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 50;
    let widthValue = 0;
    window.location.reload();
}

quit_quiz.onclick = () =>{
    window.location.reload();
}

/*Next Button Clicked on*/
next_btn.onclick = ()=>{
    if(que_count > questions.length -1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none" ;
    timeOff.textContent = "Time Left";
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed");
        showResultBox();
    }
}


/*Next Button Clicked on*/
next_btn.onclick = ()=>{
    if(que_count > questions.length -1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none" ;
    timeOff.textContent = "Time Left";
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions Completed");
        showResultBox();
    }
}

/*Questions and options for array in js.questions-4.js*/
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + "." + questions[index].question + +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                    +  '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                    +  '<div class="option">'+ questions[index].options[2] + '<span></span></div>'
                    +  '<div class="option">'+ questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for(let i = 0; i < option_.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function queCounter(index){
    const bottom_ques_counter = quizbox.querySelector("total_que");
   let totalQuesCountTag = '<span><p>' + que_count + '</p>of<p>' + questions.length + '</p>Questions</span>';
   bottom_ques_counter.innerHTML = totalQuesCountTag;
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'; 

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacmentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is Incorrect");
        answer.insertAdjacmentHTML("beforeend", crossIcon);


        for(let i = 0; i < allPptions; i++) {
            if(option_list.children[i].textContent == correctAns) {
            option_list.children[i].setAttribute("class", "option correct");
            option_list.children[i].insertAdjacmentHTML("beforeend", tickIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; ii++) {
        option_list.children[i].classList.add("disabled");
    }
         next_btn.classList.add("show");

/*created funtion of words to pop up if a certain grade is lower or higher*/
function showResult(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if(userScore > 3){
        let scoreTag = '<span>and Nice! You got <p>' +userScore +'</p> out of <p>' +questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and Nice! You got <p>' +userScore +'</p> out of <p>' +questions.length + '</p></span>';
        scoreTag.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got <p>' +userScore +'</p> out of <p>' +questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
/*Timer Funtion*/
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer()
        timeCount.textContent = time (50);
        time ();
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(count);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;

            for(let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacmentHTML("beforeend", tickIcon);
                }
            }
            for (let i = 0; i < allOptions; ii++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.getElementsByClassName.display = "block";
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time += 1;
        startTimerLine.style.width = time + "px";
        if(time > 50){
            clearInterval(counterLine)
        }
    }
}