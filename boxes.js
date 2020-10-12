const colCount = 4;

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
    myParent.appendChild(myRow);
  }
}

addRow(3);
