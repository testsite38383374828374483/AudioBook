// модуль для работы с аудиоплеером
const playerModule = (function() {
  const audio = document.querySelector('audio');
  const playButton = document.querySelector('.play-button');
  let playing = false;
  let currentTime;

  function playAudio() {
    document.querySelector('audio').play();
    playing = true;
    playButton.classList.add('playing');
  }

  function pauseAudio() {
    document.querySelector('audio').pause();
    playing = false;
    playButton.classList.remove('playing');
  }

  function toggleAudio() {
    if (playing) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  return {
    playAudio,
    pauseAudio,
    toggleAudio
  }
})();

// модуль для работы со списком глав
const chaptersModule = (function() {
  const chapters = document.querySelectorAll('.chapters li a');

  function scrollToChapter(chapterIndex) {
    const chapterElement = chapters[chapterIndex];
    const chapterOffsetTop = chapterElement.offsetTop - 100;
    window.scrollTo({ top: chapterOffsetTop, behavior: 'smooth' });
  }

  function highlightCurrentChapter() {
    const audioCurrentTime = Math.floor(document.querySelector('audio').currentTime);
    for (let i = 0; i < chapters.length; i++) {
      const chapterStartTime = parseInt(chapters[i].getAttribute('data-start-time'));
      const chapterEndTime = parseInt(chapters[i].getAttribute('data-end-time'));
      if (audioCurrentTime >= chapterStartTime && audioCurrentTime < chapterEndTime) {
        chapters[i].classList.add('active');
      } else {
        chapters[i].classList.remove('active');
      }
    }
    document.querySelector('.progress').style = 'width: '+ String(Math.floor(document.querySelector('audio').currentTime / document.querySelector('audio').duration * 100)) + '%';
  }

  function bindChapterEvents() {
    for (let i = 0; i < chapters.length; i++) {
      const chapterStartTime = parseInt(chapters[i].getAttribute('data-start-time'));
      chapters[i].addEventListener('click', function() {
        document.querySelector('audio').currentTime = chapterStartTime;
        playerModule.playAudio();
        scrollToChapter(i);
      });
    }
  }

  return {
    highlightCurrentChapter,
    bindChapterEvents
  }
})();

// инициализация плеера и списка глав
function init() {
  document.querySelector('audio').addEventListener('timeupdate', chaptersModule.highlightCurrentChapter);
  chaptersModule.bindChapterEvents();
  document.querySelector('.play-button').addEventListener('click', playerModule.toggleAudio);
}

init();