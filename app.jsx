import React from 'react';
import SquareComponent from './components/SquareComponent.jsx';

const App = () => (
    <div className="page-container">
      <div className="page">
        <div className="page__content">
          <SquareComponent/>
        </div>
        <div className="page__sidebar">
          <form id="form">
            <label for="search-term">Search Term: </label><br/>
            <input type="text" id="search-term" name="search-term" className="form-control"/><br/>
            <label for="num-gif">Number of Gifs: </label><br/>
            <input type="text" id="num-gif" name="num-gif" className="form-control"/><br/>
            <input type="submit" value="Send Request" className="form-control"/>
          </form>
        </div>
      </div>
    </div>
  );

export default App;

// hooks
// one componet that has state and a button that updates a state value and rendering that value