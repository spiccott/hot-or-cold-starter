
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Global variables ---*/
  	var count = 0;
	var answer = generateNumber();
	console.log("Answer is: " + answer);
	var guessList = []
	var absDistance = null;
	var prevAbsDistance = null;

	function generateNumber() {
		return Math.floor(Math.random() * 100) + 1;
	}

	function submitGuess() {
		$("#guessButton").click(playGame);
	}

	submitGuess();

  	function playGame() {
		var guess = parseInt($("#userGuess").val());
  		if (guess !== null && $.isNumeric(guess) && ( 1 < guess < 101 )) {
  			count = count + 1;
  			$("#count").html(count);
  			$("#userGuess").val("");
  			guessList.push(guess);
			$("#guessList").prepend( '<li>' + guess + '</li>' );
			absDistance = Math.abs(answer - guess);
			// prevAbsDistance = Math.abs();
			if (guess === answer) {
				$("#feedback").text("Yay, You Win!");
				// $("#guessButton").val("Play again?").click(resetGame);
			}
			else {
				if (prevAbsDistance === null) {
					if (guess > answer) {
						$("#feedback").text("Try lower!");
					}
					else {
						$("#feedback").text("Try higher!");
					}
				}
				else {
					if (prevAbsDistance < absDistance) {
						if (guess > answer) {
							$("#feedback").text("Colder! Try lower.");
						}
						else {
							$("#feedback").text("Colder! Try higher.");
						}
					}
					else {
						if (guess > answer) {
							$("#feedback").text("Warmer! Try lower.");
						}
						else {
							$("#feedback").text("Warmer! Try higher.");
						}
					}
				}
				prevAbsDistance = absDistance;
			}
  		}
		else {
			$("#feedback").text("Please guess a number between 1 and 100!");
		}
	  	$(".new").click(function (event) {
	  		event.preventDefault();
	  		count = 0;
	  		answer = generateNumber();
	  		console.log("The answer is: " + answer)
			guessList = []
			absDistance = null;
			prevAbsDistance = null;
			$("#feedback").text("Make your Guess!");
			$("#guessList").html( "" );
			$("#count").text("0");
			$("#guessButton").val("Guess");
	  	});
	}
});



