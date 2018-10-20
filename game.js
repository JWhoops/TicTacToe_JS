//game board object
const gameBoard = (() =>{
	let slots //slots used to store marks
	let term, win, takenSlots //define player's term, win status, and taken slot
	let score_one = 0,score_two = 0
	const newGame = () =>{
	    let board = $("#gameBoard")
	    	board.empty()
			//append slots with 2
			slots = []
			slots[0] = 0// ignore the base index 
			for (var i = 0; i < 9; i++) {
				// use 2 to represent slots that haven't taken by player
				slots.push(0)
			}
			win = false //game result
			term = 1 //player's term
			takenSlots = 0 //set taken slots number to 0
	    //append board with empty label
	    for (let i = 1; i < 10; i++) {
	    	let slot = document.createElement("label")
	    	$(slot).on("click",()=>{
	    		$(slot).off('click') //disable the label
	    		markSlot(i)
	    		let mark = 1 === term ? "O" : "X"
	    		$(slot).text(mark)
	    		$(slot).data("taken",true)
	    		term = term === 1 ? 2 : 1 //change players term
	    	})
	    	//style and append the new 
	    	$(slot).addClass("slot")
			$(slot).hover(
				  	()=>{
				  		if(!$(slot).data("taken")){
					  		if(term === 2) $(slot).text( "X" )
					  		else $(slot).text( "O" )
				  		}},
				  	()=>{if(!$(slot).data("taken")) $(slot).text("")});

	    	board.append(slot)
	    }
		}
	//markt the slot with player's number
	const markSlot = (position) => {
		//check if slot is taken
		if(slots[position] === 0){
			slots[position] = term //mark the slot as occupy
			takenSlots++ //increase the taken slots number
			checkWin(position)
			if(win) {
	    		if(term === 1){
	    			score_one++
	    			$("#score_one").text(score_one)
	    		}else{
	    			score_two++
	    			$("#score_two").text(score_two)
	    		}
	    		newGame()
	    		}
			
			}
	}
	/*check if produce victory very dumb game logic design
	*/
	const checkWin = (position) => {
		if(takenSlots > 4 && takenSlots <= 9){
			//check vertically
			if(position <= 3){
				if(slots[position] === slots[position + 3] && slots[position] === slots[position + 6])
				win = true
			}else if(position > 3 && position < 7){
				if(slots[position] === slots[position + 3] && slots[position] === slots[position - 3])
				win = true
			}else{
				if(slots[position] === slots[position - 3] && slots[position] === slots[position - 6])
				win = true
			}
			//check horizontally
			switch(position) {
			    case 1: case 4: case 7:
			        if(slots[position] === slots[position + 1] && slots[position] === slots[position + 2])
						win = true
			        break;
			    case 2: case 5: case 8:
					if(slots[position] === slots[position - 1] && slots[position] === slots[position + 1])
						win = true
			        break;
			    case 3: case 6: case 9:
			        if(slots[position] === slots[position - 1] && slots[position] === slots[position - 2])
						win = true
			        break;
			}
			//check slantly
			switch(position) {
			    case 1: case 9:
			    	if(slots[1] === slots[5] && slots[1] === slots[9]) win = true
			        break;
			    case 3: case 7:
			        if(slots[3] === slots[5] && slots[3] === slots[7]) win = true
			        break;
			    case 5:
			        if(slots[1] === slots[5] && slots[1] === slots[9]) win = true
			        if(slots[3] === slots[5] && slots[3] === slots[7]) win = true
			        break;
			}
		}
	}
	//clear score
	const clearScore = () => {
		score_one = 0
		score_two = 0
		$("#score_one").text(score_one)
		$("#score_two").text(score_two)
	}

	return {newGame,clearScore}
})()

//init
$("#newGameBtn").on("click",()=>{gameBoard.newGame()})
$("#clearBtn").on("click",()=>{gameBoard.clearScore()})
gameBoard.newGame()


