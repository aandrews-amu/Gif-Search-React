const colCount = 4;
let rowCount = 0;
const q = "harry+potter";
const api_key = "7Erj1LUTR77H1QvQeKYB8aAXambSNMyp";
let offset = 0;

// GET GIFS
function getGifPromise(gifType) {
  var apiURL = `http://api.giphy.com/v1/gifs/search?q=${gifType}&api_key=${api_key}&limit=${colCount}&offset=${offset}`;
  return fetch(apiURL).then(response => {
    return response.json();
  }).then(json => {
    return json.data;
  })
}


// BUILD ROW
function buildRow(childCount, gifType) {
  rowCount++; 
  const newDiv = document.createElement("div");
  newDiv.classList.add("boxes");
  newDiv.dataset.remove = rowCount;

  // remove button and row div
  const remButton = document.createElement("button");
  const remRow = document.createElement("div");
  remRow.classList.add("boxes__remove", "text-right");
  remButton.classList.add("btn-outline-secondary", "btn");
  remButton.id = "js-remove-row";
  remButton.innerText = "x"; 
  remButton.type = "button";
  remButton.dataset.remove = rowCount;
  newDiv.insertAdjacentElement("afterbegin", remRow);
  remRow.appendChild(remButton);

  // EVENT LISTENER FOR REMOVE BUTTON
  remButton.onclick = function () {
    const toRemove = this.dataset.remove;
    const removeList = document.querySelectorAll(`[data-remove="${toRemove}"]`);
    removeList.forEach(function(elt) {
      elt.remove();
    })
  };

  
  for (let i=0; i < childCount; i++) {
    const newCol = document.createElement("div"); 
    newCol.classList.add("boxes__box"); 
    const newSq = document.createElement("div");
    newSq.classList.add("square");
    newCol.appendChild(newSq);
    newDiv.appendChild(newCol);

    getGifPromise(q).then(data => {
      const myGif = data[i].images.fixed_height.url;
      const newGif = document.createElement("img");
      newGif.classList.add("img-fluid");
      newGif.src = myGif; 
      newSq.appendChild(newGif);
    })
    offset += colCount;
  }
  return newDiv; 
}

// ADD ROW
function addRow() {
  const myParent = document.querySelector("#content");
  const myRow = buildRow(colCount, "harry+potter"); 
  myParent.insertAdjacentElement("afterbegin", myRow);
}

// EVENT LISTENER FOR ADD ROW
const myAddButton = document.querySelector("#js-add-row");
myAddButton.onclick = function () {
  addRow();
}