
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	var count = 0;
	var answer = null
	var absDistance = null;
	var prevAbsDistance = null;
	var guess = null

	function generateNumber() {
		return Math.floor(Math.random() * 100) + 1;
	}

	newGame();

	$("#guessButton").submit(function (e) {
		playGame();
		e.preventDefault();
	});

	function newGame() {
		console.log("--New Game Created--")
		guess = null
		count = 0;
  		answer = generateNumber();
  		console.log("The answer is: " + answer);
  		absDistance = null;
		prevAbsDistance = null;
		$("#feedback").text("Make your Guess!");
		$("#guessList").empty();
		$("#count").html(count);
		$("#guessButton").val("Guess");
		$("#userGuess").val("");
	}

  	function playGame() {
		var guess = parseInt($("#userGuess").val());
		$("#guessButton").unbind();
  		if (guess !== null && $.isNumeric(guess) && guess<101 && guess>0) {
  			count = count + 1;
  			$("#count").html(count);
  			console.log(guess);
  			$("#userGuess").val("");
			$("#guessList").prepend( '<li>' + guess + '</li>' );
			absDistance = Math.abs(answer - guess);
			if (guess === answer) {
				$("#feedback").text("Yay, You Win!");
				console.log("You win.");
				$("#guessButton").val("Play again?");
				$("#guessButton").click(function(event) {
					$("#guessButton").unbind();
					event.preventDefault();
					newGame();
					return;
				});
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
			console.log("Not a valid input");
		}
	}

	$(".new").click(function () {
  		console.log("Reset Game");
  		newGame();
  		return;
  	});
});



