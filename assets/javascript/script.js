// <!-- Make header line
// Create DIV that shows start button
// Create Div enables to show after press of Start
// Set timer
// Create Random generated questions
// Answers to be selected
// Make a case if answers is wrong or not selected right Display results.
// Make an early completion button saying Done or Submit
// Show Numbers of correct answer, incorrect answers and show unanswered questions.
// MAke a refresh page button.
//  -->

$(document).ready(function(){
	$("#myModal").modal('show');
});


var triviaQuestions = [{
	question: "Where are the cars of the brand &#039;Ferrari&#039; manufactured?",
	answerList: ["Italy", "Romania","Germany","Russia"],
	answer: 0
},

{
	question: "Which Italian city is home of the car manufacturer &#039;Fiat&#039;?",
	answerList: ["Maranello","Turin","Modena","Rome"],
	answer: 1
},

{
	question: "Which of the following car manufacturers had a war named after it?",
	answerList: ["Honda","Ford","Toyota","Volkswagen"],
	answer: 2
},

{
	question: "Jaguar Cars was previously owned by which car manfacturer?",
	answerList: ["Chrysler","General Motors","Fiat","Ford"],
	answer: 3
},

{
	question: "Which of the following collision avoidance systems helps airplanes avoid colliding with each other?",
	answerList: ["GPWS","TCAS","OCAS","TAWS"],
	answer: 1
},

{
	question: "Which of these companies does NOT manufacture motorcycles?",
	answerList: ["Toyota","Honda","Kawasaki","Yamaha"],
	answer: 2
},

{
	question: "Automobiles produced by Telsa Motors operate on which form of energy?",
	answerList: ["Electricity","Gasoline","Diesel","Nuclear"],
	answer: 0
},

{
	question: "What are the cylinder-like parts that pump up and down within the engine?",
	answerList: ["Leaf Springs","Radiators","Pistons","ABS"],
	answer: 2
},


{
	question: "The LS1 engine is how many cubic inches?",
	answerList: ["346","350","355","360"],
	answer: 0
},

{
	question: "The LS7 engine is how many cubic inches?",
	answerList: ["346","364","376","427"],
	answer: 3
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, You got it right, Congrats",
	incorrect: "No, that's not it. Try Again",
	endTime: "Out of time, Sorry buddy next time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});


$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
