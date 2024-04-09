document.addEventListener("DOMContentLoaded", function () {
    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let playerXScore = 0;
    let playerOScore = 0;
    let gamesPlayed = 0;
    let isGameOver = false;

    function makeMove(cellIndex, player) {
        if (board[cellIndex] === "" && !isGameOver) {
            board[cellIndex] = player;
            renderBoard();
            if (checkWin(player)) {
                document.getElementById("status").innerText = `Jogador ${player} venceu!`;
                updateScore(player);
                isGameOver = true;
            } else if (checkDraw()) {
                document.getElementById("status").innerText = "Empate!";
                isGameOver = true;
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                if (currentPlayer === "O") {
                    setTimeout(makeComputerMove, 500); // Atraso para simular a tomada de decisão do computador
                }
                document.getElementById("status").innerText = `Vez do jogador ${currentPlayer}`;
            }
        }
    }

    function makeComputerMove() {
        if (currentPlayer === "O" && !isGameOver) {
            let bestScore = -Infinity;
            let move;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    let score = minimax(board, 0, false);
                    board[i] = "";
                    if (score > bestScore) {
                        bestScore = score;
                        move = i;
                    }
                }
            }
            makeMove(move, "O");
        }
    }

    function minimax(board, depth, isMaximizing) {
        let result = checkWinner();
        if (result !== null) {
            return result;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function renderBoard() {
        const cells = document.querySelectorAll(".cell");
        for (let i = 0; i < board.length; i++) {
            cells[i].innerText = board[i];
        }
    }

    function resetGame() {
        currentPlayer = "X";
        board = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
        document.getElementById("status").innerText = "Vez do jogador X";
        isGameOver = false;
    }

    function handleClick(event) {
        const cellIndex = parseInt(event.target.dataset.index);
        makeMove(cellIndex, currentPlayer);
    }

    function checkWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return board[a] === "X" ? -1 : 1;
            }
        }

        if (!board.includes("")) {
            return 0;
        }

        return null;
    }

    function checkWin(player) {
        return checkWinner() === (player === "X" ? -1 : 1);
    }

    function checkDraw() {
        return checkWinner() === 0;
    }

    function updateScore(winner) {
        if (winner === "X") {
            playerXScore++;
        } else {
            playerOScore++;
        }
        gamesPlayed++;
        document.getElementById("score").innerText = `Jogador X: ${playerXScore} - Jogador O: ${playerOScore} - Partidas jogadas: ${gamesPlayed}`;
    }

    renderBoard();
    document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleClick));
    document.getElementById("reset-button").addEventListener("click", resetGame);
});











