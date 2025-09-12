const piano = document.getElementById("piano");

const whiteNotes = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
const blackNotes = [
    { note: "Csharp3", position: 0.65 },
    { note: "Dsharp3", position: 1.65 },
    { note: "Fsharp3", position: 3.65 },
    { note: "Gsharp3", position: 4.65 },
    { note: "Asharp3", position: 5.65 },
    { note: "Csharp4", position: 7.65 },
    { note: "Dsharp4", position: 8.65 },
    { note: "Fsharp4", position: 10.65 },
    { note: "Gsharp4", position: 11.65 },
    { note: "Asharp4", position: 12.65 }
];

whiteNotes.forEach((note) => {
    const key = document.createElement("div");
    key.classList.add("white");
    key.dataset.note = note;
    piano.appendChild(key);
});

blackNotes.forEach((b) => {
    const key = document.createElement("div");
    key.classList.add("black");
    key.dataset.note = b.note;
    key.style.left = `calc(${(b.position / 15) * 100}% - 15px)`;
    piano.appendChild(key);
});

function playSound(note, keyDiv) {
    const audio = new Audio(`/sounds/${note}.mp3`);
    keyDiv.classList.add("active");
    audio.play();
    audio.onended = () => keyDiv.classList.remove("active");
}

piano.addEventListener("mousedown", e => {
    if (e.target.dataset.note) {
        playSound(e.target.dataset.note, e.target);
    }
});

const keyMap = {
    "a": "C3", "w": "Csharp3", "s": "D3", "e": "Dsharp3", "d": "E3",
    "f": "F3", "t": "Fsharp3", "g": "G3", "y": "Gsharp3", "h": "A3", "u": "Asharp3", "j": "B3",
    "k": "C4", "o": "Csharp4", "l": "D4", "p": "Dsharp4", ";": "E4",
    "'": "F4", "]": "Fsharp4", "\\": "G4", "1": "Gsharp4", "2": "A4", "3": "Asharp4", "Enter": "B4",
    "Shift": "C5"
};

document.addEventListener("keydown", e => {
    const note = keyMap[e.key.toLowerCase()];
    if (note) {
        const keyDiv = [...document.querySelectorAll("[data-note]")].find(k => k.dataset.note === note);
        if (keyDiv && !keyDiv.classList.contains("active")) {
            playSound(note, keyDiv);
        }
    }
});

document.addEventListener("keyup", e => {
    const note = keyMap[e.key.toLowerCase()];
    if (note) {
        const keyDiv = [...document.querySelectorAll("[data-note]")].find(k => k.dataset.note === note);
        if (keyDiv) keyDiv.classList.remove("active");
    }
});