const colCount = 4;

const myAddButton = document.querySelector("#js-add-row");
myAddButton.onclick = function () {
  addRow(1);
}

const myRemoveButton = document.querySelector("#js-remove-row");
myRemoveButton.addEventListener('click', function (event) {
  const numRow = document.querySelectorAll("boxes").length;
  console.log("rows: " + numRow);
  if (numRow === 0) {
    window.alert("No rows available to delete.");
  }
  removeRow();
}) 



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
  const numRows = document.querySelectorAll(".boxes").length;
  if (numRows > 0) {
    const firstRow = document.querySelector(".boxes");
    firstRow.remove();
  }
}
