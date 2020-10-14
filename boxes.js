const colCount = 4;
let rowCount = 0;

// Hint
const test = (el) => {
  console.log(el.id);
}

const myAddButton = document.querySelector("#js-add-row");
myAddButton.onclick = function () {
  addRow();
}

// THIS PART ISN'T WORKING / WRITTEN YET
const myRemoveButton = document.querySelectorAll("#js-remove-row");
console.log(myRemoveButton);
myRemoveButton.onclick = function(){
  removeRow();
  console.log("hello");
}

function buildRow(childCount) {
  rowCount++; 
  const newDiv = document.createElement("div");
  newDiv.classList.add("boxes");
  // remove button and row div
  const remButton = document.createElement("button");
  const remRow = document.createElement("div");
  remRow.classList.add("removerow", "text-right", "boxes--");
  remButton.classList.add("btn-outline-secondary", "btn");
  remButton.id = "js-remove-row";
  remButton.innerText = "x"; 
  remButton.type = "button";
  newDiv.insertAdjacentElement("afterbegin", remRow);
  remRow.appendChild(remButton);

  // Hint
  remButton.onclick = function () {
    test(this);
  };

  for (let i=0; i < childCount; i++) {
    const newCol = document.createElement("div"); 
    newCol.classList.add("boxes__box"); 
    const newSq = document.createElement("div");
    newSq.classList.add("square");
    newCol.appendChild(newSq);
    newDiv.appendChild(newCol);
  }
  return newDiv; 
}

function addRow() {
  const myParent = document.querySelector("#content");
  const myRow = buildRow(colCount); 
  myParent.insertAdjacentElement("afterbegin", myRow);
  
}

// THIS PART ISN'T WORKING / WRITTEN YET
function removeRow() {
  rowCount--;
  console.log(rowCount);
}