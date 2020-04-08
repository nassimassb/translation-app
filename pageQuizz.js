let questionNb;
let wrongAnswers;
let numQuiz = new URL(location.href).searchParams.get("liste"); //num de l'élément selectionné

function setPageContent(){
    const selectedData = data[numQuiz]; //le theme à la position numQuizz
    const questions = selectedData.questions; //récupère toutes les questions de la catégorie
    let sentence; //string avec la réponse et l'extra
    let res; // divise chaque mot en tableau
    let answer;
    const quizzTheme = document.getElementById("quizzTheme"); 
    questionNb = 0;
    wrongAnswers = 0; 
    //debug
    // console.log(selectedData);
    // console.log(res);
 
    // on va rajouter la description à côté du titre
    quizzTheme.innerHTML += " " + selectedData.description;
    disposeButtons(questions,res);
}
 
/**
 * Dispose les boutons et créer la question
 */
function disposeButtons(questions,res){ 
    const buttonsDiv = document.getElementById('clickableButtons');
    let buttons; 
    const questionTitle = document.getElementById("questionTitle");
    const question = document.getElementById('question');
    answer = "";
 
    //Indique la question au joueur
    question.innerHTML = " " + questions[questionNb].question;
 
    questionTitle.innerHTML = " " + (questionNb+1) + " sur " + questions.length;
 
    sentence = questions[questionNb].answer + " " + questions[questionNb].extras;
    res = sentence.split(" ");
 
    /**
     * Mélange les données du tableau de valeurs
     */
    shuffle(res);
    //rajoute les boutons en dessous de la zone de texte
    for(let i = 0; i < res.length; i++){
        buttons = document.createElement("button");
        buttons.value = res[i];
        buttons.type = "button";
        buttons.className = "btn btn-secondary buttons";
        buttons.innerHTML = res[i];
        buttonsDiv.append(buttons);
    }
}
/**
 * Algoritme de mélange des mots.
 * @param {*} array tableau contenant les mots
 */
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
    document.getElementById("submitBtn").style.display = "none";
    $(".buttons").prop('disabled', 'disabled');
    correctAnswer = document.createElement("div");
    nextQuestion = document.createElement("button");
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
 
  /**
   * Indiquer au joueur que la réponse est correcte
   */
  function correct(){
    correctAnswer.className = "alert alert-success correct";
    correctAnswer.innerHTML = "Correct! Veuillez passer à la question suivante";
 
    nextQuestion.className = "btn btn-success next";
}
  /**
   * Indiquer au joueur que la réponse est fausse
   */
  function wrong(){
    correctAnswer.className = "alert alert-danger correct";
    correctAnswer.innerHTML = "faux!";
 
    nextQuestion.className = "btn btn-danger next";
}
$(document).ready(function(){
    $(document).on('click', "#next", function(){
        const questions = data[numQuiz].questions;
        let res = sentence.split(" ");
        //supprime les anciens boutons, la div "correct" et le bouton "next"
        $(".buttons").fadeOut();
        $(".correct").fadeOut();
        $(".next").fadeOut();
         
        if(questionNb < questions.length-1){
            questionNb++;
            disposeButtons(questions,res);
            document.getElementById("submitBtn").style.display = "inline";

        }else{
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
    //retourne au menu principal
 $(document).ready(function(){
    $(document).on('click', ".mainBtn", function(){
        window.location.href = "index.html";
    });
});
