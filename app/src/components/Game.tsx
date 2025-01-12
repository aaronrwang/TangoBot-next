import Grid from './Grid';
import { Board as BoardType } from '../../../types/Board';
import { useState } from 'react';
interface GameProps {
  boardOrig: BoardType;
}
const Game = ({ boardOrig }: GameProps) => {
  const [turn, setTurn] = useState(0);
  function onNext() {
    setTurn((prev) => Math.min(prev + 1, 36)); // Assume 36 turns well change eventually
  }
  function onBack() {
    setTurn((prev) => Math.max(prev - 1, 0));
  }
  function turnSet(n: number) {
    setTurn(n);
  }
  const moves = Array.from({ length: 36 }, (_, index) => index + 1);
  const board = { ...boardOrig, grid: boardOrig.grid.flat() }
  return (
    <div className="grid grid-cols-10 w-full">
      <div className="col-span-8">
        < Grid board={board} />
      </div>
      {/* <div className="col-span-1"></div> */}
      <div className="col-span-2">
        <h1 className="text-center">Turn: {turn}</h1>
        <ul className="overflow-auto h-[80vh]">
          {moves.map((move) => (
            <li key={move} className={move === turn ? 'bg-slate-500' : ''}><button onClick={() => turnSet(move)}>Turn:{move}</button></li>
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
