$(document).ready(function () {
    //array of quiz questions
    var questions = [{
            questionNum: 0,
            question: "Commonly used data types DO NOT include:",
            answer1: "1. strings",
            answer2: "2. booleans",
            answer3: "3. alerts",
            answer4: "4. numbers",
            correctAnswer: "3. alerts"
        },
        {
            questionNum: 1,
            question: "The conditions in an if/else statement is enclosed within ______:",
            answer1: "1. quotes",
            answer2: "2. curly brackets",
            answer3: "3. parenthesis",
            answer4: "4. square brackets",
            correctAnswer: "3. parenthesis"
        },
        {
            questionNum: 2,
            question: "Arrays in JavaScript can be used to store ______:",
            answer1: "1. numbers and strings",
            answer2: "2. other arrays",
            answer3: "3. booleans",
            answer4: "4. all of the above",
            correctAnswer: "4. all of the above"
        },
        {
            questionNum: 3,
            question: "String values must be enclosed within ______ when being assigned to variables.",
            answer1: "1. commas",
            answer2: "2. curly brackets",
            answer3: "3. quotes",
            answer4: "4. parentheses",
            correctAnswer: "3. quotes"
        },
        {
            questionNum: 4,
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            answer1: "1. JavaScript",
            answer2: "2. terminal/bash",
            answer3: "3. for loops",
            answer4: "4. console log",
            correctAnswer: "4. console log"
        }
    ]


    //
    //60-sec countdown timer
    //
    const displayTimeLeft = $("#display-time-left");
    var timer = 59;
    var timerInterval;

    function countdown() {
        if (timer <= 0) {
            clearInterval(timerInterval); //clearInterval takes the fcn that set the interval
        }
        displayTimeLeft.text(timer);
        timer--;
    };

    //function to end the game
    const allDone = $("#all-done");
    var finalScore = displayTimeLeft;

    function endGame() {
        //hide questionArea 
        questionArea.addClass("d-none");
        //display the allDone
        allDone.removeClass("d-none");
        //write the finalScore to the page --> to complete
        //finalScore.text();
    }

    //
    //quiz section
    //

    //grab the page sections
    const startArea = $("#start-area");
    const startBtn = $("#start-btn");
    const questionArea = $("#question-area");

    //when the start button is clicked, hide the start area, display the question area, and start the countdown
    startBtn.click(function () {
        startArea.hide();
        questionArea.removeClass("d-none");
        timerInterval = setInterval(countdown, 1000);
    });

    //set html and values from the array "questions" whose index == qIndex
    var qIndex = 0;

    function nextQuestion(index) {
        //display the html to the page
        questionArea.html('')
        var q = $("<p>").text(questions[index].question).addClass("mt-4 font-weight-bold").attr("id", "question-text");
        var a1 = $("<button>").text(questions[index].answer1).addClass("btn btn-quiz d-block mt-1 answer-btn").attr("type", "button");
        var a2 = $("<button>").text(questions[index].answer2).addClass("btn btn-quiz d-block mt-1 answer-btn").attr("type", "button");
        var a3 = $("<button>").text(questions[index].answer3).addClass("btn btn-quiz d-block mt-1 answer-btn").attr("type", "button");
        var a4 = $("<button>").text(questions[index].answer4).addClass("btn btn-quiz d-block mt-1 answer-btn").attr("type", "button");
        questionArea.append(q, a1, a2, a3, a4);


        //someone clicks on answer.Btn
        //check if text matches the correct answer
        //wrong answer reduce time, right answer do nothing
        //check if it's at the end of the array, if so, end game
        //else increment the index
        const answerBtn = $(".answer-btn");

        answerBtn.on("click", function () {
            if ($(this).text() !== questions[index].correctAnswer) {
                timer = timer - 5;
            }

            if (qIndex == questions.length - 1) {
                endGame();
            } else {
                qIndex++;
                nextQuestion(qIndex);
            }



            console.log(index);
        });




        //when the last question is answered, stop the game:
        //doesn't get to the last question becuase console.log is showing an errorat the last object in the array
        if (index >= questions.length) {
            endGame();
        }



    }

    //call the function to start cycling through the questions
    nextQuestion(qIndex)


    //close ready method
});