import React, { useContext, useState } from 'react';
import { AppContext } from '../app.jsx';

const SearchComponent = () => {
  const globalContext = useContext(AppContext);

  const [numGifs, setNumGifs] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const getGifs = () => {
    const apiKey = '7Erj1LUTR77H1QvQeKYB8aAXambSNMyp';
    const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${numGifs}`;
    const gifs = fetch(apiUrl).then((response) => response.json());
    return gifs;
  };

  const handleSubmit = async (e) => {
    let gifArray = [];
    e.preventDefault();
    const gifs = await getGifs();
    gifs.data.forEach((gif) => {
      gifArray.push(gif.images.fixed_height.url);
    });
    globalContext.updateGifs(gifArray);
  };

  return (
    <form id="form" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="searchTerm">Search Term: </label><br/>
      <input
        onChange={(event) => setSearchTerm(event.target.value)}
        name="searchTerm"
        type="text"
        placeholder="Search Term"
        className="form-control"
      /><br/>
      <label htmlFor="numGif">Number of Gifs: </label><br/>
      <input
        onChange={(event) => setNumGifs(event.target.value)}
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
