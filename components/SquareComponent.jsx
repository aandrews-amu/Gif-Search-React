import React from 'react';

const SquareComponent = () => {
  const arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className="boxes">
     {arr.map(() => (
        <div className="boxes__box">
          <div className="square"> </div>
        </div>
     ))}
    </div>
    );
};

export default SquareComponent;
