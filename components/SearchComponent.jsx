import React, { useState } from 'react';

const SearchComponent = () => {
  const [gifs, setGifs] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setGifs((prevGifs) => ({
      ...prevGifs,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(gifs, '', 2));
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <label htmlFor="searchTerm">Search Term: </label><br/>
      <input
        value={gifs.searchTerm || ''}
        onChange={handleChange}
        name="searchTerm"
        type="text"
        placeholder="Search Term"
        className="form-control"
      /><br/>
      <label htmlFor="numGif">Number of Gifs: </label><br/>
      <input
        value={gifs.numGif || ''}
        onChange={handleChange}
        type="text"
        name="numGif"
        placeholder = "0"
        className="form-control"
      /><br/>
      <input type="submit" className="form-control"/>
    </form>
  );
};

export default SearchComponent;
