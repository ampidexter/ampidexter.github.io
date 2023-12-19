"use strict";

let userMove = true;
let gameOver = false;

function checkFull() {
    let cells = document.querySelectorAll(".cell");
    for (let cell of cells){
        if (cell.textContent == ""){
            return false;
        }
    }
    return true;
}

function proccessClick(eventObj){
    let cell = eventObj.target;
    if (gameOver) {
        alert("Игра завершена!")
        return;
    }
    if (cell.textContent != ""){
        alert("Ячейка занята")
        return;
    }
    cell.textContent = userMove ? "X" : "O";
    userMove = !userMove;
    if(checkFull()){
        alert("Доступных ходов не осталось");
        gameOver = true;
    }
}

function initBoard(){
    let boardElement = document.getElementById("board");
    for(let i=0; i<9; i++){
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.onclick = proccessClick;
        boardElement.append(cell);
    }
    return boardElement;
}

window.onload = initBoard;


