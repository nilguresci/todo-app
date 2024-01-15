import "./App.css";

import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import Task from "./components/Task/Task";
import Board from "./components/Board/Board";
import { useState } from "react";

const App = () => {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const taskMarkup = <Task id="task">Drag me</Task>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over!.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? taskMarkup : null}
      <div className="container">
        {containers.map((id) => (
          <Board key={id} id={id}>
            {parent === id ? taskMarkup : "Drop here"}
          </Board>
        ))}
      </div>
    </DndContext>
  );
};

export default App;
