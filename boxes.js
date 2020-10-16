let rowCount = 0;

function getGifs(limit, query) {
  const apiKey = '7Erj1LUTR77H1QvQeKYB8aAXambSNMyp';
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${limit}&offset=${rowCount * limit}`;

  const gifs = fetch(apiUrl)
  .then(response => response.json());

  return gifs;
}

function buildRemoveButton() {
  const remButton = document.createElement("button");
  remButton.classList.add("btn-outline-secondary", "btn");
  remButton.id = "js-remove-row";
  remButton.innerText = "x"; 
  remButton.type = "button";
  remButton.dataset.remove = rowCount;

  remButton.onclick = function () {
    document.querySelector(`[data-remove="${this.dataset.remove}"]`).remove();
  };

  return remButton;
}

function buildCol(gifUrl) {
  const newCol = document.createElement("div"); 
  newCol.classList.add("boxes__box");

  newCol.innerHTML = `
    <div class="square"><img class="img-fluid" src="${gifUrl}" /></div>
  `;

  return newCol;
}

async function buildRow(childCount, gifType) {
  rowCount++;

  const newDiv = document.createElement("div");
  newDiv.classList.add("boxes");
  newDiv.dataset.remove = rowCount;

  const remRow = document.createElement("div");
  remRow.classList.add("boxes__remove", "text-right");

  const remButton = buildRemoveButton();
  remRow.appendChild(remButton);

  newDiv.appendChild(remRow);

  const gifs = await getGifs(childCount, gifType);

  gifs.data.forEach(function(gif) {
    const col = buildCol(gif.images.fixed_height.url);
    newDiv.appendChild(col);
  });

  return newDiv;
}

function addRow() {
  const myParent = document.querySelector("#content");
  buildRow(4, 'harry+potter').then(function(res) {
    myParent.prepend(res);
  });
}

// EVENT LISTENER FOR ADD ROW
const myAddButton = document.querySelector("#js-add-row");
myAddButton.onclick = function () {
  addRow();
}


