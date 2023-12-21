import { BOARD } from "../app.js";

const time = {
    start: null,
    end: null,
    timeInter: null
}
const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const Alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'bomb'];
const countData = {
    total: null,
    bombs: null,
    seen: null
}
const gameState = [];

function setDimentions(x, y) {
    const root = document.querySelector(":root");
    const unit = Math.min(Math.floor(0.85 * root.offsetHeight / y), Math.floor(0.9 * root.offsetWidth / x));
    root.style.setProperty("--board-height", `${y * unit}px`);
    root.style.setProperty("--board-width", `${x * unit}px`);
    root.style.setProperty("--board-box-length", `${unit}px`);
    return unit;
}

function getRandom_0toN(n) {
    return Math.floor(Math.random() * n);
}

function bombForEachX(bombs, x, y, no_row, no_col) {
    let j = 0, sign = 1;
    if (getRandom_0toN(2)) {
        j = x - 1; sign = -1;
    }
    for (let i = 0; j < x && j > -1 && bombs; j += sign) {
        i = getRandom_0toN(y);
        if (gameState[i][j] == 9) continue;
        if (Math.abs(i - no_row) < 2 && Math.abs(j - no_col) < 2) continue;
        gameState[i][j] = 9;
        bombs--;
    }
    return bombs;
}

function bombForEachY(bombs, x, y, no_row, no_col) {
    let i = 0, sign = 1;
    if (getRandom_0toN(2)) {
        i = y - 1; sign = -1;
    }
    for (let j = 0; i < y && i > -1 && bombs; i += sign) {
        j = getRandom_0toN(x);
        if (gameState[i][j] == 9) continue;
        if (Math.abs(i - no_row) < 2 && Math.abs(j - no_col) < 2) continue;
        gameState[i][j] = 9;
        bombs--;
    }
    return bombs;
}

function createArray(x, y, no_row, no_col) {
    let bombs = x * y;
    if (bombs == 16) bombs = 1;
    else if (bombs == 20) bombs = 2;
    else
        bombs = Math.ceil(0.13 * bombs);

    countData.bombs = bombs;

    for (let i = 0; i < y; i++) {
        gameState[i] = [];
        for (let j = 0; j < x; j++) {
            gameState[i][j] = 0;
        }
    }
    if (x < y) {
        while (bombs = bombForEachY(bombForEachX(bombs, x, y, no_row, no_col), x, y, no_row, no_col));
    }
    else {
        while (bombs = bombForEachX(bombForEachY(bombs, x, y, no_row, no_col), x, y, no_row, no_col));
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
                if (i < y - 1) {
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
    countData.total = x * y;
    setDimentions(x, y);
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            let id = `${alpha[i]}${Alpha[j]}`;
            let newBox = document.createElement("div");
            newBox.classList.add("subBox");
            newBox.classList.add("cover");
            newBox.setAttribute("id", id);
            BOARD.appendChild(newBox);
        }
    }
    addEventsToBoard(x, y);
}

function timeTaken() {
    let sec = Math.floor((time.end - time.start) / 1000);
    let min = Math.floor(sec / 60);
    if (sec > 0)
        sec = sec % 60;
    let hr = Math.floor(min / 60);
    if (min > 0)
        min = min % 60;
    let t = `${sec} sec`;
    if (min > 0) t = `${min} min ` + t;
    if (hr > 0) t = `${hr} hr ` + t;
    return t;
}

function timeTaken1() {
    let sec = Math.floor((time.end - time.start) / 1000);
    let min = Math.floor(sec / 60);
    if (sec > 0)
        sec = sec % 60;
    let hr = Math.floor(min / 60);
    if (min > 0)
        min = min % 60;
    let t = `${Math.floor(sec / 10)}${sec % 10} `;
    t = `${Math.floor(min / 10)}${min % 10}:` + t;
    t = `${Math.floor(hr / 10)}${hr % 10}:` + t;
    return t;
}

function endGame(result) {
    clearInterval(time.timeInter);
    const span = document.querySelector("#result span");
    span.innerText = `You ${result}`;
    document.querySelector("#board").style.zIndex = '-1';
    document.querySelector("#board").style.filter = 'blur(2px)';
    document.querySelector("#result").style.display = 'flex';
}

function release(row, col) {
    const tempBox = document.getElementById(`${alpha[row]}${Alpha[col]}`);
    tempBox.style.backgroundImage = `url("./images/${numbers[gameState[row][col]]}.png")`;
    tempBox.classList.remove('cover');
    gameState[row][col] = -1;
    if (countData.total == countData.bombs) {
        time.end = performance.now();
        document.querySelector("#result h6").innerText = timeTaken();
        endGame(`Won`);
    }
}

function releaseRecursion(i, j, x, y) {
    if (gameState[i][j] < 0 || gameState[i][j] > 8) return;
    countData.total--;
    if (gameState[i][j] != 0) {
        release(i, j);
        return;
    }
    release(i, j);

    if (i > 0) {
        if (j < x - 1) releaseRecursion(i - 1, j + 1, x, y);
        if (j > 0) releaseRecursion(i - 1, j - 1, x, y);
        releaseRecursion(i - 1, j, x, y);
    }
    if (i < y - 1) {
        if (j < x - 1) releaseRecursion(i + 1, j + 1, x, y);
        if (j > 0) releaseRecursion(i + 1, j - 1, x, y);
        releaseRecursion(i + 1, j, x, y);
    }
    if (j > 0) releaseRecursion(i, j - 1, x, y);
    if (j < x - 1) releaseRecursion(i, j + 1, x, y);
}

function startTime() {
    const timeP = document.querySelector("#time");
    timeP.style.display = 'block';

    time.timeInter = setInterval(() => {
        time.end = performance.now();
        timeP.innerText = timeTaken1();
    }, 1000);
}

function addEventsToBoard(x, y) {
    BOARD.addEventListener('click', (event) => {
        const id = event.target.id;
        if (id.length > 2) return;
        const row = id.charCodeAt(0) - 97;
        const col = id.charCodeAt(1) - 65;
        if (gameState.length == 0) {
            time.start = performance.now();
            createArray(x, y, row, col);
            calculate(x, y);
            releaseRecursion(row, col, x, y);
            startTime();
            return;
        }

        if (gameState[row][col] < 0 || gameState[row][col] > 9) return;

        if (gameState[row][col] == 9) {
            release(row, col)
            endGame("Lost");
            return;
        }

        releaseRecursion(row, col, x, y);
    });
    addEventsToResult();
}
function addEventsToResult() {
    document.querySelector("#restart").addEventListener('click', (event) => {
        location.reload();
    });
}

export {
    createBoard
}