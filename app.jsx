import React, { useState } from 'react';
import SearchComponent from './components/SearchComponent.jsx';
import SquareComponent from './components/SquareComponent.jsx';

// TODO
// - weird array thing
// - gifs overflowing
// - removing by index
// - import dependency cycles?

const AppContext = React.createContext({
  gifs: [],
  updateGifs: () => {},
});

const App = () => {
  const [gifs, setGifs] = useState([]);

  const updateGifs = (incomingGifs) => {
    setGifs(incomingGifs);
    console.log(gifs);
  };

  return (
    <AppContext.Provider value={{ gifs, updateGifs }}>
      <div className="page-container">
        <div className="page">
          <div className="page__content">
            <SquareComponent/>
          </div>
          <div className="page__sidebar">
            <SearchComponent/>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
};

export { App, AppContext };
