const drumButtons = document.querySelectorAll('.drum');

        function playDrum(drumDiv) {
            drumDiv.classList.add('active');
            const audio = new Audio(`/sounds/drum/${drumDiv.dataset.sound}.mp3`);
            audio.play();
            setTimeout(() => drumDiv.classList.remove('active'), 150);
        }

        drumButtons.forEach(btn => {
            btn.addEventListener('click', () => playDrum(btn));
        });

        const keyMap = {
            'a': 'kick', 's': 'snare', 'd': 'hihat', 'f': 'tom1',
            'g': 'tom2', 'h': 'crash', 'j': 'ride', 'k': 'floortom'
        };

        document.addEventListener('keydown', e => {
            const sound = keyMap[e.key.toLowerCase()];
            if (sound) {
                const drumDiv = [...drumButtons].find(d => d.dataset.sound === sound);
                if (drumDiv && !drumDiv.classList.contains('active')) playDrum(drumDiv);
            }
        });