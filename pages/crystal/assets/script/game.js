
//game object
var collectorGame = {
	
	//variables
	targetNum: 0,
	playerScore: 0, 
    wins: 0,
    losses: 0,
	crystalsArr: ["#sapphire","#ruby","#emerald","#amethyst"],
	possibleVals: [1,2,3,4,5,6,7,8,9,10,11,12],
	
	//location variables
	targetLoc: $("#targetNum"),
	scoreBox: $('#scoreBox'),
	winStatus: $('#winnerBar'),
	
	//generate the target number for the game	
	setTarget: function(){

	  //make sure target is at least generate number between 19 & 120
	  collectorGame.targetNum = Math.floor(Math.random() * 101) + 19;
	  collectorGame.targetLoc.text(collectorGame.targetNum);
	},
	
	//generate crystal numbers
	assignVal: function(){
		
	  //went down a rabbit hole, and ended up finding the Fisher-Yates method of shuffling
	  //using that method here
	  var m = collectorGame.possibleVals.length;
	  var temp;
	  var i;

	  //while elements remain to shuffle
	  while(m){
		  
		 //pick remaining element
		 i = Math.floor(Math.random() * m--);
		 
		 //swap with remaining elements
		 temp = collectorGame.possibleVals[m];
		 collectorGame.possibleVals[m] = collectorGame.possibleVals[i];
		 collectorGame.possibleVals[i] = temp;
	  }
	  
	  console.log(collectorGame.possibleVals);
	  //assign value to each crystal

		for(var i = 0; i < collectorGame.crystalsArr.length; i++){
		  $(collectorGame.crystalsArr[i]).attr("val",collectorGame.possibleVals[i]);
		}

	},
	
	
	//restart game 

	restartGame: function(){
	  collectorGame.setTarget();
	  collectorGame.assignVal();

	  collectorGame.playerScore = 0;
	  collectorGame.scoreBox.text(collectorGame.playerScore);
	  collectorGame.winStatus.css("display","none");
	},
	

	//play game
	addCrystals: function(val){
	 this.playerScore += parseInt(val);

	 this.scoreBox.text(this.playerScore);
	 
	 var that = this;

	 
	  // if your score is over target you lose 
	  // if your score is equal to target you win
	  // else you can keep playing


	  if (this.playerScore > this.targetNum){
		that.losses++;
		$('#losses').text(that.losses);
		
		this.winStatus.html("<h1>You lose!</html>");
		this.winStatus.css("display","flex");
		setTimeout(collectorGame.restartGame,1000);
		
		
	  }
	  else if (this.playerScore === this.targetNum){
		that.wins++;
		$('#wins').text(that.wins);
		
		this.winStatus.html("<h1>You win!</h1>");
		this.winStatus.css("display","flex");
		setTimeout(collectorGame.restartGame,1000);
	  }
	},
}

collectorGame.restartGame();

//play game

$('.crystals').on('click',function(){
	
 // add player scores
 var crystalVal = this.getAttribute('val');
 collectorGame.addCrystals(crystalVal);

});












