import Grid from './Grid';
import { Board as BoardType } from '../../../types/Board';
import { useState, useEffect, useCallback } from 'react';
import Move from './Move';
interface GameProps {
  boardOrig: BoardType;
}
const Game = ({ boardOrig }: GameProps) => {
  const [turn, setTurn] = useState(0);
  const [grid, setGrid] = useState<string[]>([]);
  const [activeCell, setActiveCell] = useState(-1);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      // Your function for the left arrow key
      onBack();
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === ' ') {
      // Your function for the left arrow key
      onNext();
    }
    if (event.key === 'r') {
      // Your function for the left arrow key
      resetTurn();
    }
    if (event.key === 'Enter') {
      // Your function for the left arrow key
      setTurnToEnd();
    }
  };

  useEffect(() => {
    // Add the event listener when the component is mounted
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Make sure the state updates happen only after initial render
    setGrid(boardOrig.grid); // Update grid on mount with the board data
    setTurn(0);
  }, [boardOrig.grid]);

  useEffect(() => {
    const newGrid = [];
    (boardOrig.grid).forEach((s: string) => {
      newGrid.push(s);
    });
    console.log((boardOrig.moves).length, turn)
    if (turn > (boardOrig.moves).length) {
      setTurn(0)
      return
    }
    for (let i = 0; i < turn; i++) {
      const move = boardOrig.moves[i]
      newGrid[move[0]] = move[1]
    }
    setGrid(newGrid)
    if (turn === 0) {
      setActiveCell(-1);
    } else {
      setActiveCell(boardOrig.moves[turn - 1][0]);
    }
  }, [turn])
  const onNext = useCallback(() => {
    setTurn((prev) => Math.min(prev + 1, boardOrig.moves.length));
  }, [boardOrig.date]);
  function onBack() {
    setTurn((prev) => Math.max(prev - 1, 0));
  }
  function resetTurn() {
    setTurn(0);
  }
  const setTurnToEnd = useCallback(() => {
    setTurn(boardOrig.moves.length);
  }, [boardOrig.date]);

  function turnSet(n: number) {
    setTurn(n);
  }
  const board = {
    equals: boardOrig.equals,
    crosses: boardOrig.crosses,
    grid: grid,
    activeCell: activeCell,
    date: boardOrig.date
  }
  return (
    <div className="flex flex-col  w-full md:grid md:grid-cols-10">
      <div className="col-span-1 bg-red-400 md:col-span-8">
        < Grid board={board} />
      </div>
      {/* <div className="col-span-1"></div> */}
      <div className="col-span-1 md:col-span-2 bg-blue-200 justify-center items-center">
        <div className="justify-center items-center">
          <h1 className="text-center flex-1">Turn: {turn}</h1>
          <ul className="overflow-auto md:h-[70vh] flex flex-col">
            <li key={0} className={0 === turn ? 'bg-slate-500 flex' : 'flex'}><button onClick={() => turnSet(0)}>Starting Position</button></li>
            {(boardOrig.moves).map((move, i) => (
              <Move move={move} turn={turn} key={i} index={i} turnSet={turnSet} />
            ))}
          </ul>
          <div className="flex justify-evenly">
            <button className="px-4 border border-[var(--contrast-color)] rounded-md hover:bg-stone-700" onClick={onBack}>Back</button>
            <button className="px-4 border border-[var(--contrast-color)] rounded-md hover:bg-stone-700" onClick={onNext}>Next</button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Game;
