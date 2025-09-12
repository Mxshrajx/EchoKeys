const keyMap = {
    'a': 'C',
    's': 'D',
    'd': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'A',
    'j': 'B'
};

// Play sound
function playSound(note) {
    const audio = new Audio(`/sounds/flutes/${note}.mp3`);
    audio.play();
}


// Click event
document.querySelectorAll('.note').forEach(noteEl => {
    noteEl.addEventListener('click', () => {
        const note = noteEl.dataset.sound;
        playSound(note);
    });
});

// Keyboard event
document.addEventListener('keydown', e => {
    const note = keyMap[e.key.toLowerCase()];
    if (note) {
        playSound(note);
        const el = document.querySelector(`.note[data-sound="${note}"]`);
        if (el) {
            el.style.transform = 'scale(1.2)';
            setTimeout(() => el.style.transform = 'scale(1)', 150);
        }
    }
});