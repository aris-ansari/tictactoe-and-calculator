import { useState } from "react";

function TicTacToe2() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerChance, setPlayerChance] = useState("X");
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(null);

  function handleMove(index) {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = playerChance;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
    } else {
      setPlayerChance(playerChance === "X" ? "O" : "X");
    }

    const checkGameOver = newBoard.every((element) => element !== null);
    if (checkGameOver && newWinner === null) {
      setGameOver(true);
    }
  }

  function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  return (
    <div>
      <div className="grid grid-cols-3 w-[144px] border-collapse">
        {board.map((value, index) => (
          <button
            key={index}
            onClick={() => handleMove(index)}
            className="w-12 h-12 border text-xl"
          >
            {value}
          </button>
        ))}
      </div>
      {winner && <div>{playerChance} Wins!</div>}
      {gameOver && <div>Game Over! refresh the page to restart</div>}
    </div>
  );
}

export default TicTacToe2;
