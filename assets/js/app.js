$(document).ready(function() {

    $("#questionAnswers").hide();

    var myQuestions = [{
            question: "Who was the first woman to serve on the U.S. Supreme Court?",
            image: "assets/images/OConnor.jpg",
            answers: {
                1: "Abigail Adams",
                2: "Ruth Bader Ginsburg",
                3: "Sandra Day O'Connor",
                4: "Sonia Sotomayor"
            },
            correctAnswer: "Sandra Day O'Connor"
        },
        {
            question: "Which civil rights loving woman co-founded a group dedicated to helping homeless young drag queens and trans women of color?",
            image: "assets/images/Rivera.png",
            answers: {
                1: "Mae Jemison",
                2: "Sylvia Rivera",
                3: "Bell Hooks",
                4: "Bessie Coleman"
            },
            correctAnswer: "Sylvia Rivera"
        },
        {
            question: "What did Stephanie Kwolek invent in 1965?",
            image: "assets/images/Kwolek.jpg",
            answers: {
                1: "Kevlar",
                2: "Valium",
                3: "Permanent-press Fabric",
                4: "NutraSweet"
            },
            correctAnswer: "Kevlar"
        },
        {
            question: "This woman is widely considered to be the first computer programmer, as she created the first algorithm intended to be carried out by a general use computer.",
            image: "assets/images/Lovelace.jpg",
            answers: {
                1: "Mary Somerville",
                2: "Grace Hopper",
                3: "Ada Lovelace",
                4: "Mary Shelley"
            },
            correctAnswer: "Ada Lovelace"
        },
        {
            question: "Constant sex-based discrimination in the work place, and at university, led this woman to dedicate her life to fighting for gender equality. She literally wrote the textbook on gender discrimination, after completing law school while raising a toddler.",
            image: "assets/images/Ginsburg.jpg",
            answers: {
                1: "Sandra Day O'Connor",
                2: "Ruth Bader Ginsburg",
                3: "Hilary Clinton",
                4: "Gloria Allred"
            },
            correctAnswer: "Ruth Bader Ginsburg"
        },
        {
            question: "This ballerina was not able to tour parts of the American South, for fear of safety due to her race. Despite this sort of limitation, in 1951 she won the Donaldson Award for best dancer on Broadway.",
            image: "assets/images/Collins.jpg",
            answers: {
                1: "Patricia Johnson",
                2: "Debra Austin",
                3: "Raven Wilkinson",
                4: "Janet Collins"
            },
            correctAnswer: "Janet Collins"
        },
        {
            question: "This judoka became the first ever American to win Olympic gold; male or female. After winning, she has worked to raise awareness surrounding sexual abuse, and encourages female vicitms to fight back, and thrive.",
            image: "assets/images/Harrison.jpg",
            answers: {
                1: "Kayla Harrison",
                2: "Sandra Bacher",
                3: "Ronda Rousey",
                4: "Marti Malloy"
            },
            correctAnswer: "Kayla Harrison"
        },
        {
            question: "While President of the American Association for the Advancement of Science in 1975 she presided over the passage of a AAAS policy statement deploring discrimination against gay and lesbian scientists. She helped pioneer, through cross-cultural studies, greater understanding for the natural variety of sexual behaviors that occur in human societies.",
            image: "assets/images/Mead.jpg",
            answers: {
                1: "Elizabeth Blackwell",
                2: "Mary Coble",
                3: "Margaret Mead",
                4: "Nancy Pelosi"
            },
            correctAnswer: "Margaret Mead"
        },
        {
            question: "Who was the first Black woman to serve as the US National Security Adviser?. She was also the first Black female to hold the position of provost at Stanford University.",
            image: "assets/images/Rice.jpg",
            answers: {
                1: "Kamala Harris",
                2: "Condoleezza Rice",
                3: "Maxine Waters",
                4: "Donna Edwards"
            },
            correctAnswer: "Condoleezza Rice"
        }

    ];


    var correctCount = 0;
    var wrongCount = 0;
    var unanswered = 0;

    var timeRemaining = 15;
    var currentLevel = 0;

    console.log(myQuestions[currentLevel].correctAnswer);


    function welcomeImage() {
        var img = $("<img>");
        img.attr("src", "assets/images/nasty-welcome.png");
        $('#image-container').append(img);
    };
    welcomeImage();

    console.log("test");


    $("#button").on("click", function() {

        $("#questionAnswers").show();
        $("#image-container").empty();
        $("#button").remove();
        createQuestion(currentLevel);
    });


    function timerReset() {
        timeRemaining = 15;
        clearInterval(questionIntervalId);
        console.log("we runnin the time reset");
    };

    function timerMain() {
        timeRemaining--;
        $("#counter").text("Time Remaining: " + timeRemaining);
        if (timeRemaining < 0) {
            timerReset();
            wrongAnswer();
        }
    };


    function addImage() {

        var newImgDiv = $("<img>");
        newImgDiv.addClass("show-image img-rounded img-responsive");
        newImgDiv.attr("src", myQuestions[currentLevel].image);
        $("#answerImage").append(newImgDiv);
    };

  
    function createQuestion(x) {
        if (x < myQuestions.length) {
            $("#quizQuestions").text(myQuestions[x].question);
            $(".answers-1").text(myQuestions[x].answers["1"]);
            $(".answers-2").text(myQuestions[x].answers["2"]);
            $(".answers-3").text(myQuestions[x].answers["3"]);
            $(".answers-4").text(myQuestions[x].answers["4"]);

            questionIntervalId = setInterval(function() {
                timerMain();
            }, 1000);

        } else {
            gameEnd();
        }
    };



    function correctAnswer() {
        var correctAnswer = myQuestions[currentLevel].correctAnswer;

        $("#quizQuestions").append("The correct answer was" + myQuestions[currentLevel].correctAnswer);
        answerTimeout = setTimeout(function() {
            createQuestion(currentLevel);
        }, 5000);
        timerReset();
        addImage();
        correctCount++;
        currentLevel++;
    }

    function wrongAnswer() {
        $("#quizQuestions").append("The answer was" + myQuestions[currentLevel].correctAnswer);
        answerTimeout = setTimeout(function() {
            createQuestion(currentLevel);
        }, 5000);
        timerReset();
        addImage();
        wrongCount++;
        currentLevel++;
    }

    function gameEnd() {
        $("#quizQuestions").text("Well done!");
        $("#button").show();
        $("#button").text("Yes, please!")
        $("#correct").text(correctCount);
        $("#wrong").text(wrongCount);
    }

    $(".answers").on("click", function() {
        var yourSelection = $(this).text();

        console.log('this is my correct answer ' + myQuestions[currentLevel].correctAnswer);
        console.log(yourSelection);

        if ((yourSelection === myQuestions[currentLevel].correctAnswer) && (currentLevel < myQuestions.length)) {

            correctAnswer();
            timerReset();
            console.log('if statement is true - interating currentLevel')
            createQuestion();

        } else {

            wrongAnswer();
            console.log('if statement is false - interating currentLevel')
            gameEnd();
        }
    })

});