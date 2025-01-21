import Moon from '../svg/Moon';
import Sun from '../svg/Sun';
import Empty from '../svg/Empty';
import Cross from '../svg/Cross';
import Equal from '../svg/Equal';
import './Cell.css';

const Cell = (props: { icon: string, down: string, right: string, active: boolean }) => {
  // Some bug with tailwind idk why
  // const cellDown = "h-16 w-16 flex items-center justify-center absolute z-1 opacity-100 translate-y-8";
  // const cellRight = "h-16 w-16 flex items-center justify-center absolute z-1 opacity-100 translate-x-8";
  // const cell = "border border-[var(--contrast-color)] h-16 w-16 flex items-center justify-center relative z-0";
  // const cellContent = "h-16 w-16 flex items-center justify-center absolute z-2";
  return (
    <div className={props.active ? "cell bg-[var(--highlight-color)]" : "cell"}>
      <div className="cell-content">
        {props.icon === "S" && <Sun />}
        {props.icon === "M" && <Moon />}
        {props.icon === "E" && <Empty />}
      </div>
      {props.down === "equals" && <div className="cell-down">
        <Equal />
      </div>}
      {props.down === "crosses" && <div className="cell-down">
        <Cross />
      </div>}
      {props.right === "equals" && <div className="cell-right">
        <Equal />
      </div>}
      {props.right === "crosses" && <div className="cell-right">
        <Cross />
      </div>}

    </div>
  );
}

export default Cell;