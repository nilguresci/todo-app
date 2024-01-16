import { FaArrowUp } from "react-icons/fa";
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from "react-beautiful-dnd";
import style from "./task.module.scss";
import { Task as TaskType } from "../../models/Task";
type Props = {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  task: TaskType;
};

const Task = (props: Props) => {
  const grid = 6;
  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ) => ({
    // some basic styles to make the items look a bit nicer
    // userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "#f4f5f5" : "#ffffff",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <div
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      style={getItemStyle(
        props.snapshot.isDragging,
        props.provided.draggableProps.style
      )}
      className={style.taskContainer}
    >
      <div className={style.taskContent}>{props.task.title}</div>
      <div className={style.taskId}>{props.task.id}</div>
      <div className={style.arrow}>
        <FaArrowUp color="#d5d6d6" />
      </div>
    </div>
  );
};

export default Task;
