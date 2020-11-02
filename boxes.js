let numCols = 0;

const getGifs = (limit, query) => {
  const apiKey = '7Erj1LUTR77H1QvQeKYB8aAXambSNMyp';
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${limit}&offset=${numCols}`;
  const gifs = fetch(apiUrl).then((response) => response.json());
  return gifs;
};

const buildRemoveButton = () => {
  const removeButton = document.createElement('button');
  removeButton.classList.add('btn-outline-secondary', 'btn');
  removeButton.innerText = 'x';
  removeButton.type = 'button';
  removeButton.dataset.remove = numCols;
  // eslint-disable-next-line func-names
  removeButton.onclick = function () {
    document.querySelector(`[data-remove="${this.dataset.remove}"]`).remove();
  };
  return removeButton;
};

const buildCol = (gifUrl) => {
  // eslint-disable-next-line no-plusplus
  numCols++;
  const column = document.createElement('div');
  column.classList.add('boxes__box');
  column.dataset.remove = numCols;
  column.appendChild(buildRemoveButton());
  column.insertAdjacentHTML('beforeend', `<div class="square"><img class="img-fluid" src="${gifUrl}" /></div>`);
  return column;
};

const buildRow = async (childCount, gifType) => {
  let row;
  const existRow = document.querySelector('.boxes') !== undefined;
  if (existRow) {
    row = document.querySelector('.boxes');
    const gifs = await getGifs(childCount, gifType);
    gifs.data.forEach((gif) => {
      const col = buildCol(gif.images.fixed_height.url);
      row.appendChild(col);
    });
  } else {
    row = document.createElement('div');
    row.classList.add('boxes');
    const gifs = await getGifs(childCount, gifType);
    gifs.data.forEach((gif) => {
      const col = buildCol(gif.images.fixed_height.url);
      row.appendChild(col);
    });
  }
  return row;
};

const form = document.getElementById('form');
form.onsubmit = (event) => {
  event.preventDefault();
  const searchTerm = document.getElementById('search-term').value.trim();
  const numGifs = document.getElementById('num-gif').value;
  const formattedSearchTerm = searchTerm.replace(/ /g, '+');
  const parent = document.querySelector('#content');
  buildRow(numGifs, formattedSearchTerm).then((res) => {
    parent.prepend(res);
  });
};
