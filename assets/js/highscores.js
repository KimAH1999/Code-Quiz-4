//create a variable to hold the highScores div element
var highScoreEl = document.querySelector("#highScores");
//Create a avriable to hold the clearBtn button element
var clearBtn = document.querySelector("#clearBtn");
//Create a variable to hold the goBackBtn button element
var goBackBtn = document.querySelector("#goBackBtn");

//Add an event listener for the goBAckBtn variable
goBackBtn.addEventListener("click", function(){
    //Change the location of the window with index.html. Goes back to our home page
    window.location.replace("./index.html");
});

//Add an event listener for the clearBtn variable
clearBtn.addEventListener("click", function(){
    //Clear the local storage keys
    localStorage.clear();
    //Using local function to reload the page with cleared info
    location.reload();

});
//Call the getItem function on localStorage and pass in "allScoresKey"
var allScoresKey = localStorage.getItem("allScoresKey");

//Use JSON parse to turn our string variable into an object
//finalScore object which is created when finished() function is called
allScoresKey = JSON.parse(allScoresKey);

//If allScoresKey is null
if(allScoresKey !== null){
    //then loop through the allScoresKey object
    for(var i = 0; i < allScoresKey.length; i++){

        //Create a list item element set it to a variable
        var createLiEl = document.createElement("li");
        //changes the text content to be the initials and score properties 
        //held in allScoresKey object
        createLiEl.textContent = allScoresKey[i].initials + " " + allScoresKey[i].score;
        //append the list item, created to the highScores div element
        highScoreEl.appendChild(createLiEl);
    }

}