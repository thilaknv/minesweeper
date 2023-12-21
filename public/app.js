import { addEventsToForm } from "./Render/form.js";
import { createBoard } from "./Render/board.js";

const BOARD = document.querySelector("#board");
const inputForm = document.querySelector("#inputForm");
inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
})

// 
addEventsToForm();

//
function startGame() {
    createBoard();
    document.querySelector("#home").style.display = 'none';
    document.querySelector("#time").style.display = 'block';
    document.querySelector("#restart0").addEventListener('click', () => location.reload());
    document.querySelector("#board").classList.remove('hide');
    document.querySelector("#board").style.display = 'flex';
}


export {
    startGame
}
export {
    BOARD
}