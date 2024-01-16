import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import Task from "../Task/Task";
import style from "./board.module.scss";
import { Board as BoardType } from "../../models/Board";

type Props = {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
  data: BoardType;
};

const Board = (props: Props) => {
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "#ffebe5" : "#ecf0f5",
    padding: 8,
    width: 250,
  });

  return (
    <div
      {...props.provided.droppableProps}
      ref={props.provided.innerRef}
      style={getListStyle(props.snapshot.isDraggingOver)}
      className={style.boardContainer}
    >
      <div className={style.boardHeader}>
        <h4>{props.data.title}</h4>
        <div className={style.boardHeaderRight}>
          <div>1</div>
          <div className={style.boardMenu}>
            <FaEllipsisV />
          </div>
        </div>
      </div>
      <div className={style.boardListContainer}>
        {props.data.tasks?.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided, snapshot) => (
              <Task provided={provided} task={task} snapshot={snapshot} />
            )}
          </Draggable>
        ))}
        {props.provided.placeholder}
      </div>
      <div className={style.addCardContainer}>
        <button className={style.addCardBtn}>
          <FaPlus size={12} /> &nbsp; Add card
        </button>
      </div>
    </div>
  );
};

export default Board;
