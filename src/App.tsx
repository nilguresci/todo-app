import "./App.css";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Task from "./components/Task/Task";
import Board from "./components/Board/Board";
import { useState } from "react";

const App = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Task>Drag me</Task>;

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Board>{isDropped ? draggableMarkup : "Drop here"}</Board>
    </DndContext>
  );
};

export default App;
