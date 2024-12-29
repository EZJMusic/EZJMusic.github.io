
document.addEventListener('DOMContentLoaded', function() {
  const audioSource = document.getElementById('audioSource');
  const playPauseButton = document.querySelector('.play-pause-button');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const timeBar = document.querySelector('.time-bar');
  const currentTimeElement = document.querySelector('.current-time');
  const durationTimeElement = document.querySelector('.duration-time');

  let isPlaying = false;
  let currentTimestamp = 0;
  let lastPausedTimestamp = 0;
  let currentPlayingOverlay = null;
  let lastPlayingNumber = null;

  const audioFiles = {
      528958: 'https://music.yiddish24.com:5001/9',
      520538: 'https://music.yiddish24.com:5001/10',
      525868: 'https://music.yiddish24.com:5001/8',
      520593: 'https://broadcast.adpronet.com/radio/8010/radio.mp3?ver=370660',
      529593: 'https://stream.jewishmusicstream.com:8000/;',
      578395: 'https://media2.93fm.co.il/livemusic'
  };

  const imageSources = [
      'Chasunakumzits.png',
      'seconddance.png',
      'chasunafreilach.png',
      'https://static.wixstatic.com/media/460038_dc1333e3f5854e28b29e471ce17a88b7~mv2.jpg/v1/fill/w_398,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/460038_dc1333e3f5854e28b29e471ce17a88b7~mv2.jpg',
      'https://static.wixstatic.com/media/460038_06e17f096191422da6e4bed2c110fbf4~mv2.jpg/v1/fill/w_398,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/460038_06e17f096191422da6e4bed2c110fbf4~mv2.jpg',
      'https://static.wixstatic.com/media/460038_9b6cfe52c8234c82957551d53c8db278~mv2.png/v1/fill/w_398,h_401,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/460038_9b6cfe52c8234c82957551d53c8db278~mv2.png'
  ];

  const albumTitles = [
      'Chasuna Kumzits',
      'Chasuna 2nd Dance',
      'Chasuna Freilach',
      'Geula FM',
      'Jewish Music Stream',
      'Kol Chai Music'
  ];

  const artists = [
      'Yiddish 24',
      'Yiddish 24',
      'Yiddish 24',
      'Geula FM',
      'Jewish Music Stream',
      'Radio Kol Chai'
  ];

  const hrefs = [
      '#streams/chasuna-kumzits',
      '#streams/Chasuna-2nd-Dance',
      '#streams/Chasuna-Freilach',
      '#streams/Geula-FM',
      '#streams/Jewish-Music-Stream',
      '#streams/Kol-Chai-Music'
  ];

  const audioNumbers = [
      528958,
      520538,
      525868,
      520593,
      529593,
      578395
  ];

  const containerRepeater = document.querySelector('.container-repeater-streams');

  for (let i = 0; i < 6; i++) {
      const containerItem = document.createElement('a');
      containerItem.classList.add('container-item-streams');
      containerItem.href = hrefs[i];
      containerItem.innerHTML = `
          <img src="${imageSources[i]}" alt="Album Artwork">
          <div class="overlay" data-number="${audioNumbers[i]}" style="
              position: absolute;
              top: 2px;
              left: 4px;
              width: 95px;
              height: 96px;
              background: rgba(0, 0, 0, 0.5);
              opacity: 0;
              transition: opacity 0.3s;
              border-radius: 4px;">
              <div class="play-button" style="display: block;">
                  <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="play--v2" style="
                      width: 50px;
                      height: 50px;
                      margin: 23px">
              </div>
              <div class="pause-button" style="display: none;">
                  <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="pause--v2" style="
                      width: 50px;
                      height: 50px;
                      margin: 23px">
              </div>
          </div>
          <div class="text-content">
              <div class="album-title">${albumTitles[i]}</div>
              <div class="artist">${artists[i]}</div>
          </div>`;
      containerRepeater.appendChild(containerItem);

      containerItem.addEventListener('mouseover', function() {
          const overlay = containerItem.querySelector('.overlay');
          if (!overlay.classList.contains('playing')) {
              overlay.style.opacity = '1';
          }
      });

      containerItem.addEventListener('mouseout', function() {
          const overlay = containerItem.querySelector('.overlay');
          if (!overlay.classList.contains('playing')) {
              overlay.style.opacity = '0';
          }
      });
  }

  containerRepeater.addEventListener('click', function(event) {
      const overlay = event.target.closest('.overlay');
      if (overlay) {
          event.preventDefault();
          const playButton = overlay.querySelector('.play-button');
          const pauseButton = overlay.querySelector('.pause-button');
          const number = overlay.getAttribute('data-number');
          togglePlayPause(number, overlay, playButton, pauseButton);
      }
  });

  function togglePlayPause(number, overlay, playButton, pauseButton) {
      if (audioFiles[number]) {
          if (currentPlayingOverlay !== overlay) {
              if (currentPlayingOverlay) {
                  currentPlayingOverlay.classList.remove('playing');
                  currentPlayingOverlay.querySelector('.play-button').style.display = 'block';
                  currentPlayingOverlay.querySelector('.pause-button').style.display = 'none';
                  currentPlayingOverlay.style.opacity = '0';
              }

              currentPlayingOverlay = overlay;
              audioSource.src = audioFiles[number];
              audioPlayer.currentTime = (lastPlayingNumber === number) ? lastPausedTimestamp : 0;
              audioPlayer.load();
              audioPlayer.play();
              lastPlayingNumber = number;
              updateOverlayStyles(overlay, playButton, pauseButton);
              updatePlayerDetails(number);
          } else {
              if (audioPlayer.paused) {
                  audioPlayer.currentTime = lastPausedTimestamp;
                  audioPlayer.play();
              } else {
                  lastPausedTimestamp = audioPlayer.currentTime;
                  audioPlayer.pause();
              }
          }

          playButton.style.display = audioPlayer.paused ? 'block' : 'none';
          pauseButton.style.display = audioPlayer.paused ? 'none' : 'block';
      } else {
          console.error('Audio file not found for number:', number);
      }
  }

  function updateOverlayStyles(playingOverlay, playButton, pauseButton) {
      document.querySelectorAll('.overlay').forEach(overlay => {
          if (overlay === playingOverlay) {
              overlay.classList.add('playing');
              overlay.style.opacity = '1';
          } else {
              overlay.classList.remove('playing');
              overlay.style.opacity = '0';
          }
      });

      playPauseButton.querySelector('i').classList.replace('fa-pause-circle', 'fa-play-circle');
      playPauseButton.querySelector('i').classList.replace('fa-play-circle', 'fa-pause-circle');
  }

  function updatePlayerDetails(number) {
      const index = audioNumbers.indexOf(parseInt(number));
      if (index !== -1) {
          document.getElementById('image-artwork').src = imageSources[index];
          const textRows = document.querySelectorAll('.repeater-text .text-row-player');
          textRows[0].textContent = albumTitles[index];
          textRows[1].textContent = `${artists[index]}`;
      }
  }

  playPauseButton.addEventListener('click', function() {
      if (audioPlayer.paused) {
          audioPlayer.play();
          playPauseButton.querySelector('i').classList.replace('fa-play-circle', 'fa-pause-circle');
          syncRepeaterPlayPause(true);
      } else {
          audioPlayer.pause();
          playPauseButton.querySelector('i').classList.replace('fa-pause-circle', 'fa-play-circle');
          syncRepeaterPlayPause(false);
          lastPausedTimestamp = audioPlayer.currentTime;
      }
  });

  function syncRepeaterPlayPause(isPlaying) {
      document.querySelectorAll('.overlay').forEach(overlay => {
          const playButton = overlay.querySelector('.play-button');
          const pauseButton = overlay.querySelector('.pause-button');
          const number = overlay.getAttribute('data-number');

          if (audioFiles[number] === audioSource.src) {
              playButton.style.display = isPlaying ? 'none' : 'block';
              pauseButton.style.display = isPlaying ? 'block' : 'none';
              overlay.classList.toggle('playing', isPlaying);
              overlay.style.opacity = isPlaying ? '1' : '0';
          }
      });
  }

  function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  audioPlayer.addEventListener('play', function() {
      syncRepeaterPlayPause(true);
  });

  audioPlayer.addEventListener('pause', function() {
      syncRepeaterPlayPause(false);
      lastPausedTimestamp = audioPlayer.currentTime;
  });

  audioPlayer.addEventListener('loadedmetadata', () => {
      durationTimeElement.textContent = formatTime(audioPlayer.duration);
      timeBar.max = audioPlayer.duration;
  });

  audioPlayer.addEventListener('timeupdate', () => {
      currentTimeElement.textContent = formatTime(audioPlayer.currentTime);
      timeBar.value = audioPlayer.currentTime;
  });

  timeBar.addEventListener('input', () => {
      audioPlayer.currentTime = timeBar.value;
  });
});
