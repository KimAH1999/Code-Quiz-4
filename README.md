# Code-Quiz-4

The code is a basic quiz app created using HTML, CSS, and JavaScript. The quiz has ten questions, and each question has four options to choose from. The user has 100 seconds to complete the quiz. For each correct answer, the user gets a point, while an incorrect answer results in a penalty of 10 seconds.

The app uses an array of objects to store the questions, options, and correct answers. When the user clicks the "Start" button, the timer starts counting down from 100 seconds. When the time runs out or the user completes all the questions, the app displays the user's score.

The app works by creating HTML elements and adding event listeners to them. The createQuestion() function is responsible for displaying the current question and options. The compareUsersChoice() function compares the user's choice with the correct answer and displays a message indicating whether the answer is correct or wrong. If the user answers a question correctly, their score increases by one. If the user answers a question incorrectly, 10 seconds are deducted from their remaining time. When all the questions have been answered or the time runs out, the finished() function is called to display the final score.

# Quiz 

Demo Link: https://kimah1999.github.io/Code-Quiz-4/


![homepgdemo](https://user-images.githubusercontent.com/87666809/219222512-acfbfabd-5d4c-48ed-a751-d49e9a91a342.png)
![Screenshot 2023-02-15 4 12 05 PM](https://user-images.githubusercontent.com/87666809/219224881-b10bc622-ba06-4858-8eff-54db1322bff2.png)
