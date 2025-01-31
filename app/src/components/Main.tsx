'use client';

import { Board as BoardType } from '../../../types/Board';
import Game from './Game';
import { useRef, useState } from 'react';

interface MainProps {
  boards: BoardType[];
}

const Main = ({ boards }: MainProps) => {
  // Ensure boards are sorted without mutating the original array
  const sortedBoards = [...boards].sort((a, b) => b.date.localeCompare(a.date));

  // Set the initial board state to the first sorted board
  const [board, setBoard] = useState<BoardType | null>(sortedBoards[0] || null);
  const hardmoves = board?.moves.map(move => Number(move[2][0]));
  const difficultyCount = hardmoves?.reduce<number>((acc, num) => acc + num, 0);
  let difficulty = ''
  if (difficultyCount != undefined) {
    if (difficultyCount >= 65) {
      difficulty = 'Hard'
    } else if (difficultyCount >= 50) {
      difficulty = 'Medium'
    } else {
      difficulty = 'Easy'
    }
  }
  console.log(difficulty + ': ' + difficultyCount)

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
    <div className="w-screen h-screen md:px-8 md:py-4">
      <div className="flex w-full gap-4 my-4 mx-2 md:mx-8">
        <label className="md:text-2xl" htmlFor="date-select">
          Select Date:
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
        <label className={`md:text-2xl ${difficulty === "Hard" ? "text-red-500" : difficulty === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
          {difficulty}
        </label>
      </div>
      {board ? <Game boardOrig={board} /> : <div>Loading...</div>}
    </div>
  );
};

export default Main;