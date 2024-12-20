import { useState } from "react";

function TicTacToe() {
  const [playerOne, setPlayerOne] = useState("");
  const [playerTwo, setPlayerTwo] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [playerChance, setPlayerChance] = useState("X");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  function start() {
    if (playerOne && playerTwo) {
      setIsStarted(true);
    }
  }

  function handleMove(index) {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = playerChance;
    setBoard(newBoard);

    const gameOver = newBoard.every((element) => element !== null);
    const newWinner = calculateWinner(newBoard);

    if (gameOver && newWinner === null) {
      setGameOver(true);
    }

    if (newWinner) {
      setWinner(newWinner);
    } else {
      setPlayerChance(playerChance === "X" ? "O" : "X");
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

  function resetGame() {
    setBoard(Array(9).fill(null));
    setPlayerChance("X");
    setWinner(null);
    setIsStarted(false);
    setPlayerOne("");
    setPlayerTwo("");
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setPlayerChance("X");
    setWinner(null);
    setIsStarted(true);
  }

  return (
    <div className="text-center p-4">
      <h1 className="text-4xl font-bold mb-8">Tic Tac Toe</h1>
      {!isStarted && (
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="Player 1"
            className="w-[300px] border p-2 my-1 text-xl rounded-md"
            value={playerOne}
            onChange={(e) => setPlayerOne(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2"
            className="w-[300px] border p-2 my-1 text-xl rounded-md"
            value={playerTwo}
            onChange={(e) => setPlayerTwo(e.target.value)}
          />
          <button
            onClick={start}
            className="bg-black text-white py-1 px-12 rounded-sm text-xl mt-4 border hover:bg-transparent hover:text-black hover:border-black"
          >
            Start
          </button>
        </div>
      )}
      {isStarted && (
        <div>
          <div>
            <span
              className={`w-3 h-3 inline-block bg-green-500 rounded-full mr-2 ${
                playerChance === "X" ? "opacity-100" : "opacity-0"
              }`}
            ></span>
            <span className="inline-block min-w-[220px] text-left">
              <span className="text-2xl">{playerOne}</span>
              <span className="text-2xl"> - </span>
              <span className="text-2xl">X</span>
            </span>
          </div>
          <div>
            <span
              className={`w-3 h-3 inline-block bg-green-500 rounded-full mr-2 ${
                playerChance === "O" ? "opacity-100" : "opacity-0"
              }`}
            ></span>
            <span className="inline-block min-w-[220px] text-left">
              <span className="text-2xl">{playerTwo}</span>
              <span className="text-2xl"> - </span>
              <span className="text-2xl">O</span>
            </span>
          </div>
          <div className="grid grid-cols-3 w-[240px] border mx-auto mt-8">
            {board.map((value, index) => (
              <button
                key={index}
                className="w-20 h-20 text-2xl border"
                onClick={() => handleMove(index)}
              >
                {value}
              </button>
            ))}
          </div>
          {winner && (
            <div className="mt-4">
              <h2 className="text-2xl">
                {winner === "X" ? playerOne : playerTwo} wins!
              </h2>
              <button
                onClick={resetGame}
                className="bg-black text-white py-1 px-12 rounded-sm text-xl mt-4 border hover:bg-transparent hover:text-black hover:border-black"
              >
                Reset
              </button>
              <button
                onClick={restartGame}
                className="bg-black text-white py-1 px-12 rounded-sm text-xl mt-4 border hover:bg-transparent hover:text-black hover:border-black"
              >
                Restart
              </button>
            </div>
          )}
          {gameOver && (
            <div className="mt-4">
              <h2 className="text-2xl">Game Over!</h2>
              <button
                onClick={resetGame}
                className="bg-black text-white py-1 px-12 rounded-sm text-xl mt-4 border hover:bg-transparent hover:text-black hover:border-black"
              >
                Reset
              </button>
              <button
                onClick={restartGame}
                className="bg-black text-white py-1 px-12 rounded-sm text-xl mt-4 border hover:bg-transparent hover:text-black hover:border-black"
              >
                Restart
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
