import { useDroppable } from "@dnd-kit/core";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Board = (props: any) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style: React.CSSProperties = {
    color: isOver ? "green" : undefined,
    backgroundColor: isOver ? "yellow" : undefined,
    border: "1px solid",
    padding: "50px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
};

export default Board;
