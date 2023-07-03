import {useLocalStorageState} from '../utils';

function Board({squares, handleSelect}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => handleSelect(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    Array(9).fill(null),
  ]);
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:step', 0);
  let currentSquares = history[currentStep];

  if (!currentSquares) {
    restart();
    return;
  }

  let nextValue = calculateNextValue(currentSquares);
  let winner = calculateWinner(currentSquares);
  let status = calculateStatus(winner, currentSquares, nextValue);

  function handleSelect(square) {
    if (winner || currentSquares[square]) return;
    if (currentStep + 1 < history.length) {
      setHistory(prev => prev.slice(0, currentStep + 1));
    }

    setCurrentStep(prev => prev + 1);
    setHistory(prev => {
      let newHistory = [...prev];
      let newSquares = [...newHistory.at(-1)];
      newSquares[square] = nextValue;
      newHistory.push(newSquares);
      return newHistory;
    });
  }

  function restart() {
    setHistory([Array(9).fill(null)]);
    setCurrentStep(0);
  }
  function handleHistoryChange(index) {
    setCurrentStep(index);
  }

  const moves = history.map((squares, index) => {
    let isFirst = 0 === index;
    let isCurrent = currentStep === index;
    return (
      <li key={index}>
        <button disabled={isCurrent} onClick={() => handleHistoryChange(index)}>
          {isFirst ? `Go to game start` : `Go to move #${index}`}
          {isCurrent ? ' (current)' : ''}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} handleSelect={handleSelect} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
