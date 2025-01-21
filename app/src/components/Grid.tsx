import Cell from './Cell';
import { BoardGrid as BoardType } from '../../../types/Board';
interface GridProps {
  board: BoardType;
}
const Grid = ({ board }: GridProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl my-8 font-extrabold">Tango Solver: {board.date}</h1>
      <div className="grid grid-cols-6 grid-rows-6 aspect-square relative">
        {Array.from({ length: 36 }, (_, i: number) => {
          let downcrosses = false;
          if ((board.crosses[i]).length > 0) {
            downcrosses = board.crosses[i].map((d) => (d === i + 6)).reduce((a, b) => a || b, false)
          }
          let downequals = false;
          if ((board.equals[i]).length > 0) {
            downequals = board.equals[i].map((d) => (d === i + 6)).reduce((a, b) => a || b, false)
          }
          let rightcrosses = false;
          if ((board.crosses[i]).length > 0) {
            rightcrosses = board.crosses[i].map((d) => (d === i + 1)).reduce((a, b) => a || b, false)
          }
          let rightequals = false;
          if ((board.equals[i]).length > 0) {
            rightequals = board.equals[i].map((d) => (d === i + 1)).reduce((a, b) => a || b, false)
          }
          return (
            <Cell
              key={i}
              icon={board.grid[i]}
              down={downcrosses ? "crosses" : downequals ? "equals" : ""}
              right={rightcrosses ? "crosses" : rightequals ? "equals" : ""}
              active={board.activeCell === i}
            />
          )
        }
        )}
      </div>
    </div>

  )
}

export default Grid;