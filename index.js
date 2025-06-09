let box = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let qus = [];
let ans = [];
let errorcount = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num ||
            board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
            return false;
        }
    }
    return true;
}

function solveSudoku(board) {
    console.log("hello World");
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generateRandom9x9() {
    console.log("Hello Game")
    let numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let i = 0; i < 9; i++) {
        box[Math.floor(i / 3) * 3 + Math.floor(i / 3)][(i % 3) * 3 + (i % 3)] = numbers[i];
    }
    solveSudoku(box);

    let numZeros = Math.floor(Math.random() * 30) + 20;
    while (numZeros > 0) {
        let r = Math.floor(Math.random() * 9);
        let c = Math.floor(Math.random() * 9);
        if (box[r][c] !== 0) {
            box[r][c] = 0;
            numZeros--;
        }
    }
    qus = JSON.parse(JSON.stringify(box));
}

function setGame() {
    generateRandom9x9();

    const boxContainer = document.getElementById('box');
    boxContainer.innerHTML = '';

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const tile = document.createElement('div');
            tile.id = r.toString() + "-" + c.toString();
            if (qus[r][c] !== 0) {
                tile.innerText = qus[r][c];
            } else {
                const input = document.createElement('input');
                input.classList.add('input');
                input.type = 'text';
                input.maxLength = 1;
                input.addEventListener('input', function() {
                    const value = parseInt(input.value);
                    if (isValid(box, r, c, value)) {
                        input.classList.remove('invalid');
                        input.classList.add('valid');
                    } else {
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                        alert(value + " is already there ");
                    }
                });
                input.addEventListener('keypress', function(event) {
                    if (!/^[1-9]$/.test(event.key)) {
                        event.preventDefault();
                    }
                });
                tile.appendChild(input);
            }
            tile.classList.add('tile');
            boxContainer.appendChild(tile);
        }
    }
}

document.getElementById('reset').addEventListener('click', function() {
    box = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    setGame();
});

document.getElementById('solve').addEventListener('click', function() {
    solveSudoku(box);
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const tile = document.getElementById(r.toString() + "-" + c.toString());
            if (qus[r][c] === 0) {
                tile.innerText = box[r][c];
            }
        }
    }
});

document.getElementById('clear').addEventListener('click', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
});

setGame();

