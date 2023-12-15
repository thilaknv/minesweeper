import { startGame } from "../app.js";


// starting form ------

const xLength = document.querySelector("#xLength");
const yLength = document.querySelector("#yLength");
function addEventsToForm() {
    document.querySelector("#decr1").addEventListener("click", () => {
        if (xLength.value < 5) return;
        xLength.value = Number(xLength.value) - 1;
    });
    document.querySelector("#incr1").addEventListener("click", () => {
        if (xLength.value > 19) return;
        xLength.value = Number(xLength.value) + 1;
    });
    document.querySelector("#decr2").addEventListener("click", () => {
        if (yLength.value < 5) return;
        yLength.value = Number(yLength.value) - 1;
    });
    document.querySelector("#incr2").addEventListener("click", () => {
        if (yLength.value > 19) return;
        yLength.value = Number(yLength.value) + 1;
    });
    document.querySelector("#startButton").addEventListener('click', () => {
        if (xLength < 4 || xLength > 20 || yLength < 4 || yLength > 20) {
            return;
        }
        startGame();
    });
}

// 
export {
    addEventsToForm
}