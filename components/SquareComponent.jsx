import React, { useState } from "react";

const SquareComponent = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const [boxes, setBoxes] = useState(arr);

  const handleRemove = (box) => {
    // The key was creating a new array,
    // instead of using the existing boxes array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const temp = [...boxes];
    temp.splice(box, 1);
    setBoxes(temp);
  };

  return (
    <div className="boxes">
      {boxes.map((box, index) => (
        <div className="boxes__box" key={box}>
          <button
            className="btn-outline secondary btn"
            onClick={() => handleRemove(index)}
            key={box}
          >
            {" "}
            x{" "}
          </button>
          <div className="square"> {box} </div>
        </div>
      ))}
    </div>
  );
};

export default SquareComponent;
