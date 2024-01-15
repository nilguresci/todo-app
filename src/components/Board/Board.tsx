import { useDroppable } from "@dnd-kit/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Board = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Board;
