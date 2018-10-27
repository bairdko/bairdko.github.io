

//variables
var correct = 0;
var incorrect = 0;
var i = 0;


//location variables
var timer = $("#timer");
var questionLoc = $("#question");
var correctLoc = $("#correct");
var incorrectLoc = $("#incorrect");


//array of answers
var trivia = [
  {question:"Who was the only president to serve non-consecutive terms?",
   answerChoices:["Grover Clevland","Calvin Coolidge","Warren G. Harding","Richard Nixon"],
   key: [true,false,false,false]},
  {question:"What is the capital of Vietnam?",
   answerChoices:["Ho Chi Minh City","Da Nang","Hanoi","Hue"],
   key:[false,false,true,false]}, 
  {question:"What is the derivative of cos(x)?",
    answerChoices:["sin(x)","xcos(x)","tan(x)","-sin(x)"],
    key:[false,false,false,true]}, 
  {question:"Which of the following is not a Hogwarts house?",
    answerChoices:["Gryffindor","Pukwudgie","Slytherin","Hufflepuff"],
    key:[false,true,false,false]}, 
  {question:"What is the lead singer of Led Zeppelin's name?",
    answerChoices:["Robert Plant","Jimmy Page","John Paul Jones","John Bonham"],
    key:[true,false,false,false]}, 
  {question:"What year was the Lion King released?",
    answerChoices:["1989","1997","1994","2001"],
    key:[false,false,true,false]}, 
  {question:"Who is Xi Jinping?",
    answerChoices:["Prime Minister of Japan","President of China","President of South Korea","US Ambassador to China"],
    key:[false,true,false,false]}, 
  {question:"Which team has won the most Stanley Cup titles?",
    answerChoices:["Toronto Maple Leafs","Detroit Red Wings","Pittsburg Penguins","Montreal Canadiens"],
    key:[false,false,false,true]} 
];


//timer 
var timeLeft = 30;
var timerDisplay = setInterval(countdown,1000);

function restartTimer(){
  timeLeft = 30;
  timer.text(timeLeft);
  timerDisplay = setInterval(countdown,1000);
};

function countdown(){
  timeLeft--;
  timer.text(timeLeft);
  if(timeLeft <= 0){
    clearInterval(timerDisplay);
    $(document).off("click",".answers",testAnswer);
    questionLoc.text("Out of time!")
    $('ol').empty();
    incorrect++;
    setTimeout(function(){
      incorrectLoc.text(incorrect);
      restartTimer();
      i++;
      changeQuestion();
      $(document).on("click",".answers",testAnswer);
    },1000);
  }
  
}

//sets questions and answers

function setQuestion(){
  var listRef = $("ol");

  questionLoc.html("<h3>" + trivia[i].question + "</h3>");

  for(var j = 0; j < trivia[i].answerChoices.length; j++){
    listRef.append('<li class = "answers" val = "' + trivia[i].key[j] + '">'+trivia[i].answerChoices[j]+'</li>');
    
  }
}

function changeQuestion(){

  $('li').css("background-color","transparent");

  if(i === trivia.length){
    $('ol').empty();
    clearInterval(timerDisplay);
    questionLoc.text("You've answered all the questions! Press restart game to play again");
  }
  else{
    $('ol').empty();
    setQuestion();
  }
}

function restartGame(){
  i = 0;
  correct = 0;
  incorrect = 0;

  correctLoc.text(correct);
  incorrectLoc.text(incorrect);
  
  restartTimer();
  changeQuestion();
}

function testAnswer(){
  var selectedButton = $(this);
  var isCorrect = $(this).attr("val");



  if(isCorrect === "true"){
    correct++;

    clearInterval(timerDisplay);
    selectedButton.css("background-color","rgba(23,162,184,.6)");

    setTimeout(function(){
      correctLoc.text(correct);
      restartTimer();
      i++;
      changeQuestion();
    },1000);

  }
  else{
    incorrect++;

    clearInterval(timerDisplay);
    $('li[val="true"]').css("background-color","rgba(23,162,184,.6)");
    selectedButton.css("background-color","rgba(247,200,184,.6)");
    
    setTimeout(function(){
      incorrectLoc.text(incorrect);
      restartTimer();
      i++;
      changeQuestion();
    },1000);

  }

  if(timeLeft = 0){
    console.log(loser);
  }

}



setQuestion();

//test if true
$(document).on("click",".answers",testAnswer);


//restart game
$(document).on("click","#restart",restartGame);
