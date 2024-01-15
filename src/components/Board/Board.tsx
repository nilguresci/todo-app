/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDroppable } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";
import { useState } from "react";

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

  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items: any) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div ref={setNodeRef} style={style}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((id: any) => (
            <Task key={id} id={id}>
              {" "}
              Selamlar Ben {id}{" "}
            </Task>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Board;
