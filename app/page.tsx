import mongoose from 'mongoose';
import Board from '../pages/api/board';
import { Board as BoardType, BoardMongo } from '../types/Board';
import Main from './src/components/Main';

export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';

async function fetchBoards(): Promise<BoardType[]> {
  // Ensure the MongoDB connection is established
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI as string);
  }

  const boards = await Board.find({}).lean() as unknown as BoardMongo[];
  return boards.map((board) => ({
    grid: board.grid,
    crosses: board.crosses,
    equals: board.equals,
    moves: board.moves,
    date: board.date,
    _id: board._id.toString(),
  }));
}

export default async function BoardsPage() {
  const boards = await fetchBoards();
  return (
    <Main boards={boards} />
  );
}