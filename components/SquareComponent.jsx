import React, { useState } from 'react';

const SquareComponent = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  const [boxes, setBoxes] = useState(arr);

  // so when i go to remove one, do i just remove it from the array...? and how?
  const handleRemove = (box) => {
    console.log(boxes);
    const newBoxes = boxes;
    newBoxes.splice(box - 1, 1);
    setBoxes(newBoxes);
    console.log(boxes);
  };

  return (
    <div className="boxes">
     {boxes.map((box) => (
        <div className="boxes__box" key={box}>
          <button className="btn-outline secondary btn" onClick={() => handleRemove(box)} key={box}> x </button>
          <div className="square"> {box} </div>
        </div>
     ))}
    </div>
  );
};

export default SquareComponent;
