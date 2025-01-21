import Grid from './Grid';
import { Board as BoardType } from '../../../types/Board';
import { useState, useEffect } from 'react';
interface GameProps {
  boardOrig: BoardType;
}
const Game = ({ boardOrig }: GameProps) => {
  const [turn, setTurn] = useState(0);
  const [grid, setGrid] = useState(boardOrig.grid);
  const [activeCell, setActiveCell] = useState(-1);

  useEffect(() => {
    const newGrid = [];
    (boardOrig.grid).forEach((s: string) => {
      newGrid.push(s);
    });
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
  }, [turn, boardOrig.date])

  useEffect(() => {
    setTurn(0);
  }, [boardOrig.date])
  function onNext() {
    setTurn((prev) => Math.min(prev + 1, (boardOrig.moves).length));
  }
  function onBack() {
    setTurn((prev) => Math.max(prev - 1, 0));
  }
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
    <div className="grid grid-cols-10 w-full">
      <div className="col-span-8">
        < Grid board={board} />
      </div>
      {/* <div className="col-span-1"></div> */}
      <div className="col-span-2">
        <h1 className="text-center">Turn: {turn}</h1>
        <ul className="overflow-auto h-[80vh]">
          <li key={0} className={0 === turn ? 'bg-slate-500' : ''}><button onClick={() => turnSet(0)}>Turn 0: Starting Position</button></li>
          {(boardOrig.moves).map((move, i) => (
            <li key={i + 1} className={i + 1 === turn ? 'bg-slate-500' : ''}><button onClick={() => turnSet(i)}>Turn {i + 1}:{move}</button></li>
          ))}
        </ul>
        <div className="flex justify-evenly">
          <button className="px-4 border border-[var(--contrast-color)] rounded-md hover:bg-stone-700" onClick={onBack}>Back</button>
          <button className="px-4 border border-[var(--contrast-color)] rounded-md hover:bg-stone-700" onClick={onNext}>Next</button>
        </div>
      </div>
    </div>

  )
}

export default Game;
