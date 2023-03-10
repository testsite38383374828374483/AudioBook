async function setUrl(audio) {
      const audioUrl = audio.src;
      const dataURI = await loadAudio(audioUrl);
      playAudio(dataURI, audio);
};

async function loadAudio(url) {
  // Fetch the MP3 file as an ArrayBuffer
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  // Convert the ArrayBuffer to a base64-encoded data URI
  const base64 = btoa(
    new Uint8Array(arrayBuffer)
      .reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
  const dataURI = 'data:audio/mp3;base64,' + base64;

  // Return the data URI
  return dataURI;
}

// Function to play an audio file
function playAudio(dataURI, audio) {
  // Create an audio element with the data URI as its source
  audio.src = dataURI;
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