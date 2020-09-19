let questionNb;
let wrongAnswers;
let numQuiz = new URL(location.href).searchParams.get("liste"); //nb of selected item

function setPageContent(){
    const selectedData = data[numQuiz]; //topic
    const questions = selectedData.questions; //all the questions of the category
    let splitWords; // divise chaque mot en tableau
    const quizzTheme = document.getElementById("quizzTheme"); //html title
    questionNb = 0;
    wrongAnswers = 0; 
    //debug
    //console.log(selectedData);
 
    // adds the description next to the title
    quizzTheme.innerHTML += " " + selectedData.description;
    disposeButtons(questions,splitWords);
}
 
//dispose buttons and create the question
function disposeButtons(questions,splitWords){ 
    const buttonsDiv = document.getElementById('clickableButtons');
    let buttons; 
    const questionTitle = document.getElementById("questionTitle");
    const question = document.getElementById('question');
    answer = "";
 
    //displays the question
    question.innerHTML = " " + questions[questionNb].question;
 
    questionTitle.innerHTML = " " + (questionNb+1) + " sur " + questions.length;
 
    sentence = questions[questionNb].answer + " " + questions[questionNb].extras;
    splitWords = sentence.split(" ");
 
    shuffle(splitWords);
    //create and add the buttons on the bottom of the screen to start the game
    for(let i = 0; i < splitWords.length; i++){
        buttons = document.createElement("button");
        buttons.value = splitWords[i];
        buttons.type = "button";
        buttons.className = "btn btn-secondary buttons";
        buttons.innerHTML = splitWords[i];
        buttonsDiv.append(buttons);
    }
}

function shuffle(array) 
{
    let counter = array.length; 
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter); 
        counter--;
        // Swap positions counter and index in the array. 
        [array[counter], array[index]] = [array[index], array[counter]];
    }
}
 
//check if where we are in the answer zone and move the buttons to the right place
$(document).ready(function(){
    $(document).on('click', ".buttons", function(){

        if(this.parentElement.id == "clickableButtons")
        {
            answer += this.value + " "; //rajoute la valeur du bouton à notre String
            //debug
            // console.log(answer);
            // console.log(questions[questionNb].answer);
            $("#answerZone").append($(this));
        }
        else
        {
            answer = answer.replace(this.value + " ", "");
            //debug
            // console.log(answer);
            $("#clickableButtons").append($(this));
        }
    });
  })
  function verif(){
    let questionAnswer = ""; 
    const questions = data[numQuiz].questions;
    //disable submit and other buttons to show correctAnswer div
    document.getElementById("submitBtn").style.display = "none";
    $(".buttons").prop('disabled', 'disabled');
    correctAnswer = document.createElement("div"); //displays String to show if answer is correct or not
    nextQuestion = document.createElement("button"); //go to the next question
    nextQuestion.type = "button";
    nextQuestion.id = "next";
    nextQuestion.innerHTML = "Suivant";
    questionAnswer = questions[questionNb].answer;
    answer = answer.trim();
 
    if(answer.localeCompare(questionAnswer) == 0){
 
        correct();
 
    }else{
 
        wrong();
        wrongAnswers++;
    }
    $("#validation").append(correctAnswer);
    $("#validation").append(nextQuestion);
  }
 
  function correct(){
    correctAnswer.className = "alert alert-success correct";
    correctAnswer.innerHTML = "Correct! Veuillez passer à la question suivante";
 
    nextQuestion.className = "btn btn-success next";
}

  function wrong(){
    correctAnswer.className = "alert alert-danger correct";
    correctAnswer.innerHTML = "faux!";
 
    nextQuestion.className = "btn btn-danger next";
}

//go to the next question when clicking on the next button
$(document).ready(function(){
    $(document).on('click', "#next", function(){
        const questions = data[numQuiz].questions;
        let res = sentence.split(" ");
        //delete the buttons and adds some new buttons, delete the correctAnswer div and the next button
        $(".buttons").fadeOut();
        $(".correct").fadeOut();
        $(".next").fadeOut();
         
        if(questionNb < questions.length-1){
            questionNb++;
            disposeButtons(questions,res);
            document.getElementById("submitBtn").style.display = "inline";

        }else{
            //game finished
            results = document.createElement("b");
            results.innerHTML = "Votre score est de " + ((questions.length)-wrongAnswers) + "/" + (questions.length);
            results.className = "alert alert-warning";
            main = document.createElement("button");
            main.innerHTML = "Menu principal";
            main.className = "btn btn-success mainBtn";
            $("#validation").append(results);
            $("#validation").append(main);
        }
    });
  });

  //go to main menu
 $(document).ready(function(){
    $(document).on('click', ".mainBtn", function(){
        window.location.href = "index.html";
    });
});
