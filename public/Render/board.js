import { BOARD } from "../app.js";

const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'bomb'];

const gameState = [];

function setDimentions(x, y) {
    const root = document.querySelector(":root");
    const unit = Math.min(Math.floor(0.9 * root.offsetHeight / y), Math.floor(0.9 * root.offsetWidth / x));
    root.style.setProperty("--board-height", `${y * unit}px`);
    root.style.setProperty("--board-width", `${x * unit}px`);
    root.style.setProperty("--board-box-length", `${unit}px`);
    return unit;
}

function getRandom_0toN(n) {
    return Math.floor(Math.random() * n);
}

function bombForEachX(bombs, x, y) {
    let j = 0, sign = 1;
    if (getRandom_0toN(2)) {
        j = x - 1; sign = -1;
    }
    for (let index = 0; j < x && j > -1 && bombs; j += sign) {
        index = getRandom_0toN(y);
        if (gameState[index][j] == 9) continue;
        gameState[index][j] = 9;
        bombs--;
    }
    return bombs;
}

function bombForEachY(bombs, x, y) {
    let i = 0, sign = 1;
    if (getRandom_0toN(2)) {
        i = y - 1; sign = -1;
    }
    for (let index = 0; i < y && i > -1 && bombs; i += sign) {
        index = getRandom_0toN(x);
        if (gameState[i][index] == 9) continue;
        gameState[i][index] = 9;
        bombs--;
    }
    return bombs;
}

function createArray(x, y) {
    let bombs = x * y;
    if (bombs == 16) bombs = 1;
    else if (bombs == 20) bombs = 2;
    else
        bombs = Math.ceil(0.13 * bombs);
    for (let i = 0; i < y; i++) {
        gameState[i] = [];
        for (let j = 0; j < x; j++) {
            gameState[i][j] = 0;
        }
    }
    if (x < y) {
        while (bombs = bombForEachY(bombForEachX(bombs, x, y), x, y));
    }
    else {
        while (bombs = bombForEachX(bombForEachY(bombs, x, y), x, y));
    }
}

function calculate(x, y) {
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (gameState[i][j] == 9) {
                if (i > 0) {
                    if (j < x - 1) gameState[i - 1][j + 1] != 9 && (gameState[i - 1][j + 1]++);
                    if (j > 0) gameState[i - 1][j - 1] != 9 && (gameState[i - 1][j - 1]++);
                    gameState[i - 1][j] != 9 && (gameState[i - 1][j]++);
                }
                if (i < x - 1) {
                    if (j < x - 1) gameState[i + 1][j + 1] != 9 && (gameState[i + 1][j + 1]++);
                    if (j > 0) gameState[i + 1][j - 1] != 9 && (gameState[i + 1][j - 1]++);
                    gameState[i + 1][j] != 9 && (gameState[i + 1][j]++);
                }
                if (j > 0) gameState[i][j - 1] != 9 && (gameState[i][j - 1]++);
                if (j < x - 1) gameState[i][j + 1] != 9 && (gameState[i][j + 1]++);
            }
        }
    }
}

function createBoard() {
    const x = document.querySelector("#xLength").value;
    const y = document.querySelector("#yLength").value;
    const unit = setDimentions(x, y);
    createArray(x, y);
    calculate(x, y);
    console.log(gameState);
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            let id = `${alpha[i]}${j}`;
            let newBox = document.createElement("div");
            newBox.classList.add("subBox");
            newBox.setAttribute("id", id);
            newBox.style.backgroundImage = `url("./images/${numbers[gameState[i][j]]}.png")`;
            BOARD.appendChild(newBox);
        }
    }
}
export {
    createBoard
}