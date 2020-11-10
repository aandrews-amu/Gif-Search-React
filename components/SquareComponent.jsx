import React, { useContext } from "react";
import { AppContext } from '../app.jsx';

const SquareComponent = () => {
  const globalContext = useContext(AppContext);

  const handleRemove = (box) => {
    const temp = [...globalContext.gifs];
    temp.splice(box, 1);
    globalContext.updateGifs(temp);
  };

  return (
    <div className="boxes">
      {globalContext.gifs.map((box, index) => (
        <div className="boxes__box" key={index}>
          <button
            className="btn-outline-secondary btn"
            onClick={() => handleRemove(index)}
            key={index}
          >
            {' '}
            x{' '}
          </button>
          <div className="square"> {index}
            <img className="img-fluid" src={ box } />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SquareComponent;
