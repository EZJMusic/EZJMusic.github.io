document.addEventListener('DOMContentLoaded', function() {
  const audioPlayer = document.getElementById('audioPlayer');
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

  
          document.addEventListener("DOMContentLoaded", function () {
              const repeaterRow = document.getElementById('repeater-row-video');
              let currentlyPlayingVideo = null;
  
              // Function to pause the currently playing video
              function pauseCurrentlyPlayingVideo() {
                  if (currentlyPlayingVideo) {
                      currentlyPlayingVideo.pause();
                      currentlyPlayingVideo = null;
                  }
              }
  
              const videoSources = [
                  'Byo7t9hJXG4?si=dccUsnXQ4gXdv_Nu',
                  'MScVEbVjAVc',
                  'FzMZg-FPRK0',
                  'GX1XGmT43BI',
                  'yyUFJMm3hv8'
              ];
  
              const albumTitles = [
                  'Thank You Hashem',
                  'Toda',                
                  'Rebbi Shimon',
                  'Abba',
                  'Mach A Bracha'
              ];
  
              const artists = [
                  'Joey Newcomb, Moshe Storch',
                  'Beny Friedman',                
                  'Beri Weber',
                  'Mordechai Shapiro',
                  'Shmueli Ungar'
              ];
  
              // Create containers dynamically with individual YouTube video embeds, titles, and artists
              for (let i = 0; i < 5; i++) {
                  const repeaterItem = document.createElement('div');
                  repeaterItem.classList.add('video-repeater-row-item');
                  repeaterItem.innerHTML = `
                      <div class="video-image-container">
                          <iframe width="350px" height="200" src="https://www.youtube.com/embed/${videoSources[i]}" frameborder="0" allowfullscreen style= "border-radius: 10px;"></iframe>
                      </div>
                      <div class="video-repeater-text">
                          <div class="video-text-row">${albumTitles[i]}</div>
                          <div class="video-text-row-small">${artists[i]}</div>
                      </div>`;
                  repeaterRow.appendChild(repeaterItem);
              }
          });
  
              // Add event listener for hover effect on repeater items
              const repeaterItems = document.querySelectorAll('.video-repeater-row-item');
              repeaterItems.forEach(item => {
                  item.addEventListener('mouseenter', () => {
                      item.querySelector('.play-button1').classList.add('playing');
                  });
  
                  item.addEventListener('mouseleave', () => {
                      item.querySelector('.play-button1').classList.remove('playing');
                  });
              });
  
              document.addEventListener("DOMContentLoaded", function () {
                const containerRepeater = document.querySelector('.container-repeater-services');
              
                // Array of image URLs, album titles, and artists
                const imageSources = [
                  'contact-us.png',
                  'request-a-song.png',
                  'https://img.icons8.com/material-rounded/1028/FFFFFF/download--v1.png',
                  '.jpg',
                  '.jpg',
                  '.jpg'
                ];
              
                const albumTitles = [
                  'Contact Us',
                  'Request A Song',
                  'Download App',
                  '',
                  '',
                  ''
                ];
              
                const artists = [
                  'You can contact us for anything you want new features, report bugs or anything else you want us to know, even a thank you.',
                  'We now offer the ability to request a song. Send us the song name (and singer if possible) and We will try our best to get it for you.',
                  'Download the app of EZJ Music and be able to use almost all of our services offline.',
                  '',
                  '',
                  ''
                ];
              
                // Array of links for each container
                const links = [
                  '#services/contact-us',
                  '#services/request-a-song',
                  '',
                  '',
                  '',
                  ''
                  // Add more links as needed
                ];
              
                // Create containers dynamically with individual image sources, titles, artists, and links
                for (let i = 0; i < 3; i++) {
                  const containerItem = document.createElement('div');
                  containerItem.classList.add('container-item-services');
                  containerItem.id = `container-item-${i}`; // Assign unique ID to each container
              
                  // Wrap each container with an anchor element
                  const anchorElement = document.createElement('a');
                  anchorElement.href = links[i] || '#'; // Set link or '#' as fallback
                  anchorElement.style.textDecoration = 'none'; // Remove underline
              
                  // Add onclick attribute for the third link
                  if (i === 2) {
                    anchorElement.setAttribute('onclick', 'openNav()');
                  }
              
                  containerItem.appendChild(anchorElement);
              
                  anchorElement.innerHTML = `
                    <img src="${imageSources[i]}" alt="Album Artwork">
                    <div class="text-content-services">
                        <div class="service">${albumTitles[i]}</div>
                        <div class="description">${artists[i]}</div>
                    </div>`;
              
                  containerRepeater.appendChild(containerItem);
                }
              });
              
          // JavaScript code for handling SPA functionality
          document.addEventListener("DOMContentLoaded", function() {
              const pages = document.querySelectorAll('.page');
  
              // Function to show the selected page and hide others
              function showPage(pageId) {
                  pages.forEach(page => {
                      if (page.id === pageId) {
                          page.style.display = 'block';
                      } else {
                          page.style.display = 'none';
                      }
                  });
              }
  
              // Function to handle navigation
              function handleNavigation() {
                  const hash = window.location.hash;
                  const pageId = hash.slice(1) || 'home';
                  showPage(pageId);
              }
  
              // Initial page load
              handleNavigation();
  
              // Event listener for hash changes
              window.addEventListener('hashchange', handleNavigation);
          });
  
          document.addEventListener("DOMContentLoaded", function () {
        // Replace 'header' with your actual header tag or selector
        const header = document.querySelector('header');
  
        // Create previous page button
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<img width="30" height="30" src="https://img.icons8.com/ios-filled/512/3333ff/forward--v1.png" style="rotate: 180deg;">';
        prevButton.addEventListener('click', function () {
          window.history.back();
        });
        prevButton.addEventListener('mouseover', function () {
          prevButton.style.opacity = '1';
        });
  
        prevButton.addEventListener('mouseout', function () {
          prevButton.style.opacity = '1';
        });
        prevButton.id = 'prevButton'; // Add ID
  
        // Create next page button
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<img width="30" height="30" src="https://img.icons8.com/ios-filled/512/3333ff/forward--v1.png"/>';
        nextButton.addEventListener('click', function () {
          window.history.forward();
        });
        nextButton.id = 'nextButton'; // Add ID
  
        // Apply CSS styles to make the buttons invisible and add margin
        const buttonStyles = 'background-color: #000; border: none; margin-left: 5px; width: 40px; height: 40px; transition: opacity 0.3s; cursor: pointer;';
  
        prevButton.style.cssText = buttonStyles + 'padding-right: 0px;';
        prevButton.style.cssText = buttonStyles + 'margin-left: 10px; border-radius: 10px;';
        nextButton.style.cssText = buttonStyles + 'padding-left: 6px; border-radius: 10px;';
  
        nextButton.addEventListener('mouseover', function () {
          nextButton.style.opacity = '1';
        });
  
        nextButton.addEventListener('mouseout', function () {
          nextButton.style.opacity = '1';
        });
  
        // Insert buttons at the beginning of the header
        header.insertBefore(nextButton, header.firstChild);
        header.insertBefore(prevButton, header.firstChild);
      });



document.addEventListener("DOMContentLoaded", function () {
  const repeaterRow = document.getElementById('repeater-row');

  // Array of image URLs, album titles, artists, and audio numbers
  const imageSources = [
    'tyh.jpg',
    'vhareinu.jpg',
    'yirei shomayim.jpg',
    'nafshi.jpg',
    'vzakeini.jpg',
    'abba.jpg'
  ];

  const albumTitles = [
    'Thank You Hashem',
    'Vhareinu',
    'Yirei Shomayim',
    'Nafshi',
    'Vzakeini',
    'Abba'
  ];

  const artists = [
    'Joey Newcomb, Moshe Storch',
    'Shlomo Yehuda Rechnitz',
    'Shmueli Ungar',
    'Ishey Ribo, Motty Shteinmetz',
    'Benny Friedman, Baruch Levine',
    'Avraham Fried, Ari Hill'
  ];

  const audioNumbers = [
    38473,
    39275,
    34579,
    31647,
    38859,
    39075
  ];

  const hrefs = [
    '#songs/Thank-You-Hashem',
    '#songs/Vhareinu',
    '#songs/Yirei Shomayim',
    '#songs/Nafshi',
    '#songs/Vzakeini',
    '#songs/Abba'
  ];

  // Create containers dynamically with individual image sources, titles, and artists
  for (let i = 0; i < 6; i++) {
    const repeaterItem = document.createElement('a');
    repeaterItem.classList.add('repeater-row-item');
    repeaterItem.href = hrefs[i];
    repeaterItem.innerHTML = `
      <div class="image-container">
        <img src="${imageSources[i]}" alt="Album Artwork">
        <div class="overlay-1st" data-number="${audioNumbers[i]}">
          <div class="play-button" style="display: block;">
            <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play Button" style="width: 50px; height: 50px; margin: 25px;">
          </div>
          <div class="pause-button" style="display: none;">
            <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause Button" style="width: 50px; height: 50px; margin: 25px;">
          </div>
        </div>
      </div>
      <div class="repeater-text">
        <div class="text-row">${albumTitles[i]}</div>
        <div class="text-row-small">${artists[i]}</div>
      </div>`;

    repeaterRow.appendChild(repeaterItem);
  }

  // Add event listener for hover effect on repeater items
  const repeaterItems = document.querySelectorAll('.repeater-row-item');
  repeaterItems.forEach(item => {
    const overlay = item.querySelector('.overlay-1st');
    const playButton = item.querySelector('.play-button');
    const pauseButton = item.querySelector('.pause-button');
    const number = overlay.getAttribute('data-number');

    item.addEventListener('mouseenter', () => {
      if (!overlay.classList.contains('playing')) {
        overlay.style.opacity = '1';
      }
    });

    item.addEventListener('mouseleave', () => {
      if (!overlay.classList.contains('playing')) {
        overlay.style.opacity = '0';
      }
    });

    playButton.addEventListener('click', (event) => {
      event.preventDefault();
      togglePlayPause(number, overlay, playButton, pauseButton);
    });

    pauseButton.addEventListener('click', (event) => {
      event.preventDefault();
      togglePlayPause(number, overlay, playButton, pauseButton);
    });
  });


  // Function to update player details
  function updatePlayerDetails(number) {
    const index = audioNumbers.indexOf(parseInt(number));
    if (index !== -1) {
      document.getElementById('image-artwork').src = imageSources[index];
      const textRows = document.querySelectorAll('.repeater-text .text-row-player');
      textRows[0].textContent = albumTitles[index];
      textRows[1].textContent = `${artists[index]}`;
    }
  }

  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.addEventListener('ended', () => {
    const currentPlayingOverlay = document.querySelector('.overlay-1st.playing');
    if (currentPlayingOverlay) {
      currentPlayingOverlay.classList.remove('playing');
      currentPlayingOverlay.style.opacity = '0';
    }
  });
});

      const searchInput = document.getElementById('search-input');
      const voiceIconContainer = document.getElementById('voice-icon-container');
  
      searchInput.addEventListener('focus', () => {
        voiceIconContainer.style.display = 'none';
      });
  
      searchInput.addEventListener('blur', () => {
        voiceIconContainer.style.display = 'flex';
      });
      document.addEventListener('DOMContentLoaded', function () {
        const searchInput = document.getElementById('search-input');
        const voiceIconContainer = document.querySelector('.voice-icon-container');
  
        // Check if the browser supports the Web Speech API
        if ('webkitSpeechRecognition' in window) {
          const recognition = new webkitSpeechRecognition();
  
          // Configure recognition settings if needed
          // recognition.continuous = true;
          // recognition.interimResults = true;
  
          // Event triggered when speech recognition starts
          recognition.onstart = function () {
            console.log('Speech recognition started');
          };
  
          // Event triggered when speech recognition ends
          recognition.onend = function () {
            console.log('Speech recognition ended');
          };
  
          // Event triggered when speech is recognized
          recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
          };
  
          // Event triggered when the microphone icon is clicked
          voiceIconContainer.addEventListener('click', function () {
            recognition.start();
          });
        } else {
          // Handle case where Web Speech API is not supported
          console.log('Web Speech API not supported');
        }
      });
      document.addEventListener("DOMContentLoaded", function () {
        const containerRepeater = document.querySelector('.container-repeater');
      
        // Array of objects containing image URLs, album titles, and artists
        const albums = [
          {
            imageSource: 'tyh.jpg',
            albumTitle: 'Thank You Hashem',
            artist: 'Joey Newcomb, Moshe Storch'
          },
          {
            imageSource: 'vhareinu.jpg',
            albumTitle: 'Vhareinu',
            artist: 'Shlomo Yehuda Rechnitz'
          },
          {
            imageSource: 'yirei shomayim.jpg',
            albumTitle: 'Yirei Shomayim',
            artist: 'Shmueli Ungar'
          },
          {
            imageSource: 'nafshi.jpg',
            albumTitle: 'Nafshi',
            artist: 'Ishey Ribo, Motty Shteinmetz'
          },
          {
            imageSource: 'vzakeini.jpg',
            albumTitle: 'Vzakeini',
            artist: 'Benny Friedman, Baruch Levine'
          },
          {
            imageSource: 'abba.jpg',
            albumTitle: 'Abba',
            artist: 'Avraham Fried, Ari Hill'
          }
          // Add more albums as needed
        ];
      
        // Create containers dynamically with individual image sources, titles, and artists
        albums.forEach((album) => {
          const containerItem = document.createElement('div');
          containerItem.classList.add('container-item');
          containerItem.innerHTML = `
            <img src="${album.imageSource}" alt="Album Artwork">
            <div class="text-content">
              <div class="album-title">${album.albumTitle}</div>
              <div class="artist">${album.artist}</div>
            </div>`;
          containerRepeater.appendChild(containerItem);
        });
      });

    
      document.addEventListener("DOMContentLoaded", function () {
        const containerRepeater = document.getElementById('devices-repeater');
        
        const devices = [
            {
              icon: 'https://img.icons8.com/ios/512/ffffff/earbud-headphones-airpods-pro.png',
              name: 'Earphones',
              description: 'Your Earphones Setting',
              link: '#device1'
            },
            {
              icon: 'https://img.icons8.com/ios/512/ffffff/iphone14-pro.png',
              name: 'Phone',
              description: 'Your Phone Settings',
              link: '#device2'
            },
            {
              icon: 'https://img.icons8.com/ios/512/ffffff/apple-watch.png',
              name: 'Smartwatch',
              description: 'Your Smartwatch Settings',
              link: '#device3'
            },
            {
              icon: 'https://img.icons8.com/ios/512/ffffff/aipods-pro-max.png',
              name: 'Headphones',
              description: 'Your Headphones Settings',
              link: '#device3'
            },
            {
              icon: 'https://img.icons8.com/ios/512/ffffff/tesla-model-3.png',
              name: 'Car App',
              description: 'Your Car App Settings',
              link: '#device3'
            },
            {
              icon: 'https://img.icons8.com/ios/512/ffffff/mac-book-air.png',
              name: 'Laptop',
              description: 'Your Laptop Settings',
              link: '#device3'
            }
                      ];

        // Function to create URL-friendly strings (if needed)
        function createSlug(name) {
            return name.toLowerCase().replace(/\s+/g, '-');
        }

        // Create containers dynamically with device data
        devices.forEach(device => {
            const containerItem = document.createElement('div');
            containerItem.classList.add('devices-repeater-item');

            // Create the link element that will wrap the entire containerItem
            const link = document.createElement('a');
            link.href = device.link;
            link.classList.add('device-link'); // Add a class for styling if needed

            // Append content to containerItem
            containerItem.innerHTML = `
                <img src="${device.icon}" alt="${device.name}">
                <div class="text-content">
                    <div class="device-name">${device.name}</div>
                    <div class="device-description">${device.description}</div>
                </div>
            `;

            // Append the containerItem to the link
            link.appendChild(containerItem);

            // Append the link to the repeater container
            containerRepeater.appendChild(link);
        });
    });


      const fullscreenTooltip = document.getElementById('fullscreenTooltip');

  function toggleFullScreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  document.addEventListener("fullscreenchange", function () {
    const fullScreenIcon = document.getElementById("fullScreenIcon");
    if (document.fullscreenElement) {
        fullScreenIcon.textContent = "close_fullscreen";
        fullscreenTooltip.textContent = 'Exit Fullscreen'; 
        
    } else {
        fullScreenIcon.textContent = "open_in_full";
        fullscreenTooltip.textContent = 'Fullscreen'; 

    }
});

  document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('myAudioPlayer');

    audioPlayer.addEventListener('loadeddata', () => {
        audioPlayer.addEventListener('click', togglePictureInPicture);
    });

    function togglePictureInPicture() {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture()
                .catch(error => {
                    // Error handling
                    console.error(error);
                });
        } else {
            audioPlayer.requestPictureInPicture()
                .catch(error => {
                    // Error handling
                    console.error(error);
                });
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {
  const containerRepeater = document.querySelector('.repeater-row-artists');

  // Array of image URLs, album titles, and artists
  const imageSources = [
    'https://i.scdn.co/image/ab67616d00001e0286db2cbac1086427689e0698',
    'https://i.scdn.co/image/ab67616d00001e02805add922507f1d2738f9b48',
    'https://i.scdn.co/image/ab6761610000517457c3ae00a8847574691f200b',
    'https://i.scdn.co/image/ab67616100005174f56878dbd4174c0cb6824861',
    'https://static.wixstatic.com/media/287026_ee5184fda26c4b3db2bfdd002a545432~mv2.jpg/v1/fill/w_980,h_988,al_t,q_85,usm_0.66_1.00_0.01,enc_auto/287026_ee5184fda26c4b3db2bfdd002a545432~mv2.jpg',
    'https://i.scdn.co/image/ab67616100005174e90be2bacc1964ae1a412505',
    'https://yt3.googleusercontent.com/KAymBPt3yXDxmiuFQcJlDW-kM59eFIL9s_7Mf_lFIHgsYdCS4Ryr3tRPu1IpovZqa-nkfjBiqA=s900-c-k-c0x00ffffff-no-rj',
    'https://yt3.googleusercontent.com/xo5Hx0SJ-v26Ku8HF2fLwNKGhE8vkRJVZXwTQi2phBfMNz84NP_WgEeNIBCHQXybCrYGMrZH=s900-c-k-c0x00ffffff-no-rj',
    'https://i.scdn.co/image/ab67616100005174e44797ad3f5bf09fdac5b1cb'
  ];

  const artistsTitles = [
    'Singer',
    'Singer',
    'Singer',
    'Singer',
    'Singer',
    'Singer',
    'DJ',
    'Singer',
    'Singer'
  ];

  const artists = [
    'Joey Newcomb',
    'Shlomo Yehuda Rechnitz',
    'Shmueli Ungar',
    'Motty Shteinmetz',
    'Benny Friedman',
    'Baruch Levine',
    'Shmili Landau',
    'Avraham Fried',
    'Ari Hill'
  ];

  // Function to create URL-friendly strings
  function createSlug(name) {
    return name.toLowerCase().replace(/\s+/g, '-');
  }

  // Create containers dynamically with individual image sources, titles, and artists
  for (let i = 0; i < imageSources.length; i++) {
    const containerItem = document.createElement('div');
    containerItem.classList.add('repeater-row-artists-item');

    const artistSlug = createSlug(artists[i]);
    const artistHref = `#artists/${artistSlug}`;

    containerItem.innerHTML = `
      <a href="${artistHref}">
        <img src="${imageSources[i]}" alt="Album Artwork">
      </a>
      <div class="text-content">
        <a href="${artistHref}">
          <div class="artist-name">${artists[i]}</div>
        </a>
        <div class="artist-title">${artistsTitles[i]}</div>
      </div>
    `;
    containerRepeater.appendChild(containerItem);
  }
});



document.addEventListener("DOMContentLoaded", function () {
  const uparrowButton = document.getElementById("uparrow-button");
  const imageRow = document.getElementById("image-row");
  const leftColumn = document.getElementById("leftColumn");
  const imageArtwork = document.getElementById("image-artwork");

  if (uparrowButton && imageRow && leftColumn && imageArtwork) {
      uparrowButton.addEventListener("click", function () {
          if (imageRow.style.height === "0px" || imageRow.style.height === "") {
              const newHeight = leftColumn.offsetWidth + "px";
              imageRow.style.height = newHeight;
              imageRow.innerHTML = `<img src="${imageArtwork.src}" id="expanded-artwork">`;
          } else {
              imageRow.style.height = "0px";
              imageRow.innerHTML = "";
          }
      });
  } else {
      console.error("One or more elements not found");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const dropdownButton = document.getElementById("dropdown-button");
  const dropdownContent = document.getElementById("dropdown-content");

  dropdownButton.addEventListener("click", function() {
    dropdownContent.classList.toggle("show");
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener("click", function(event) {
    if (!event.target.matches("#dropdown-button")) {
      if (dropdownContent.classList.contains("show")) {
        dropdownContent.classList.remove("show");
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const containerRepeater = document.querySelector('.artist-repeater');

  // Array of image URLs, album titles, and artists
  const imageSources = [
    'd1ad37ce2a7c4653adeb010b8705e5e8.jpg',
    'https://i.scdn.co/image/ab67616d00001e024f38f5bd8aab2b846be24f54',
    'https://i.scdn.co/image/ab67616d0000b273b84d0390c6126d840b139483',
    'abba.jpg'
  ];

  const albumTitles = [
    'Riboin Haolumim',
    'Ototo',
    'Retzoneinu',
    'Abba'
  ];

  const length = [
    '6:29',
    '3:48',
    '6:23',
    '3:55'
  ];

  const album = [
    'Riboin Haolumim',
    'Ototo',
    'Retzoneinu',
    'Abba'
  ]
  // Create containers dynamically with individual image sources, titles, and artists
  for (let i = 0; i < 4; i++) {
    const containerItem = document.createElement('div');
    containerItem.classList.add('container-item-artist');
    containerItem.innerHTML = `
<img class="upnextimg" src="${imageSources[i]}" alt="Album Artwork">
<div class="upnext-text-content">
  <div class="upnext-album-title">${albumTitles[i]}</div>
      <div class="singer-albums">${album[i]}</div>
  <div class="upnext-artist">${length[i]}</div>
</div>`;
    containerRepeater.appendChild(containerItem);
  }
});

function focusCard(element) {
  const users = document.querySelectorAll('.user');
  users.forEach(user => user.classList.remove('focused'));

  element.classList.add('focused');
}

function toggleMale() {
  document.getElementById('toggleSlidergender').checked = false;
}

function toggleFemale() {
  document.getElementById('toggleSlidergender').checked = true;
}

function toggleFirstHalf() {
  document.getElementById('toggleSlidersefira').checked = false;
}

function toggleSeondHalf() {
  document.getElementById('toggleSlidersefira').checked = true;
}

function toggleAccapela() {
  document.getElementById('toggleSlideraccapela').checked = false;
}

function toggleNoAccapela() {
  document.getElementById('toggleSlideraccapela').checked = true;
}

document.addEventListener("DOMContentLoaded", function () {
  // Function to scroll to the top of the anchor element
  function scrollToAnchor() {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth"
        });
      }
    }
  }

  // Listen for hash changes
  window.addEventListener("hashchange", scrollToAnchor);

  // Scroll to the anchor if there's already a hash in the URL on page load
  scrollToAnchor();
});


document.addEventListener("DOMContentLoaded", function () {
const repeaterRow = document.getElementById('friedrepeater');

// Array of image URLs, album titles, artists, and audio numbers
const imageSources = [
'tyh.jpg',
'vhareinu.jpg',
'yirei shomayim.jpg',
'nafshi.jpg',
'vzakeini.jpg',
'abba.jpg'
];

const albumTitles = [
'Thank You Hashem',
'Vhareinu',
'Yirei Shomayim',
'Nafshi',
'Vzakeini',
'Abba'
];

const artists = [
'Joey Newcomb, Moshe Storch',
'Shlomo Yehuda Rechnitz',
'Shmueli Ungar',
'Ishey Ribo, Motty Shteinmetz',
'Benny Friedman, Baruch Levine',
'Avraham Fried, Ari Hill'
];

const audioNumbers = [
38473,
39275,
34579,
31647,
38859,
39075
];

const hrefs = [
'#songs/Thank-You-Hashem',
'#songs/Vhareinu',
'#songs/Yirei Shomayim',
'#songs/Nafshi',
'#songs/Vzakeini',
'#songs/Abba'
];

// Create containers dynamically with individual image sources, titles, and artists
for (let i = 0; i < 6; i++) {
const repeaterItem = document.createElement('a');
repeaterItem.classList.add('repeater-row-item');
repeaterItem.href = hrefs[i];
repeaterItem.innerHTML = `
<div class="image-container">
  <img src="${imageSources[i]}" alt="Album Artwork">
  <div class="overlay-1st" data-number="${audioNumbers[i]}">
    <div class="play-button" style="display: block;">
      <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play Button" style="width: 50px; height: 50px; margin: 25px;">
    </div>
    <div class="pause-button" style="display: none;">
      <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause Button" style="width: 50px; height: 50px; margin: 25px;">
    </div>
  </div>
</div>
<div class="repeater-text">
  <div class="text-row">${albumTitles[i]}</div>
  <div class="text-row-small">${artists[i]}</div>
</div>`;

repeaterRow.appendChild(repeaterItem);
}

// Add event listener for hover effect on repeater items
const repeaterItems = document.querySelectorAll('.repeater-row-item');
repeaterItems.forEach(item => {
const overlay = item.querySelector('.overlay-1st');
const playButton = item.querySelector('.play-button');
const pauseButton = item.querySelector('.pause-button');
const number = overlay.getAttribute('data-number');

item.addEventListener('mouseenter', () => {
if (!overlay.classList.contains('playing')) {
  overlay.style.opacity = '1';
}
});

item.addEventListener('mouseleave', () => {
if (!overlay.classList.contains('playing')) {
  overlay.style.opacity = '0';
}
});

playButton.addEventListener('click', (event) => {
event.preventDefault();
togglePlayPause(number, overlay, playButton, pauseButton);
});

pauseButton.addEventListener('click', (event) => {
event.preventDefault();
togglePlayPause(number, overlay, playButton, pauseButton);
});
});

function togglePlayPause(number, overlay, playButton, pauseButton) {
// Add audio file URLs corresponding to each number
const audioFiles = {
38473: 'Thank you Hashem.',
39275: 'Vhareinu.',
34579: 'Yirei Shomayim.',
31647: 'Nafshi.',
38859: 'Vzakeini.',
39075: 'Abba.'
};

const audioPlayer = document.getElementById('audioPlayer');
const audioSource = document.getElementById('audioSource');

if (audioFiles[number]) {
if (!overlay.classList.contains('playing')) {
  // Stop currently playing audio
  const currentPlayingOverlay = document.querySelector('.overlay-1st.playing');
  if (currentPlayingOverlay) {
    currentPlayingOverlay.classList.remove('playing');
    currentPlayingOverlay.style.opacity = '0';
  }

  // Play new audio
  audioSource.src = audioFiles[number];
  audioPlayer.load();
  audioPlayer.play();

  // Update UI
  overlay.classList.add('playing');
  overlay.style.opacity = '1';
  playButton.style.display = 'none';
  pauseButton.style.display = 'block';

  // Update player details
  updatePlayerDetails(number);
} else {
  audioPlayer.pause();
  overlay.classList.remove('playing');
  overlay.style.opacity = '0';
  playButton.style.display = 'block';
  pauseButton.style.display = 'none';
}
} else {
console.error('Audio file not found for number:', number);
}
}

// Function to update player details
function updatePlayerDetails(number) {
const index = audioNumbers.indexOf(parseInt(number));
if (index !== -1) {
document.getElementById('image-artwork').src = imageSources[index];
const textRows = document.querySelectorAll('.repeater-text .text-row-player');
textRows[0].textContent = albumTitles[index];
textRows[1].textContent = `${artists[index]}`;
}
}

const audioPlayer = document.getElementById('audioPlayer');
audioPlayer.addEventListener('ended', () => {
const currentPlayingOverlay = document.querySelector('.overlay-1st.playing');
if (currentPlayingOverlay) {
currentPlayingOverlay.classList.remove('playing');
currentPlayingOverlay.style.opacity = '0';
}
});
});

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000);
}

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function openNav1() {
  document.getElementById("myNav1").style.width = "100%";
}

function closeNav1() {
  document.getElementById("myNav1").style.width = "0%";
}


$(document).ready(function() {
  // Initially hide "Songs" option
  $('.category-option1:contains("Songs")').addClass('hidden1');
  
  $('.category-title1').click(function() {
      $(this).toggleClass('active1');
      $('.category-options1').toggleClass('active1');
      $('.category-selector1').toggleClass('expanded1');
  });
  
  $('.category-option1').click(function() {
      var htmlContent = $(this).html().trim(); // Get HTML content including the icon
      $('#selected-category1').html(htmlContent); // Set HTML content to include the icon
      $('.category-title1').removeClass('active1');
      $('.category-options1').removeClass('active1');
      $('.category-selector1').removeClass('expanded1');
      $('.category-option1').removeClass('hidden1'); // Show all options
      $(this).addClass('hidden1'); // Hide the selected option
  });
});

  function updateSelectedFeature() {
      var hash = window.location.hash;

      // Remove the selected class from all links
      $('a').removeClass('selected1');

      if (hash === '#services') {
          $('.services-link1').addClass('selected1');
          $('.category-option1').removeClass('hidden1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#playlists/liked') {
          $('.likes-link1').addClass('selected1');
          $('.category-option1').removeClass('hidden1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#queue') {
          $('.queue-link1').addClass('selected1');
          $('.category-option1').removeClass('hidden1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#devices') {
          $('.devises-link1').addClass('selected1');
          $('.category-option1').removeClass('hidden1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#') {
          $('.home-link1').addClass('selected1');
          $('.category-option1').removeClass('hidden1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#ezj-special') {
          $('.ezjspecial-link1').addClass('selected1');
          $('.category-option1').removeClass('hidden1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
      } else {
          $('.home-link1').addClass('selected1');
          $('.category-option1').removeClass('hidden1');
          $('.category-option1:contains("Song")').addClass('hidden1');
      }
  }

    // Call the function on page load
    updateSelectedFeature();

    // Call the function on hash change
    $(window).on('hashchange', function() {
        updateSelectedFeature();
    });


const playPauseButton = document.querySelector('.play-pause-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const timeBar = document.querySelector('.time-bar');
const currentTimeElement = document.querySelector('.current-time');
const durationTimeElement = document.querySelector('.duration-time');
const audio = document.getElementById('audio');

let isPlaying = false;

audio.addEventListener('loadedmetadata', () => {
    durationTimeElement.textContent = formatTime(audio.duration);
    timeBar.max = audio.duration;
});

audio.addEventListener('timeupdate', () => {
    currentTimeElement.textContent = formatTime(audio.currentTime);
    timeBar.value = audio.currentTime;
});

function togglePlayPause() {
    isPlaying = !isPlaying;
    const playPauseIcon = playPauseButton.querySelector('i');
    if (isPlaying) {
        playPauseIcon.classList.remove('fa-play-circle');
        playPauseIcon.classList.add('fa-pause-circle');
        audio.play();
    } else {
        playPauseIcon.classList.remove('fa-pause-circle');
        playPauseIcon.classList.add('fa-play-circle');
        audio.pause();
    }
}

function updateTimeBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    timeBar.value = progress;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

playPauseButton.addEventListener('click', togglePlayPause);
prevButton.addEventListener('click', () => {
    // Logic for previous track
    // Adjust accordingly if you have a playlist
});
nextButton.addEventListener('click', () => {
    // Logic for next track
    // Adjust accordingly if you have a playlist
});
timeBar.addEventListener('input', () => {
    audio.currentTime = timeBar.value;
    updateTimeBar();
});

// Update time bar and timestamp display periodically
setInterval(() => {
    if (isPlaying) {
        updateTimeBar();
    }
}, 1000);
