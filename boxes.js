let numCols = 0;

function getGifs(limit, query) {
  const apiKey = "7Erj1LUTR77H1QvQeKYB8aAXambSNMyp";
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${limit}&offset=${numCols}`;
  const gifs = fetch(apiUrl).then((response) => response.json());
  return gifs;
}

function buildRemoveButton() {
  const remButton = document.createElement("button");
  remButton.classList.add("btn-outline-secondary", "btn");
  remButton.innerText = "x";
  remButton.type = "button";
  remButton.dataset.remove = numCols;
  remButton.onclick = function () {
    document.querySelector(`[data-remove="${this.dataset.remove}"]`).remove();
  };
  return remButton;
}

function buildCol(gifUrl) {
  numCols++;
  const newCol = document.createElement("div");
  newCol.classList.add("boxes__box");
  newCol.dataset.remove = numCols;
  newCol.innerHTML = `
    <div class="square"><img class="img-fluid" src="${gifUrl}" /></div>
  `;
  newCol.appendChild(buildRemoveButton());
  return newCol;
}

async function buildRow(childCount, gifType) {
  let rowDiv;
  const existRow = document.querySelector(".boxes") != undefined;
  if (existRow){
    rowDiv = document.querySelector(".boxes"); 
    const gifs = await getGifs(childCount, gifType);
    gifs.data.forEach(function (gif) {
      const col = buildCol(gif.images.fixed_height.url);
      rowDiv.appendChild(col);
    });
  } else {
    rowDiv = document.createElement("div");
    rowDiv.classList.add("boxes");
    const gifs = await getGifs(childCount, gifType);
    gifs.data.forEach(function (gif) {
      const col = buildCol(gif.images.fixed_height.url);
      rowDiv.appendChild(col);
    });
  }
  return rowDiv;
}

const form = document.getElementById("form");
form.onsubmit = function (event) {
  event.preventDefault();
  const searchTerm = document.getElementById("search-term").value.trim();
  const numGifs = document.getElementById("num-gif").value;
  const formattedSearchTerm = searchTerm.replace(/ /g, "+");
  console.log(formattedSearchTerm);
  const myParent = document.querySelector("#content");
  buildRow(numGifs, formattedSearchTerm).then(function (res) {   
    myParent.prepend(res);
  })
};
