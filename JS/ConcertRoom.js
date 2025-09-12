let currentInstrument = null;
    let discoTimeout = null;
    const concertMain = document.getElementById('concertMain');

    const pianoDiv = document.getElementById('piano');
    const guitarDiv = document.getElementById('guitar');
    const drumDiv = document.getElementById('drumKit');
    const fluteDiv = document.getElementById('flute');

    const instruments = { piano: pianoDiv, guitar: guitarDiv, drum: drumDiv, flute: fluteDiv };

    function hideAll() {
      Object.values(instruments).forEach(inst => inst.style.display = 'none');
      currentInstrument = null;
    }

    function startDisco() {
      concertMain.classList.add('disco');
      if (discoTimeout) clearTimeout(discoTimeout);
      discoTimeout = setTimeout(() => concertMain.classList.remove('disco'), 1000);
    }

    document.querySelectorAll('.instrument-buttons button').forEach(btn => {
      btn.addEventListener('click', () => {
        hideAll();
        const inst = btn.dataset.instrument;
        instruments[inst].style.display = inst === 'guitar' ? 'flex' : 'flex';
        currentInstrument = inst;
      });
    });

    // Piano
    const pianoKeys = [...pianoDiv.querySelectorAll('.white, .black')];
    const pianoKeyMap = { "a":"C3","w":"Csharp3","s":"D3","e":"Dsharp3","d":"E3","f":"F3","t":"Fsharp3","g":"G3","y":"Gsharp3","h":"A3","u":"Asharp3","j":"B3" };

    function playPiano(note, el) {
      if(currentInstrument!=='piano') return;
      el.classList.add('active');
      const audio = new Audio(`/sounds/piano/${note}.mp3`);
      audio.play();
      startDisco();
      audio.onended = () => el.classList.remove('active');
    }

    pianoKeys.forEach(k => {
      k.addEventListener('mousedown', () => playPiano(k.dataset.note, k));
    });

    document.addEventListener('keydown', e => {
      if(currentInstrument!=='piano') return;
      const note = pianoKeyMap[e.key.toLowerCase()];
      if(note){
        const k = pianoKeys.find(k=>k.dataset.note===note);
        if(k && !k.classList.contains('active')) playPiano(note,k);
      }
    });

    // Guitar
    const strings = document.querySelectorAll('.string');
    const guitarKeys = {'q':'E','w':'A','e':'D','r':'G','t':'B','y':'e1'};
    function playString(s){
      if(currentInstrument!=='guitar') return;
      s.classList.add('active');
      const audio = new Audio(`/sounds/guitar/${s.dataset.sound}.mp3`);
      audio.play();
      startDisco();
      setTimeout(()=>s.classList.remove('active'),250);
    }
    strings.forEach(s=>s.addEventListener('click',()=>playString(s)));
    document.addEventListener('keydown',e=>{
      if(currentInstrument!=='guitar') return;
      const n=guitarKeys[e.key.toLowerCase()];
      if(n){const s=[...strings].find(x=>x.dataset.sound===n); if(s&&!s.classList.contains('active')) playString(s);}
    });

    // Drum
    const drumButtons=document.querySelectorAll('.drum');
    const drumKeys={'a':'kick','s':'snare','d':'hihat','f':'tom1','g':'tom2','h':'crash','j':'ride','k':'floortom'};
    function playDrum(d){ 
      if(currentInstrument!=='drum') return;
      d.classList.add('active'); 
      const audio=new Audio(`/sounds/drum/${d.dataset.sound}.mp3`); 
      audio.play(); 
      startDisco();
      setTimeout(()=>d.classList.remove('active'),150); 
    }
    drumButtons.forEach(d=>d.addEventListener('click',()=>playDrum(d)));
    document.addEventListener('keydown',e=>{
      if(currentInstrument!=='drum') return;
      const s=drumKeys[e.key.toLowerCase()]; 
      if(s){const d=[...drumButtons].find(d=>d.dataset.sound===s); if(d&&!d.classList.contains('active')) playDrum(d);}
    });

    // Flute
    const fluteKeys={'a':'C','s':'D','d':'E','f':'F','g':'G','h':'A','j':'B'};
    const fluteNotes=document.querySelectorAll('.note');
    function playFlute(n){ 
      if(currentInstrument!=='flute') return;
      const audio=new Audio(`/sounds/flutes/${n}.mp3`);
      audio.play();
      startDisco();
    }
    fluteNotes.forEach(n=>n.addEventListener('click',()=>playFlute(n.dataset.sound)));
    document.addEventListener('keydown',e=>{
      if(currentInstrument!=='flute') return;
      const n=fluteKeys[e.key.toLowerCase()]; 
      if(n){
        playFlute(n); 
        const el=[...fluteNotes].find(x=>x.dataset.sound===n); 
        if(el){el.style.transform='scale(1.2)'; setTimeout(()=>el.style.transform='scale(1)',150);}
      }
    });