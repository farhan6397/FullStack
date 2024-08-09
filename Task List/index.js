document.addEventListener("DOMContentLoaded", () => {
    // Load saved notes from localStorage
    loadNotes();
});

const addNoteButton = document.getElementById("addButton");

addNoteButton.addEventListener("click", () => {
    const noteInput = document.getElementById("note");
    const noteText = noteInput.value.trim();

    if (noteText !== "") {
        addNoteToDOM(noteText);
        saveNoteToLocalStorage(noteText);
        noteInput.value = "";
    } else {
        alert("Please enter a note.");
    }
});

function addNoteToDOM(noteText) {
    // Get the containerDiv to append new note
    const containerDiv = document.querySelector(".components");

    // Create a new div for the note
    const newNoteDiv = document.createElement("div");
    newNoteDiv.classList.add("head");

    // Create the serial number div
    const serialNumberDiv = document.createElement("div");
    serialNumberDiv.classList.add("sn");

    // Create the note item div
    const itemDivContent = document.createElement("div");
    itemDivContent.classList.add("item");
    itemDivContent.textContent = noteText;

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("sn2");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => {
        newNoteDiv.remove();
        removeNoteFromLocalStorage(noteText);
        updateSerialNumbers();
    });

    // Append serial number, note item, and delete button to the new note div
    newNoteDiv.appendChild(serialNumberDiv);
    newNoteDiv.appendChild(itemDivContent);
    newNoteDiv.appendChild(deleteButton);

    // Append the new note div to the containerDiv
    containerDiv.appendChild(newNoteDiv);

    // Update the serial numbers
    updateSerialNumbers();
}

function updateSerialNumbers() {
    const notes = document.querySelectorAll(".components .head");
    notes.forEach((note, index) => {
        note.querySelector(".sn").textContent = index + 1;
    });
}

function saveNoteToLocalStorage(noteText) {
    let notes = localStorage.getItem("notes");
    notes = notes ? JSON.parse(notes) : [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function removeNoteFromLocalStorage(noteText) {
    let notes = localStorage.getItem("notes");
    if (notes) {
        notes = JSON.parse(notes);
        notes = notes.filter(note => note !== noteText);
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}

function loadNotes() {
    let notes = localStorage.getItem("notes");
    if (notes) {
        notes = JSON.parse(notes);
        notes.forEach(noteText => {
            addNoteToDOM(noteText);
        });
    }
}
