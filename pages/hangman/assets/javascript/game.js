

// Make variables
var guessesLeft = 15;
var guessesTaken = 0;
var guessHolder = [];
var letters;
var wordChosen;
var blanks = "_";
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];



//make objects
var hangman = {
  breweries: ["community", 
			  "deep ellum", 
			  "jester king", 
			  "live oak", 
			  "spoetzl", 
			  "the abgb", 
			  "pinthouse pizza", 
			  "karbach",
			  "real ale",
			  "saint arnold", 
			  "austin beerworks"],
  hints: ["Located in Dallas, my personal favorite brewery",
		  "Located in Dallas, makes Dallas Blonde",
		  "Located in Austin, makes sour beers",
		  "Located in Austin, famous for their Hefeweizen", 
		  "Located in Shiner, makes the most famous Texas craft beer",
		  "Located in Austin, famous for their lagers", 
		  "Located in Austin, also serves amazing pizza",
		  "Located in Houston, makes Hopadillo IPA",
		  "Located in Blanco, makes Fireman's 4",
		  "located in Houston, named for the Patron Saint of Brewers",
		  "Located in Austin, makes Pearl Snap"],
  brewIndex: 0,
  
  //locations
  hangmanText: document.getElementById("hangmanText"),      



  //choose word to use by choosing index
  chooseBrewery: function(){
    this.brewIndex = Math.floor(Math.random()* this.breweries.length);

    wordChosen = this.breweries[this.brewIndex];   
    
    //test that this is working
    console.log(this.brewIndex);
    console.log(wordChosen);
  },

  //create the blanks that you need to fill in 
  makeBlanks: function(){
    
    //hint location
    var clueText = document.getElementById("clueText"); 

    //display corrisponding hint
    clueText.textContent = this.hints[this.brewIndex];

    // build blanks
    for(var i = 1; i < wordChosen.length; i++){
      if(wordChosen.charAt(i) === " "){
        blanks = blanks + " ";
      }
      else{
        blanks = blanks + "_";
      }

    //end of for
    }

    //testing
    console.log(blanks);

    //replace text
    this.hangmanText.textContent = blanks;

  //end of makeBlanks
  },

  //to fill in letters
  testLetter: function(char){

    for(var i = 0; i < wordChosen.length; i++){

      if(wordChosen.charAt(i) === char){

        blanks = blanks.substr(0, i) + char + blanks.substr(i + char.length);

      }
    //end of for
    }

    console.log(blanks);

    //replace content with guessed characters
    this.hangmanText.textContent = blanks;

  //end of test letter
  },



//end of hangman object
};

//grabs elements by id
var userText = document.getElementById("guessText");
var numGuess = document.getElementById("guessesLeft");


function resetGame(){
	guessesLeft = 15;
	guessesTaken = 0;
	guessHolder = [];
	letters = "";
	blanks = "_";
	
	hangman.chooseBrewery();
	hangman.makeBlanks();
	userText.textContent = letters;
	numGuess.textContent = guessesLeft;
	

}

//set up game
hangman.chooseBrewery();
hangman.makeBlanks();



// on key up
document.onkeyup = function(event){
  //Determines which key was pressed
  var userGuess = event.key;

  userGuess = userGuess.toLowerCase();
  
  //fills guess holder if guess hasn't been taken
  if (!guessHolder.includes(userGuess) && alphabet.includes(userGuess) ){
		
	
	if (guessesLeft > 1){
		//outputs array
		for (var i = 0; i < guessHolder.length; i++){
		  letters = guessHolder[i] + " ";
		}

		//fills guessHolder array with guesses taken
		guessHolder[guessesTaken] = userGuess;
		guessesTaken ++;
		
		userText.textContent = guessHolder.join(" ");
	  
		//test the letter
		hangman.testLetter(userGuess);
		
		//updates text count
		guessesLeft--;
		numGuess.textContent = guessesLeft;
		
		if (wordChosen === blanks){
	 
			setTimeout( function() { alert("You won!") }, 100);
			setTimeout( function() { resetGame() }, 200);
			
		//end wordChosen equals blanks if
		}
	//end guesses left if
	}
	else {
		numGuess.textContent = 0;
		setTimeout( function() { alert("You lost!") }, 100);
		setTimeout( function() { resetGame() }, 200);
	}

    //end final if
  }
  
};
