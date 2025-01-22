type MoveType = [number, string, string];
interface GameProps {
  move: MoveType;
  index: number;
  turn: number;
  turnSet: Function;
}
export default function Move({ move, index, turn, turnSet }: GameProps) {
  let reasoning = ''
  const rc = move[2]
  if (rc == '1.1') {
    reasoning = 'cross sign'
  } else if (rc == '1.1') {
    reasoning = 'equal sign'
  } else if (rc == '2.1.1') {
    reasoning = 'Already 3 Moons in row'
  } else if (rc == '2.1.2') {
    reasoning = 'Already 3 Moons in col'
  } else if (rc == '2.2.1') {
    reasoning = 'Already 3 Suns in row'
  } else if (rc == '2.2.2') {
    reasoning = 'Already 3 Suns in col'
  } else if (rc[0] == '3') {
    reasoning = 'Neighbors are both '
    if (move[1] === 'S') {
      reasoning += 'Moon'
    } else {
      reasoning += 'Sun'
    }
  } else if (rc == '4.1') {
    reasoning = 'Isolate row and solve'
  } else if (rc == '4.2') {
    reasoning = 'Isolate col and solve'
  }

  let liClass = 'justify-center border border-[var(--contrast-color)] rounded m-2'
  if (index + 1 === turn) {
    liClass += 'flex bg-slate-500'
  } else {
    liClass += 'hidden md:flex'
  }
  return (
    <li className={index + 1 === turn ? 'bg-slate-500 flex justify-center border border-[var(--contrast-color)] rounded m-2' : 'hidden md:flex justify-center border border-[var(--contrast-color)] rounded m-2'}>
      <button onClick={() => turnSet(index + 1)} className="flex flex-col justify-center items-center">
        <p>Turn {index + 1}:({Math.floor(move[0] / 6)},{move[0] % 6})</p>
        <p>{move[1] === 'S' ? 'Sun' : 'Moon'}</p>
        <p>{reasoning}</p>
      </button>
    </li>
  );


}