/* eslint-disable @typescript-eslint/no-explicit-any */
import { Draggable } from "react-beautiful-dnd";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import Task from "../Task/Task";
import style from "./board.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Board = (props: any) => {
  const getListStyle = (isDraggingOver: any) => ({
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
        <h4>Testing</h4>
        <div className={style.boardHeaderRight}>
          <div>1</div>
          <div className={style.boardMenu}>
            <FaEllipsisV />
          </div>
        </div>
      </div>
      <div className={style.boardListContainer}>
        {props.data.map(
          (item: { id: string; content: string }, index: number) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <Task
                  provided={provided}
                  id={item.id}
                  snapshot={snapshot}
                  content={item.content}
                />
              )}
            </Draggable>
          )
        )}
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
