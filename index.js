const PLAYER_X_CLASS = 'x'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]
const selectors = {
    cellElements: document.querySelectorAll('[data-cell]'),
    boardElement: document.getElementById('board'),
    winningMessageElement: document.getElementById('winningMessage'),
    restartButton: document.getElementById('restartButton'),
    winningMessageTextElement: document.getElementById('winningMessageText')
}
let isPlayer_O_Turn = false
const setBoardHover = () => {
	selectors.boardElement.classList.remove(PLAYER_X_CLASS)
	selectors.boardElement.classList.remove(PLAYER_O_CLASS)
	if (isPlayer_O_Turn) {
		selectors.boardElement.classList.add(PLAYER_O_CLASS)
	} else {
		selectors.boardElement.classList.add(PLAYER_X_CLASS)
	}
}
const handleCellClick = e => {
	const cell = e.target
	const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
	placeMark(cell, currentClass)
	if (checkWin(currentClass)) {
		endGame(false)
	} else if (isDraw()) {
		endGame(true)
	} else {
		swapTurns()
		setBoardHover()
	}
}
const startGame = () => {
	isPlayer_O_Turn = false
	selectors.cellElements.forEach(cell => {
		cell.classList.remove(PLAYER_X_CLASS)
		cell.classList.remove(PLAYER_O_CLASS)
		cell.removeEventListener('click', handleCellClick)
		cell.addEventListener('click', handleCellClick, { once: true })
	})
	setBoardHover()
	selectors.winningMessageElement.classList.remove('show')
}
startGame()
selectors.restartButton.addEventListener('click', startGame)
const endGame = draw => {
    if (draw){
        selectors.winningMessageTextElement.innerText = "It's a draw, play again!"
    }
    else{
        selectors.winningMessageTextElement.innerText = `Player with ${isPlayer_O_Turn ? "0's" : "X's"} wins!`
    }
    selectors.winningMessageElement.classList.add('show')
}
const isDraw = () => {
	return [...selectors.cellElements].every(cell => {
		return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
	})
}
const placeMark = (cell, currentClass) => {
	cell.classList.add(currentClass)
}
const swapTurns = () => {
	isPlayer_O_Turn = !isPlayer_O_Turn
}
const checkWin = (currentClass) => {
	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return selectors.cellElements[index].classList.contains(currentClass)
		})
	})
}