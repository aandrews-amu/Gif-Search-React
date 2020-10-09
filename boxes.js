// ------------- QUERY SELECTORS ---------------
// QUERY SELECTORS ARE THE BETTER WAY TO SELECT ELEMENTS
// YOU NEED TO INCLUDE "." FOR CLASS and "#" FOR ID IN THE SELECTION

// GET FIRST INSTANCE OF CLASS SQUARE
// var square = document.querySelector(".square");
// console.log(square);

// GET ALL INSTANCES OF CLASS SQUARE (in a NodeList)
// var squares = document.querySelectorAll(".square");
// console.log(squares);

// PARENT CHILD SELECTORS 
// var squareAsChild = document.querySelectorAll(".boxes__box .square");
// console.log(squareAsChild); 

// ------------- GET ELEMENT SELECTORS --------------- 
// THE FOLLOWING ARE OLDER FUNCTIONS USED BEFORE QUERY SELECTORS CAME ABOUT
// THEY ARE DIFFICULT TO USE ACCORDING TO WES
// YOU DONT PUT ".class" or "#id" JUST PASS "class" or "id"

// .getElementByClassName("class") 
// .getElementByTagName("tag") 
// .getElementById("id")

// ------------- ADD AND REMOVE CLASSES ----------------
// var firstGif = document.querySelector(".gifs__gif .img-fluid"); 
// console.log(firstGif);
// firstGif.classList.add('test');
// firstGif.classList.remove('test');

// TOGGLE CLASS WITH EVENT LISTENER
// function toggleRound() {
//   firstGif.classList.toggle('round');
// }
// firstGif.addEventListener('click', toggleRound);

// -------- EVENT LISTEN ON MULTIPLE ITEMS --------------
// MUST USE FOR EACH LOOP
// var squares = document.querySelectorAll(".square");
// squares.forEach(function(square) {
//   square.classList.add('round')
// });


//------------- REFACTOR OF WHAT WE WERE WORKING ON ----------------
// var el = document.querySelectorAll(".square");

// el.forEach(sq => {
//   sq.addEventListener('click', function() {
//     sq.style.height = "100px";
//   })
// })
