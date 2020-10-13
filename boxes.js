const colCount = 4;

const myAddButton = document.querySelector(".myaddbutton");
myAddButton.onclick = function () {
  console.log("CLICKED");
  addRow(1);
}

const myRemoveButton = document.querySelector(".myrmbutton");
myRemoveButton.onclick = function () {
  removeRow();
}

function buildRow(childCount) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("boxes");
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

function addRow(rowCount) {
  const myParent = document.querySelector("#content");
  for (let i=0; i < rowCount; i++) {
    const myRow = buildRow(colCount); 
    myParent.insertAdjacentElement("afterbegin", myRow);
  }
}

function removeRow() {
  const myParent = document.querySelector("#content");
  const numRows = document.querySelectorAll(".boxes").length;
  console.log(numRows);
  if (numRows > 0) {
    const firstRow = document.querySelector(".boxes");
    firstRow.remove();
  }
}
