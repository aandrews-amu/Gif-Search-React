// No longer needed colCount after refactoring

// const colCount = 4;

let rowCount = 0;

// Moved these vars to getGifs, since the rest of the script does
// not need to use these vars, prob best to keep them scoped
// to the function that does.

// const q = "harry+potter";
// const api_key = "7Erj1LUTR77H1QvQeKYB8aAXambSNMyp";

// See below, we can eliminate offset by
// calculating it based on rowCount in getGifs

// let offset = 0;

// GET GIFS
// function getGifPromise(gifType) {
//   var apiURL = `http://api.giphy.com/v1/gifs/search?q=${gifType}&api_key=${api_key}&limit=${colCount}&offset=${offset}`;
//   return fetch(apiURL).then(response => {
//     return response.json();
//   }).then(json => {
//     return json.data;
//   })
// }

// Refactored this slightly to accept 'query' and 'limit'
// as a parameters to make it a little more flexible. 
function getGifs(limit, query) {
  const apiKey = '7Erj1LUTR77H1QvQeKYB8aAXambSNMyp';
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${limit}&offset=${rowCount * limit}`;

  const gifs = fetch(apiUrl)
  .then(response => response.json());

  return gifs;
}

// BUILD ROW
// function buildRow(childCount, gifType) {
  // rowCount++; 
  // const newDiv = document.createElement("div");
  // newDiv.classList.add("boxes");
  // newDiv.dataset.remove = rowCount;

  // remove button and row div
  // const remButton = document.createElement("button");
  // const remRow = document.createElement("div");
  // remRow.classList.add("boxes__remove", "text-right");
  // remButton.classList.add("btn-outline-secondary", "btn");
  // remButton.id = "js-remove-row";
  // remButton.innerText = "x"; 
  // remButton.type = "button";
  // remButton.dataset.remove = rowCount;
  // newDiv.insertAdjacentElement("afterbegin", remRow);
  // remRow.appendChild(remButton);

  // EVENT LISTENER FOR REMOVE BUTTON
  // remButton.onclick = function () {
  //   const toRemove = this.dataset.remove;
  //   const removeList = document.querySelectorAll(`[data-remove="${toRemove}"]`);
  //   removeList.forEach(function(elt) {
  //     elt.remove();
  //   })
  // };

  
//   for (let i=0; i < childCount; i++) {
//     const newCol = document.createElement("div"); 
//     newCol.classList.add("boxes__box"); 
//     const newSq = document.createElement("div");
//     newSq.classList.add("square");
//     newCol.appendChild(newSq);
//     newDiv.appendChild(newCol);

//     getGifPromise(q).then(data => {
//       const myGif = data[i].images.fixed_height.url;
//       const newGif = document.createElement("img");
//       newGif.classList.add("img-fluid");
//       newGif.src = myGif; 
//       newSq.appendChild(newGif);
//     })
//     offset += colCount;
//   }
//   return newDiv; 
// }

function buildRemoveButton() {
  const remButton = document.createElement("button");
  remButton.classList.add("btn-outline-secondary", "btn");
  remButton.id = "js-remove-row";
  remButton.innerText = "x"; 
  remButton.type = "button";
  remButton.dataset.remove = rowCount;

  remButton.onclick = function () {
    // Cleaned this up a little to make it a one-liner

    // const toRemove = this.dataset.remove;
    // const removeList = document.querySelector(`[data-remove="${toRemove}"]`);
    // removeList.remove();
    // removeList.forEach(function(elt) {
    //   elt.remove();
    // })

    document.querySelector(`[data-remove="${this.dataset.remove}"]`).remove();
  };

  return remButton;
}

function buildCol(gifUrl) {
  const newCol = document.createElement("div"); 
  newCol.classList.add("boxes__box");

  // Refactored this to show you another way
  // of building elements like this. Sometimes
  // when I'm building a complex element with a lot
  // of children, I like to go this route to save
  // all of the foo.bar()

  // const newSq = document.createElement("div");
  // newSq.classList.add("square");

  // const newGif = document.createElement("img");
  // newGif.classList.add("img-fluid");
  // newGif.src = gifUrl;

  // newSq.appendChild(newGif);
  // newCol.appendChild(newSq);

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

  // Using await here b/c we want to make sure
  // the api call has completed before continuing
  const gifs = await getGifs(childCount, gifType);

  gifs.data.forEach(function(gif) {
    const col = buildCol(gif.images.fixed_height.url);
    newDiv.appendChild(col);
  });

  return newDiv;
}

// ADD ROW
// function addRow() {
//   const myParent = document.querySelector("#content");
//   const myRow = buildRow(colCount, "harry+potter"); 
//   myParent.insertAdjacentElement("afterbegin", myRow);
// }

// Refactored this to work with new buildRow().

// Please have another look at async functions,
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// but in a nut shell, buildRow() returns a promise
// once the promise is resolved, we can access the
// function's return value in res.

// Also, please notice the use of prepend(),
// this is just the opposite of appendChild(),
// so we can keep our rows above the add button.
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