const strings = document.querySelectorAll('.string');

    function playString(stringDiv) {
      stringDiv.classList.add('active');
      const audio = new Audio(`/sounds/guitar/${stringDiv.dataset.sound}.mp3`);
      audio.play();
      setTimeout(() => stringDiv.classList.remove('active'), 250);
    }

    // Mouse click
    strings.forEach(str => {
      str.addEventListener('click', () => playString(str));
    });

    // Keyboard mapping
    const keyMap = { 'q': 'E', 'w': 'A', 'e': 'D', 'r': 'G', 't': 'B', 'y': 'e1' };

    document.addEventListener('keydown', e => {
      const sound = keyMap[e.key.toLowerCase()];
      if (sound) {
        const stringDiv = [...strings].find(s => s.dataset.sound === sound);
        if (stringDiv && !stringDiv.classList.contains('active')) playString(stringDiv);
      }
    });