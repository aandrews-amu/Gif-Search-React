import React from 'react';
import SearchComponent from './components/SearchComponent.jsx';
import SquareComponent from './components/SquareComponent.jsx';

const App = () => {
  //const [gifs, setGifs] = useState({});

  return (
    <div className="page-container">
      <div className="page">
        <div className="page__content">
          <SquareComponent /*numGif={gifs.numGif}*//>
        </div>
        <div className="page__sidebar">
          <SearchComponent /*gifs={gifs}*/ />
        </div>
      </div>
    </div>
  )
};

export default App;

// hooks
// one componet that has state and a button that updates a state value and rendering that value
// context api