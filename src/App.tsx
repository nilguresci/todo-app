/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import "./App.css";
import { useState } from "react";
import { Test } from "./models/Board";

// fake data generator
const getItems = (count: number, itemName: string) =>
  Array.from({ length: count }, (_v, k) => k).map((k) => ({
    id: `${itemName}-${k}`,
    content: `${itemName} ${k}`,
  }));

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const App = () => {
  const [data, setData] = useState<Test>({
    ahmet: getItems(10, "Ahmet"),
    nil: getItems(10, "Nil"),
    findik: getItems(10, "Fındık"),
    miuv: getItems(10, "Mi'uv"),
    pasa: getItems(10, "Paşa"),
  });

  // a little function to help us with reordering the result
  const reorder = (
    startIndex: number,
    endIndex: number,
    key: keyof typeof data
  ) => {
    const result = Array.from(data[key]);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    setData((d) => ({
      ...d,
      [key]: result,
    }));
  };

  const move = (
    sourceKey: keyof typeof data,
    destinationKey: keyof typeof data,
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) => {
    const sourceClone = Array.from(data[sourceKey]);
    const destClone = Array.from(data[destinationKey]);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    setData((d) => ({
      ...d,
      [sourceKey]: sourceClone,
      [destinationKey]: destClone,
    }));
  };

  const onDragEnd = (result: DropResult) => {
    console.log("DragEnd result", result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === result.destination.droppableId) {
      reorder(
        result.source.index,
        result.destination.index,
        result.source.droppableId as keyof typeof data
      );
    } else {
      move(
        result.source.droppableId as keyof typeof data,
        result.destination.droppableId as keyof typeof data,
        result.source,
        result.destination
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        {Object.keys(data).map((key: string) => (
          <Droppable droppableId={key}>
            {(
              provided: DroppableProvided,
              snapshot: DroppableStateSnapshot
            ) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {data[key as keyof typeof data].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={provided.innerRef}
                        id={item.id}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
