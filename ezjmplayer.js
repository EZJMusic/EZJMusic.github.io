document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById('audio');
  const playPauseButton = document.querySelector('.play-pause-button i');
  const volumeButton = document.querySelector('.b1.v1');
  const volumeFill = document.querySelector('.v4');
  const volumeSlider = document.querySelector('.volume-slider');
  const shuffleButton = document.querySelector('.b1.s1');
  const repeatButton = document.querySelector('.b1.r1');
  const volumeIcon = document.querySelector('.i1');
  const currentTimeElem = document.querySelector('.current-time');
  const totalTimeElem = document.querySelector('.total-time');
  const progressBar = document.querySelector('.p3');
  const progressContainer = progressBar.parentElement;

  let isMuted = false;
  let isPlaying = false;
  let isDragging = false;

  const items = [
      {
        image: 'https://i.scdn.co/image/ab67616d00001e0211848cabe10917c8aadba543',
        title: 'Simchas Torah Upmix',
        artist: 'Thank You Hashem, The Early Shabbos Band',
        number: 345234,
        href: '#Songs/Simchas-Torah-Upmix',
        category: 'Song',
        audioUrl: 'audio/345234' // Add direct audio URL if available
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0420/2505/files/photo_2024-01-13_17-28-44.jpg?v=1705602649',
        title: 'Borchu',
        artist: 'Zanvil Weinberger',
        number: 395994,
        href: '#Songs/Borchu',
        category: 'Song',
        audioUrl: 'https://djox3levv7u3o.cloudfront.net/550/563ae2f8-319e-451d-b657-4be5e6546ba3/Zanvil_Weinberger___Malchus_Choir_-_Borchi_%28Single%29.mp3?response-content-type=audio%2Fmpeg&amp;Expires=1735225461&amp;Signature=XdAcK0bQYXVe-E3Z3ulY5Y~P-aCk-me4Ci6J~H9A~sGWqAareZ6FrWPLh15Q6hpP7nxo3Y7fvUmNQ2e5dTH0iVATB10wR1zrMUTQTInsUePZfGMp4Ak0~kae~e~B0FDz4PyhwOx5cwNBrQisrd3SctbgBLxyvgqomarZxreioS2F-aktEcnT6nZCmj8ad-QSGKPZ1hgM-BQq5~IgwRbvB1cTMbWbAoLaPu8pDCa8Qt5nBrTSNLdxfdsuZGbaMYTuBP7c0araSoG23WEUVMY2tW~woGe3VEsJNkiAau6Y7-IAQq2ih45gtauNBzAv7fFW5hMFzAR-8jywrzvLgnSA2g__&amp;Key-Pair-Id=APKAJO6D4YCMUHCYEOSQ' // Add direct audio URL if available
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0420/2505/files/photo_2024-06-10_14-06-30.jpg?v=1718045094',
        title: 'Tuni Rabunun',
        artist: 'Avraham Fried, Heshy Weinberger',
        number: 367544,
        href: '#Songs/Tuni-Rabubun',
        category: 'Song',
        audioUrl: 'audio/395994' // Add direct audio URL if available
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0420/2505/files/photo_2023-06-28_06-00-23.jpg?v=1687968293',
        title: 'Shvitzn',
        artist: 'Ari Samet',
        number: 357465,
        href: '#Songs/Shvitzn',
        category: 'Song',
        audioUrl: 'audio/357465' // Add direct audio URL if available
      },
      {
        image: 'https://cdn.shopify.com/s/files/1/0420/2505/products/photo_2023-02-26_18-28-38.jpg?v=1677522243',
        title: 'Vaani Evtach Boch',
        artist:'Matt Dubb, Beri Weber, Shmuli Ungar',
        number: 367039,
        href: '#Songs/Vaani-Evtach-Boch',
        category: 'Song',
        audioUrl: 'audio/367039' // Add direct audio URL if available
      },
      {
        image: 'tyh.jpg',
        title: 'Thank You Hashem',
        artist: 'Joey Newcomb, Moshe Storch',
        number: 382473,
        href: '#Songs/Thank-You-Hashem',
        category: 'Song',
        audioUrl: 'audio/382473' // Add direct audio URL if available
      }
  ];

  function findTrackSource(src) {
    // Check if src is a direct URL
    if (src.startsWith('http') || src.startsWith('https')) {
      return src;
    }

  }

  function togglePlayPause(src, overlay, playButton, pauseButton) {
    // Find the correct audio source
    const audioSource = findTrackSource(src);

    if (overlay.classList.contains('playing')) {
      // Pause logic
      overlay.classList.remove('playing');
      overlay.style.opacity = '0';
      audioPlayer.pause();
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
      playPauseButton.className = 'fa fa-play-circle fa-2x';
      isPlaying = false;
    } else {
      // Stop any currently playing track
      const currentPlayingOverlay = document.querySelector('.overlay-1st.playing');
      if (currentPlayingOverlay) {
        currentPlayingOverlay.classList.remove('playing');
        currentPlayingOverlay.style.opacity = '0';
        currentPlayingOverlay.querySelector('.play-button').style.display = 'block';
        currentPlayingOverlay.querySelector('.pause-button').style.display = 'none';
      }

      // Play new track
      overlay.classList.add('playing');
      overlay.style.opacity = '1';
      
      // Set the audio source using the resolved URL
      audioPlayer.src = audioSource;
      audioPlayer.play();
      
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
      playPauseButton.className = 'fa fa-pause-circle fa-2x';
      isPlaying = true;
      
      // Update player details
      updatePlayerDetails(src);
    }
  }

  function updatePlayerDetails(src) {
    // Find the item by number or audioUrl
    const item = items.find(item => 
      item.audioUrl === src
    );

    if (item) {
      document.getElementById('image-artwork').src = item.image;
      document.querySelector('#playing-details .text-row-player:nth-of-type(1)').textContent = item.title;
      document.querySelector('#playing-details .text-row-player:nth-of-type(2)').textContent = item.artist;
    }
  }

  // ... rest of the existing code remains the same
  
  function handlePlayPauseClick(event) {
    const overlay = event.currentTarget.closest('.overlay-1st');
    const playButton = overlay.querySelector('.play-button');
    const pauseButton = overlay.querySelector('.pause-button');
    
    // Use either the data-number or data-url attribute
    const source = overlay.getAttribute('data-number') || 
                   overlay.getAttribute('data-url');
    
    togglePlayPause(source, overlay, playButton, pauseButton);
    event.stopPropagation();
    event.preventDefault();
  }

  // Modify createRepeaterItems to support both number and URL
  function createRepeaterItems(repeaterRow) {
    repeaterRow.innerHTML = ''; // Clear any existing items
    items.forEach(item => {
      const repeaterItem = document.createElement('a');
      repeaterItem.classList.add('repeater-row-item');
      repeaterItem.href = item.href;
      repeaterItem.setAttribute('data-category', item.category);

      // Allow setting either number or direct URL
      const dataAttribute = item.audioUrl 
        ? `data-url="${item.audioUrl}"` 
        :

      repeaterItem.innerHTML = `
        <div class="image-container">
          <img src="${item.image}" alt="Album Artwork">
          <div class="overlay-1st" ${dataAttribute}>
            <div class="play-button" style="display: block;">
              <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play Button" style="width: 50px; height: 50px;">
            </div>
            <div class="pause-button" style="display: none;">
              <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause Button" style="width: 50px; height: 50px;">
            </div>
          </div>
        </div>
        <div class="repeater-text">
          <div class="text-row">${item.title}</div>
          <div class="text-row-small">${item.artist}</div>
        </div>
      `;

      repeaterRow.appendChild(repeaterItem);
    });
  }

  function togglePlayPause(src, overlay, playButton, pauseButton) {
    if (overlay.classList.contains('playing')) {
      overlay.classList.remove('playing');
      overlay.style.opacity = '0';
      audioPlayer.pause();
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
      playPauseButton.className = 'fa fa-play-circle fa-2x';
      isPlaying = false;
    } else {
      const currentPlayingOverlay = document.querySelector('.overlay-1st.playing');
      if (currentPlayingOverlay) {
        currentPlayingOverlay.classList.remove('playing');
        currentPlayingOverlay.style.opacity = '0';
        currentPlayingOverlay.querySelector('.play-button').style.display = 'block';
        currentPlayingOverlay.querySelector('.pause-button').style.display = 'none';
      }
      overlay.classList.add('playing');
      overlay.style.opacity = '1';
      audioPlayer.src = src; // Can be a number-based path or a regular URL
      audioPlayer.play();
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
      playPauseButton.className = 'fa fa-pause-circle fa-2x';
      isPlaying = true;
      updatePlayerDetails(src);
    }
  }
  function updatePlayerDetails(number) {
    const item = items.find(item => item.number === parseInt(number));
    
    if (item) {
      // Update both image elements
      const artworkImage = document.getElementById('image-artwork');
      const upNextImage = document.getElementById('upnextimg');
      
      if (artworkImage) artworkImage.src = item.image;
      if (upNextImage) upNextImage.src = item.image;
  
      // Update player text details
      const playerTitleElement = document.querySelector('#playing-details .text-row-player:nth-of-type(1)');
      const playerArtistElement = document.querySelector('#playing-details .text-row-player:nth-of-type(2)');
      
      if (playerTitleElement) playerTitleElement.textContent = item.title;
      if (playerArtistElement) playerArtistElement.textContent = item.artist;
  
      // Update up next text details
      const upNextTitleElement = document.getElementById('upnext-album-title');
      const upNextArtistElement = document.getElementById('upnext-artist');
      
      if (upNextTitleElement) upNextTitleElement.textContent = item.title;
      if (upNextArtistElement) upNextArtistElement.textContent = item.artist;
    }
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const formattedHours = hours > 0 ? `${hours}:` : '';
    return `${formattedHours}${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  function updateVolumeIcon(volumeLevel) {
    if (volumeLevel <= 0 || isMuted) {
      volumeIcon.textContent = 'volume_off';
    } else if (volumeLevel > 0 && volumeLevel <= 40) {
      volumeIcon.textContent = 'volume_mute';
    } else if (volumeLevel > 40 && volumeLevel <= 80) {
      volumeIcon.textContent = 'volume_down_alt';
    } else if (volumeLevel > 80 && volumeLevel <= 100) {
      volumeIcon.textContent = 'volume_up';
    }
  }

  function updateVolumeSlider(volumeLevel) {
    volumeFill.style.width = `${volumeLevel}%`;
    volumeSlider.value = volumeLevel;
    audioPlayer.volume = volumeLevel / 100;
    updateVolumeIcon(volumeLevel);
  }

  volumeButton.addEventListener('click', function() {
    isMuted = !isMuted;
    audioPlayer.muted = isMuted;
    if (isMuted) {
      updateVolumeIcon(0);
    } else {
      updateVolumeIcon(audioPlayer.volume * 100);
    }
  });

  volumeSlider.addEventListener('input', function() {
    const volumeLevel = parseInt(this.value);
    audioPlayer.muted = false;
    isMuted = false;
    updateVolumeSlider(volumeLevel);
  });

  playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
      audioPlayer.pause();
      playPauseButton.className = 'fa fa-play-circle fa-2x';
    } else {
      audioPlayer.play();
      playPauseButton.className = 'fa fa-pause-circle fa-2x';
    }
    isPlaying = !isPlaying;
  });

  audioPlayer.addEventListener('timeupdate', function() {
    if (isNaN(audioPlayer.duration) || audioPlayer.duration === Infinity) {
      totalTimeElem.textContent = 'Live';
      currentTimeElem.textContent = '0:00';
    } else {
      currentTimeElem.textContent = formatTime(audioPlayer.currentTime);
      totalTimeElem.textContent = formatTime(audioPlayer.duration);
      const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
  });

  audioPlayer.addEventListener('playing', function() {
    if (isPlaying) {
      playPauseButton.className = 'fa fa-pause-circle fa-2x';
    }
  });

  audioPlayer.addEventListener('pause', function() {
    if (!isPlaying) {
      playPauseButton.className = 'fa fa-play-circle fa-2x';
    }
  });

  
  // Update the player's current time based on progress bar position
  function updateCurrentTimeFromBar(event) {
    const containerRect = progressContainer.getBoundingClientRect();
    const offsetX = event.clientX - containerRect.left;
    const progressWidth = containerRect.width;
    const progressPercent = Math.min(Math.max(offsetX / progressWidth, 0), 1); // Clamp between 0 and 1
    const newTime = progressPercent * audioPlayer.duration;

    audioPlayer.currentTime = newTime;
    progressBar.style.width = `${progressPercent * 100}%`;
    currentTimeElem.textContent = formatTime(newTime);
  }

  // Add event listeners for dragging functionality
  progressContainer.addEventListener('mousedown', function (event) {
    isDragging = true;
    updateCurrentTimeFromBar(event);
  });

  document.addEventListener('mousemove', function (event) {
    if (isDragging) {
      updateCurrentTimeFromBar(event);
    }
  });

  document.addEventListener('mouseup', function () {
    if (isDragging) {
      isDragging = false;
    }
  });

  audioPlayer.addEventListener('timeupdate', function () {
    if (!isDragging) {
      if (isNaN(audioPlayer.duration) || audioPlayer.duration === Infinity) {
        totalTimeElem.textContent = 'Live';
        currentTimeElem.textContent = '0:00';
      } else {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        currentTimeElem.textContent = formatTime(audioPlayer.currentTime);
        totalTimeElem.textContent = formatTime(audioPlayer.duration);
      }
    }
  });

  function handlePlayPauseClick(event) {
    const overlay = event.currentTarget.closest('.overlay-1st');
    const playButton = overlay.querySelector('.play-button');
    const pauseButton = overlay.querySelector('.pause-button');
    const number = overlay.getAttribute('data-number');
    togglePlayPause(number, overlay, playButton, pauseButton);
    event.stopPropagation(); // Prevent triggering hover functionality
    event.preventDefault(); // Prevent following the href link
  }

  function handleMouseEnter(event) {
    const overlay = event.currentTarget.querySelector('.overlay-1st');
    overlay.style.opacity = '1';
  }

  function handleMouseLeave(event) {
    const overlay = event.currentTarget.querySelector('.overlay-1st');
    if (!overlay.classList.contains('playing')) {
      overlay.style.opacity = '0';
    }
  }

  // Initialize repeater items with event listeners
  function initializeRepeaterItems() {
    const repeaterItems = document.querySelectorAll('.repeater-row-item');
    repeaterItems.forEach(item => {
      const overlay = item.querySelector('.overlay-1st');
      const playButton = item.querySelector('.play-button');
      const pauseButton = item.querySelector('.pause-button');

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
      playButton.addEventListener('click', handlePlayPauseClick);
      pauseButton.addEventListener('click', handlePlayPauseClick);
    });
  }

  // Initialize repeater items
  const repeaterRow1 = document.getElementById('friedrepeater');
  const repeaterRow2 = document.getElementById('repeater-row');
  createRepeaterItems(repeaterRow1);
  createRepeaterItems(repeaterRow2);
  initializeRepeaterItems();

  // Toggle category options visibility
  const categoryTitle = document.querySelector('.category-title1');
  const selectedCategory = document.getElementById('selected-category1');
  const categoryOptions = document.querySelector('.category-options1');

  categoryTitle.addEventListener('click', function () {
    categoryOptions.classList.toggle('show');
  });

  // Handle category selection
  categoryOptions.addEventListener('click', function (event) {
    const selectedOption = event.target.closest('.category-option1');
    if (selectedOption) {
      const categoryText = selectedOption.textContent.trim();
      selectedCategory.innerHTML = `${getIcon(categoryText)} ${categoryText}`;
      filterItemsByCategory(categoryText);
      categoryOptions.classList.remove('show');
    }
  });

  function getIcon(category) {
    switch (category) {
      case 'Songs':
        return '<span class="catopt material-symbols-rounded">music_note</span>';
      case 'Music':
        return '<span class="catopt material-symbols-rounded">graphic_eq</span>';
      case 'Stories':
        return '<span class="catopt material-symbols-rounded">menu_book</span>';
      case 'Podcasts':
        return '<span class="catopt material-symbols-rounded">podcasts</span>';
      default:
        return '';
    }
  }

  function filterItemsByCategory(category) {
    const repeaterItems = document.querySelectorAll('.repeater-row-item');
    let isAnyItemVisible = false;

    repeaterItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'Songs' && itemCategory === 'Song' ||
          category === 'Music' && itemCategory === 'Music' ||
          category === 'Podcasts' && itemCategory === 'Podcasts' ||
          category === 'Stories' && itemCategory === 'Story') {
        item.style.display = 'block';
        isAnyItemVisible = true;
      } else {
        item.style.display = 'none';
      }
    });

    if (!isAnyItemVisible) {
      console.log('No items match the selected category.');
    }
  }

  function createRepeaterItems(repeaterRow) {
    repeaterRow.innerHTML = ''; // Clear any existing items
    items.forEach(item => {
      const repeaterItem = document.createElement('a');
      repeaterItem.classList.add('repeater-row-item');
      repeaterItem.href = item.href;
      repeaterItem.setAttribute('data-category', item.category);

      repeaterItem.innerHTML = `
        <div class="image-container">
          <img src="${item.image}" alt="Album Artwork">
          <div class="overlay-1st" data-number="${item.number}">
            <div class="play-button" style="display: block;">
              <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play Button" style="width: 50px; height: 50px;">
            </div>
            <div class="pause-button" style="display: none;">
              <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause Button" style="width: 50px; height: 50px;">
            </div>
          </div>
        </div>
        <div class="repeater-text">
          <div class="text-row">${item.title}</div>
          <div class="text-row-small">${item.artist}</div>
        </div>
      `;

      repeaterRow.appendChild(repeaterItem);
    });
  }

  // Initialize with default category
  filterItemsByCategory('Songs');
});

const audioItems = [
  {
    image: 'Chasunakumzits.png',
    title: 'Chasuna Kumzits',
    artist: 'Yiddish 24',
    number: 528958,
    href: '#Songs/streams/chasuna-kumzits',
    category: 'Stream',
    audioUrl: 'https://music.yiddish24.com:5001/9'
  },
  {
    image: 'seconddance.png',
    title: 'Chasuna 2nd Dance',
    artist: 'Yiddish 24',
    number: 520538,
    href: '#Songs/streams/Chasuna-2nd-Dance',
    category: 'Stream',
    audioUrl: 'https://music.yiddish24.com:5001/10'
  },
  {
    image: 'chasunafreilach.png',
    title: 'Chasuna Freilach',
    artist: 'Yiddish 24',
    number: 525868,
    href: '#Songs/streams/Chasuna-Freilach',
    category: 'Stream',
    audioUrl: 'https://music.yiddish24.com:5001/8'
  },
  {
    image: 'https://static.wixstatic.com/media/460038_dc1333e3f5854e28b29e471ce17a88b7~mv2.jpg/v1/fill/w_398,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/460038_dc1333e3f5854e28b29e471ce17a88b7~mv2.jpg',
    title: 'Geula FM',
    artist: 'Geula FM',
    number: 520593,
    href: '#Songs/streams/Geula-FM',
    category: 'Stream',
    audioUrl: 'https://broadcast.adpronet.com/radio/8010/radio.mp3?ver=370660'
  },
  {
    image: 'https://static.wixstatic.com/media/460038_06e17f096191422da6e4bed2c110fbf4~mv2.jpg/v1/fill/w_398,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/460038_06e17f096191422da6e4bed2c110fbf4~mv2.jpg',
    title: 'Jewish Music Stream',
    artist: 'Jewish Music Stream',
    number: 529593,
    href: '#Songs/streams/Jewish-Music-Stream',
    category: 'Stream',
    audioUrl: 'https://stream.jewishmusicstream.com:8000/;'
  },
  {
    image: 'https://static.wixstatic.com/media/460038_9b6cfe52c8234c82957551d53c8db278~mv2.png/v1/fill/w_398,h_401,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/460038_9b6cfe52c8234c82957551d53c8db278~mv2.png',
    title: 'Kol Chai Music',
    artist: 'Radio Kol Chai',
    number: 578395,
    href: '#Songs/streams/Kol-Chai-Music',
    category: 'Stream',
    audioUrl: 'https://media2.93fm.co.il/livemusic'
  }
];

const containerRepeater = document.querySelector('.container-repeater-streams');
const audioSource = document.getElementById('audioSource');
const playPauseButton = document.querySelector('.play-pause-button');
const timeBar = document.querySelector('.time-bar');
const currentTimeElement = document.querySelector('.current-time');
const durationTimeElement = document.querySelector('.duration-time');

let isPlaying = false;
let currentPlayingItem = null;
let audioElements = new Map(); // Store audio elements for each item

// Utility: Format time to mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}

// Utility: Toggle Play/Pause
function togglePlayPause(item, audioUrl) {
  let audio = audioElements.get(audioUrl);
  
  if (!audio) {
    audio = new Audio(audioUrl);
    audioElements.set(audioUrl, audio);
    
    // Set up time bar updates for this audio element
    updateTimeBar(audio, timeBar, currentTimeElement, durationTimeElement);
  }

  if (currentPlayingItem && currentPlayingItem.audioUrl !== audioUrl) {
    // Stop previous item
    const previousAudio = audioElements.get(currentPlayingItem.audioUrl);
    if (previousAudio) {
      previousAudio.pause();
      previousAudio.currentTime = 0;
    }
    currentPlayingItem.overlay.classList.remove('playing');
  }

  if (audio.paused || audio.ended) {
    // Stop all other playing audio first
    audioElements.forEach((otherAudio, url) => {
      if (url !== audioUrl) {
        otherAudio.pause();
        otherAudio.currentTime = 0;
      }
    });

    audio.play()
      .then(() => {
        item.overlay.classList.add('playing');
        isPlaying = true;
        currentPlayingItem = {
          overlay: item.overlay,
          audioUrl: audioUrl
        };
      })
      .catch(error => {
        console.error('Error playing audio:', error);
      });
  } else {
    audio.pause();
    item.overlay.classList.remove('playing');
    isPlaying = false;
  }
}

// Utility: Update Time Bar
function updateTimeBar(audio, timeBar, currentTimeElement, durationTimeElement) {
  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    if (!isNaN(duration)) {
      timeBar.value = (currentTime / duration) * 100;
      currentTimeElement.textContent = formatTime(currentTime);
      durationTimeElement.textContent = formatTime(duration);
    }
  });

  // Handle time bar interaction
  timeBar.addEventListener('input', () => {
    const time = (timeBar.value * audio.duration) / 100;
    audio.currentTime = time;
  });
}

// Dynamically create repeater items
audioItems.forEach((item, index) => {
  // Create container item
  const containerItem = document.createElement('a');
  containerItem.classList.add('container-item-streams');
  containerItem.href = item.href;

  // Add inner HTML
  containerItem.innerHTML = `
    <img src="${item.image}" alt="Album Artwork">
    <div class="overlay" data-number="${item.number}" style="
      position: absolute;
      top: 2px;
      left: 2px;
      width: 95px;
      height: 96px;
      background: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      border-radius: 5px;">
      <div class="play-button">
        <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play" style="
          width: 50px;
          height: 50px;
          margin: 23px">
      </div>
    </div>
    <div class="text-content">
      <div class="album-title">${item.title}</div>
      <div class="artist">${item.artist}</div>
    </div>
  `;

  // Append item to the container
  containerRepeater.appendChild(containerItem);

  const overlay = containerItem.querySelector('.overlay');

  // Handle hover effects
  containerItem.addEventListener('mouseover', () => {
    if (!overlay.classList.contains('playing')) {
      overlay.style.opacity = '1';
    }
  });
  
  containerItem.addEventListener('mouseout', () => {
    if (!overlay.classList.contains('playing')) {
      overlay.style.opacity = '0';
    }
  });

  // Handle play/pause
  overlay.addEventListener('click', (event) => {
    event.preventDefault();
    togglePlayPause({ overlay }, item.audioUrl);
  });
});

// Handle cleanup when leaving the page
window.addEventListener('beforeunload', () => {
  audioElements.forEach(audio => {
    audio.pause();
    audio.src = '';
  });
  audioElements.clear();
});