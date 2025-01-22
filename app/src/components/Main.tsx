'use client';

import { Board as BoardType } from '../../../types/Board';
import Game from './Game';
import { useRef, useState, useEffect } from 'react';

interface MainProps {
  boards: BoardType[];
}

const Main = ({ boards }: MainProps) => {
  // Ensure boards are sorted without mutating the original array
  const sortedBoards = [...boards].sort((a, b) => b.date.localeCompare(a.date));

  // Set the initial board state to the first sorted board
  const [board, setBoard] = useState<BoardType | null>(sortedBoards[0] || null);

  const dateRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = () => {
    if (dateRef.current) {
      const date = dateRef.current.value;
      const selectedBoard = sortedBoards.find((board) => board.date === date);
      if (selectedBoard) {
        setBoard(selectedBoard);
      }
    }
  };

  // Return early if no boards are provided
  if (sortedBoards.length === 0) {
    return <div>No boards available</div>;
  }

  const dates = sortedBoards.map((board) => board.date);

  return (
    <div className="w-screen h-screen px-8 py-4">
      <div className="flex w-full gap-4 my-4 mx-8">
        <label className="align-middle" htmlFor="date-select">
          Select a Date:
        </label>
        <select id="date-select" name="dates" ref={dateRef} defaultValue={dates[0]}>
          {dates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
        <button
          className="border border-[var(--contrast-color)] rounded-md p-1 hover:bg-stone-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {board ? <Game boardOrig={board} /> : <div>Loading...</div>}
    </div>
  );
};

export default Main;