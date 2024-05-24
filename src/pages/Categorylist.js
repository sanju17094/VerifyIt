// src/components/CategoryList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { red, green, black, white } from "../action/action";
import themes from "../themes";

function CategoryList() {
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.themeColor.changeColor);
console.log("the theme color",themeColor);

 


  return (
    <div>
      <button onClick={() => dispatch(green())}>Green</button>
      <button onClick={() => dispatch(red())}>Red</button>
      <button onClick={() => dispatch(black())}>Dark</button>
      <button onClick={() => dispatch(white())}>Light</button>
    </div>
  );
}

export default CategoryList;
