import React, { useState } from 'react';

const SearchComponent = () => {
  const [numGifs, setNumGifs] = useState(0);

  // handle the num of squares
  // also not working yet
  const handleSubmit = (e) => {
    e.preventDefault();
    // const newNumGifs = parseInt(document.getElementById('num-gif').value);
    // setNumGifs(newNumGifs);
    console.log(numGifs);
  };


  return (
    <form id="form" onSubmit={handleSubmit}>
      <label htmlFor="search-term">Search Term: </label><br/>
      <input type="text" id="search-term" name="search-term" className="form-control"/><br/>
      <label htmlFor="num-gif">Number of Gifs: </label><br/>
      <input type="text" id="num-gif" name="num-gif" className="form-control"/><br/>
      <input type="submit" value="Send Request" className="form-control"/>
    </form>
  );
};

export default SearchComponent;
