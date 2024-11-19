import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../../src/Userlist.css";

import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Workflow() {
  const themeColor = useSelector((state) => state.themeColor.changeColor);
  const initialBoxes = [
    { id: "1", title: "Personal Details" },
    { id: "2", title: "Educational Details" },
    { id: "3", title: "Professional Details" },
    { id: "4", title: "Demo" },

  ];

  const documentsBox = { id: "5", title: "Documents Details" };

  const [boxes, setBoxes] = useState(initialBoxes);

useEffect(()=>{
async function fetchSequence(){
const response = await fetch(
  "http://localhost:8000/api/v1/Verifyit/sequencing/fetch"
);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

console.log("fetch sequence->>>", data.sequence.sequence);
const updatedItems = data.sequence.sequence;
setBoxes([
  { id: "1", title: updatedItems[0] },
  { id: "2", title: updatedItems[1] },
  { id: "3", title: updatedItems[2] },
  { id: "4", title: updatedItems[3] },
]);
}
fetchSequence();
},[])
// useEffect(() => {
//   updateApi();
// }, [initialBoxes]);
 async function updateApi() {
   console.log("the pattern", boxes, " and ", documentsBox);
   const sequence = [
     boxes[0].title,
     boxes[1].title,
     boxes[2].title,
     boxes[3].title,
     documentsBox.title,
   ];
   console.log("formdata ", sequence);
   try {
     const response = await fetch(
       "http://localhost:8000/api/v1/Verifyit/sequencing/update",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ sequence }),
       }
     );

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`);
     }

     const result = await response.json();
     console.log("Success:", result);
    toast.success("Sequence updated successfully!", {
      autoClose: 5000, // 5 seconds
    });
     return result;
   } catch (error) {
     console.error("Error:", error);
     toast.error("Failed to update sequence. Please try again.", {
       autoClose: 5000, 
     });
   }
 }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(boxes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the IDs after rearranging to maintain uniqueness
    const updatedItems = items.map((item, index) => ({
      ...item,
      id: (index + 1).toString(),
    }));

    setBoxes(updatedItems);
  };

  return (
    <>
      <h3 className="mb-4 title">Workflow Management</h3>
      <div className="cnt">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="d-flex flex-wrap"
              >
                {boxes.map((box, index) => (
                  <Draggable key={box.id} draggableId={box.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="box"
                      >
                        <h4>{box.title}</h4>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="d-flex flex-wrap mt-4">
          <div className="box">
            <h4>{documentsBox.title}</h4>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="primary" onClick={updateApi}>
            Save Sequence
          </Button>
        </div>
      </div>
    </>
  );
}

export default Workflow;
