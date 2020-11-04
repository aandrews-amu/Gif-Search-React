import React from 'react';
import SearchComponent from './components/SearchComponent.jsx';
import SquareComponent from './components/SquareComponent.jsx';

const App = () => (
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
  );

export default App;

// hooks
// one componet that has state and a button that updates a state value and rendering that value
// context api