//game board object
const gameLogic = (() =>{
	let slots = [] //slots used to store marks
	let term, win, takenSlots //define player's term, win status, and taken slot
	const newGame = () =>{
			//append slots with 2
			slots[0] = 0// ignore the base index 
			for (var i = 0; i < 9; i++) {
				// use 2 to represent slots that haven't taken by player
				slots.push(0)
			}
			win = false //game result
			term = 1 //player's term
			takenSlots = 0 //set taken slots number to 0
		}	
	//markt the slot with player's number
	const markSlot = (position) => {
		//check if slot is taken
		if(slots[position] === 0){
			slots[position] = term //mark the slot as occupy
			takenSlots++ //increase the taken slots number
			checkWinner(position)
			if(win) console.log(term + " win")	
			else term = term === 1 ? 2 : 1 //change players term
		}
	}
	/*check if produce victory very dumb game logic design
	*/
	const checkWinner = (position) => {
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
	const getWin = ()=>{ return win }//get win result
	const getTerm = ()=>{ return term }//get win result
	return {newGame,markSlot,getWin,getTerm}
})()

//iffy
!function newGame(){
	gameLogic.newGame()
    let board = $("#board")
    //append board with empty label
    for (let i = 0; i < 9; i++) {
    	let slot = document.createElement("label")
    	$(slot).on("click",()=>{
    		gameLogic.markSlot(gameLogic.term)
    		let mark = 1 === gameLogic.term ? "X" : "O"
    		$(slot).text(mark)
    	})
    	$(slot).height("60px")
    	$(slot).width("60px")
    	$(slot).css("background-color","white")
    	$(slot).css("display","inline-block")
    	$(slot).css("margin","5px")
    	board.append(slot)
    }
}()


