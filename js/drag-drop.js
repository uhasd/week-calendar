const hoveredClass = "table-info";
const cells = document.querySelectorAll("[data-id]");

let parentElem;
let elem;

for (let cell of cells) {
    cell.addEventListener("dragstart", dragStart);
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("dragenter", dragEnter)
    cell.addEventListener("dragleave", dragLeave)
    cell.addEventListener("drop", drop);
}

function dragStart(e) {
    parentElem = e.target.parentElement;
    elem = e.target;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add(hoveredClass);
}

function dragLeave(e) {
    e.preventDefault();
    this.classList.remove(hoveredClass);
}

function drop(e) {
    const parentID = parentElem.getAttribute("data-id");
    const targetID = e.target.getAttribute("data-id")
    
    if (parentID == targetID || !targetID) return;
    
    const moved = moveEvent(parentID, targetID);
    this.classList.remove(hoveredClass);
    if (moved.error) return;

    parentElem.classList.remove(eventClass);
    this.classList.add(eventClass);
    this.append(elem)
}
