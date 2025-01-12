'use client'

import { Board as BoardType } from '../../../types/Board';
import Game from './Game';
import { useRef, useState } from 'react';
interface MainProps {
  boards: BoardType[];
}

const Main = ({ boards }: MainProps) => {
  boards.sort
  boards.sort((a, b) => b.date.localeCompare(a.date));
  if (boards) {
    const [board, setBoard] = useState<BoardType>(boards[0]);
    const dateRef = useRef<HTMLSelectElement>(null);
    function handleSubmit() {
      if (dateRef.current) {
        const date = dateRef.current.value
        const index = boards.findIndex(board => board.date === date);
        setBoard(boards[index])
      }
    }
    const dates = boards.map((board) => board.date);
    return (
      <div className="w-screen h-screen px-8 py-4 ">
        <div className="flex w-fill gap-4 my-4 mx-8">
          <label className="align-middle" htmlFor="date-select">Select a Date:</label>
          <select id="date-select" name="dates" ref={dateRef}>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <button className="border border-[var(--contrast-color)] rounded-md p-1 hover:bg-stone-700" onClick={handleSubmit}>Submit</button>
        </div>
        <Game boardOrig={board} />
      </div>);
  }
  return <div>Hello</div>
}

export default Main;