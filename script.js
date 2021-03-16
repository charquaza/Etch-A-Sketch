"use strict";

function addCells(number) {
    var grid = document.querySelector("div.container");
    for (let i = 0; i < number; i++) {
        let newDiv = document.createElement("div");
        newDiv.addEventListener("mouseover", changeColorOnHover);
        grid.appendChild(newDiv);
    }
    gridSize += number;
}

function removeCells(number) {
    var grid = document.querySelector("div.container");
    for (let i = 0; i < number; i++) {
        grid.removeChild(grid.lastChild);
    }
    gridSize -= number;
}

function changeColorOnHover(hoverEvent) {
    var currStyle = hoverEvent.target.style.cssText;
    console.log(parseFloat(currStyle.slice(31)));
    var currOpacity = currStyle ? parseFloat(currStyle.slice(31)) :
        0;
    console.log(currOpacity);
    if (currOpacity < 1) {
        hoverEvent.target.style.cssText = `background-color: rgb(0, 0, 0, ${currOpacity + 0.1})`;
        console.log(hoverEvent.target.style.cssText);
    }
}

function resetGrid() {
    var userInput = prompt("How large should the grid be?", "16");
    var dimensions = Number.isNaN(parseInt(userInput, 10)) ? 16 :
        (parseInt(userInput, 10) > 100) ? 100 : parseInt(userInput, 10);
    
    changeGridSize(dimensions**2);
}

function changeGridSize(newSize) {
    var grid = document.querySelector("div.container");

    if (newSize === gridSize) {
        var gridCells = document.querySelectorAll("div.container > div");
        for (let i = 0; i < gridCells.length; i++) {
            gridCells[i].style.cssText = "background-color: white;";
        }
    } else if (newSize > gridSize) {
        var gridCells = document.querySelectorAll("div.container > div");
        for (let i = 0; i < gridCells.length; i++) {
            gridCells[i].style.cssText = "background-color: white;";
        }
        addCells(newSize - gridSize);
        grid.style.cssText = `grid-template-columns: repeat(${Math.sqrt(newSize)}, 1fr); grid-template-rows: repeat(${Math.sqrt(newSize)}, 1fr)`;
    } else {
        removeCells(gridSize - newSize);
        grid.style.cssText = `grid-template-columns: repeat(${Math.sqrt(newSize)}, 1fr); grid-template-rows: repeat(${Math.sqrt(newSize)}, 1fr)`;
        var gridCells = document.querySelectorAll("div.container > div");
        for (let i = 0; i < gridCells.length; i++) {
            gridCells[i].style.cssText = "background-color: white;";
        }
    }
}

let clearBtn = document.querySelector("div.controls > button");
clearBtn.addEventListener("click", resetGrid);

let gridSize = 0;
addCells(16**2);
