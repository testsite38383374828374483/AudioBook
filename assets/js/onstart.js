async function setUrl(audio) {
      const audioUrl = audio.src;
      const dataURI = await loadAudio(audioUrl);
      playAudio(dataURI, audio);
};

async function loadAudio(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  const base64 = btoa(
    new Uint8Array(arrayBuffer)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  const dataURI = 'data:audio/mp3;base64,' + base64;
  return dataURI;
}

function playAudio(dataURI, audio) {
  audio.src = dataURI;
  audio.classList.remove('making');
}

window.onload = function() {
    let all_audios = document.querySelectorAll('audio');
    for (let all in all_audios){
        var audio = all_audios[all];
        try{
            audio.classList.add('making');
            setUrl(audio);
        }catch{
        }
    }
}