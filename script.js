// Function to toggle the lightbox visibility
    function toggleLightbox() {
      const lightbox = document.getElementById("lightboxOverlay");
      lightbox.style.display = (lightbox.style.display === "flex") ? "none" : "flex";
    }

// Function to get the ordinal suffix for a date
       function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th'; // covers 11th to 20th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    // Function to update date
    function updateDate() {
        const today = new Date();
        const dayOfWeek = today.toLocaleDateString(undefined, { weekday: 'long' }); // Get day of the week
        const day = today.getDate(); // Get day of the month
        const suffix = getOrdinalSuffix(day); // Get ordinal suffix
        const month = today.toLocaleDateString(undefined, { month: 'long' });
        const year = today.getFullYear();

        const formattedDate = `${dayOfWeek}, ${month} ${day}${suffix}, ${year}`;

        // Display the date in the HTML element with id 'datetime'
        document.getElementById('datetime').textContent = ` ${formattedDate}`;
    }

    // Initial call to display the date immediately
    updateDate();

  
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
                  'MST-1azpDYc?',
                  'vp3BvqDa4bU',
                  '_rYPW4QzwG8',
                  'D_p6W4-ZPeg',
                  'GX1XGmT43BI'
              ];
  
              const albumTitles = [
                  'Umar Rebbi Yochanon',
                  'Tzoin Kedushim',                
                  'The Yomi',
                  'A Fire',
                  'Abba'
              ];
  
              const artists = [
                  'Shulem Lemmer',
                  'Lipa Schmeltser',                
                  'Nissim Black',
                  'Shmueli Ungar',
                  'Mordechai Shapiro'
              ];
  
              // Create containers dynamically with individual YouTube video embeds, titles, and artists
              for (let i = 0; i < 5; i++) {
                  const repeaterItem = document.createElement('div');
                  repeaterItem.classList.add('video-repeater-row-item');
                  repeaterItem.innerHTML = `
                      <div class="video-image-container">
                          <iframe width="350px" height="190" src="https://www.youtube.com/embed/${videoSources[i]}" frameborder="0" allowfullscreen style= "border-radius: 5px;"></iframe>
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
            
                // Array of service items
                const services = [
                     {
                        image: 'https://img.icons8.com/ios-filled/512/FFFFFF/alarm-clock--v1.png',
                        title: 'Set Alarm',
                        description: 'Set an alarm for any time and to your favrite song',
                        link: '#services/alarm'
                    },
                    {
                        image: 'contact-us.png',
                        title: 'Contact Us',
                        description: 'You can contact us for anything you want new features, report bugs or anything else you want us to know, even a thank you.',
                        link: '#services/contact-us'
                    },
                    {
                        image: 'request-a-song.png',
                        title: 'Request A Song',
                        description: 'We now offer the ability to request a song. Send us the song name (and singer if possible) and We will try our best to get it for you.',
                        link: '#services/request-a-song'
                    },
                    {
                        image: 'https://img.icons8.com/material-rounded/1028/FFFFFF/download--v1.png',
                        title: 'Download App',
                        description: 'Download the app of EZJ Music and be able to use almost all of our services offline.',
                        link: '#services', // This will be replaced with the onclick attribute
                        onclick: 'openNav()'
                    },
                    {
                      image: 'https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/512/FFFFFF/external-live-radio-vitaliy-gorbachev-fill-vitaly-gorbachev.png',
                      title: 'Concerts',
                      description: 'You can expreriance live concerts from the comfort of your home all within EZJ Music',
                      link: '#services/concerts'
                    },
                    {
                      image: 'https://img.icons8.com/material-rounded/512/FFFFFF/buy.png',
                      title: 'Buy',
                      description: 'There is now the option to have a dedicated device for listening to EZJ Music',
                      link: '#services/Buy'
                    },
                    {
                      image: 'https://img.icons8.com/ios-filled/512/FFFFFF/post-ads.png',
                      title: 'Adverts',
                      description: 'For adertising options on EZJ Music you can decide',
                      link: '#services/Adverts'
                    }
                    // Add more services as needed
                ];
            

    // Create containers dynamically with service data
    services.forEach((service, index) => {
      const containerItem = document.createElement('a');
      containerItem.classList.add('container-item-services');
      containerItem.id = `container-item-${index}`; // Assign unique ID to each container
      containerItem.href = service.link || '#'; // Set link or '#' as fallback

      // Add onclick attribute if defined
      if (service.onclick) {
          containerItem.setAttribute('onclick', service.onclick);
      }

      containerItem.innerHTML = `
          <img src="${service.image}" alt="Service Image">
          <div class="text-content-services">
              <div class="service">${service.title}</div>
              <div class="description">${service.description}</div>
          </div>`;

      containerRepeater.appendChild(containerItem);
  });
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
        prevButton.innerHTML = '<img width="30" height="30" src="https://img.icons8.com/ios-filled/512/3333ff/forward--v1.png" style="transform: scaleX(-1); margin-left: -2px;">'
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



function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function openNav1() {
  document.getElementById("myNav1").style.left = "0px";
}

function closeNav1() {
  document.getElementById("myNav1").style.left = "-200px";
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
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#playlists/liked') {
          $('.likes-link1').addClass('selected1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#queue') {
          $('.queue-link1').addClass('selected1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#news') {
          $('.devises-link1').addClass('selected1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#') {
          $('.home-link1').addClass('selected1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
        } else if (hash === '#ezj-special') {
          $('.ezjspecial-link1').addClass('selected1');
          $('.category-option1:contains("Menu")').addClass('hidden1');
      } else {
          $('.home-link1').addClass('selected1');
          $('.category-option1:contains("Song")').addClass('hidden1');
      }
  }

    // Call the function on page load
    updateSelectedFeature();

    // Call the function on hash change
    $(window).on('hashchange', function() {
        updateSelectedFeature();
    });

    function getTimeOfDay() {
      const now = new Date();
      const hour = now.getHours();

      if (hour >= 4 && hour < 12) {
        return "Good Morning";
      } else if (hour >= 12 && hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    }

    document.getElementById("greeting").innerText = getTimeOfDay();

 // Function to toggle the category selector
function toggleandthenCategory() {
  var categorySelector = document.getElementById("andthen-category-selector");
  categorySelector.classList.toggle("active"); // Toggle the 'active' class
}

// Function to select a category
function selectandthenCategory(category) {
  // Update the displayed category
  document.getElementById("andthen-current-category").innerText = category;

  // Hide the selected category from the sidebar
  hideandthenSelectedOption(category);

  // Highlight the selected category option
  highlightandthenSelectedOption(category);

  // Close the category selector
  toggleandthenCategory();
}

// Function to hide the selected option in the sidebar
function hideandthenSelectedOption(selectedCategory) {
  var options = document.querySelectorAll('.andthen-sidebar a');

  options.forEach(function(option) {
      if (option.textContent.trim() === selectedCategory) {
          option.style.display = 'none'; // Hide selected category from sidebar
      }
  });
}

// Function to highlight the selected category option
function highlightandthenSelectedOption(selectedCategory) {
  var options = document.querySelectorAll('.andthen-category-option');

  options.forEach(function(option) {
      // Remove 'selected' class from all options
      option.classList.remove('selected');
      
      // Add 'selected' class to the clicked option
      if (option.textContent.trim() === selectedCategory) {
          option.classList.add('selected');
      }
  });
}

// Function to get all scrollable elements in the document
const getScrollableElements = () => {
    const allElements = document.getElementsByTagName('*');
    const scrollableElements = [];
    
    for (const element of allElements) {
        const style = window.getComputedStyle(element);
        const overflow = style.getPropertyValue('overflow');
        const overflowY = style.getPropertyValue('overflow-y');
        const overflowX = style.getPropertyValue('overflow-x');
        
        // Check if element is scrollable
        if (
            (overflow === 'auto' || overflow === 'scroll') ||
            (overflowY === 'auto' || overflowY === 'scroll') ||
            (overflowX === 'auto' || overflowX === 'scroll')
        ) {
            // Verify element actually has scrollable content
            if (
                element.scrollHeight > element.clientHeight ||
                element.scrollWidth > element.clientWidth
            ) {
                scrollableElements.push(element);
            }
        }
    }
    
    return scrollableElements;
};

// Function to reset scroll position of all scrollable elements
const resetAllScrollPositions = () => {
    // Reset main window scroll
    window.scrollTo(0, 0);
    
    // Reset all scrollable elements
    const scrollableElements = getScrollableElements();
    scrollableElements.forEach(element => {
        element.scrollTo(0, 0);
    });
};

// Listen for hash changes in URL
window.addEventListener('hashchange', resetAllScrollPositions);

// Store references to YouTube players
const youtubePlayerMap = new Map();

// Function to pause all HTML5 audio elements
const pauseAllAudio = () => {
  document.querySelectorAll('audio').forEach(audio => {
      if (!audio.paused) {
          audio.pause();
      }
  });
};

// Function to pause all HTML5 video elements
const pauseAllHTML5Videos = () => {
  document.querySelectorAll('video').forEach(video => {
      if (!video.paused) {
          video.pause();
      }
  });
};

// Function to pause all YouTube videos
const pauseAllYouTubeVideos = () => {
  youtubePlayerMap.forEach((player, iframeId) => {
      try {
          const state = player.getPlayerState();
          if (state === YT.PlayerState.PLAYING) {
              player.pauseVideo();
          }
      } catch (e) {
          console.warn(`Could not pause YouTube video ${iframeId}:`, e);
      }
  });
};

// Function to pause all media except YouTube
const pauseAllMediaExceptYouTube = () => {
  pauseAllAudio();
  pauseAllHTML5Videos();
};

// Function to handle anchor visibility and video control
const handleAnchorChange = () => {
  const hash = window.location.hash;
  if (!hash) return;

  const targetElement = document.querySelector(hash);
  if (!targetElement) return;

  // Reset scrolls
  window.scrollTo(0, 0);
  getScrollableElements().forEach(element => {
      element.scrollTo(0, 0);
  });


};

// Initialize YouTube API
const loadYouTubeAPI = () => {
  if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
};

// Setup YouTube player when API is ready
window.onYouTubeIframeAPIReady = () => {
  document.querySelectorAll('iframe').forEach(iframe => {
      if (iframe.src.includes('youtube')) {
          // Ensure unique ID for each iframe
          if (!iframe.id) {
              iframe.id = 'youtube-player-' + Math.random().toString(36).substr(2, 9);
          }
          
          // Ensure correct API parameters
          if (!iframe.src.includes('enablejsapi=1')) {
              let newSrc = iframe.src;
              newSrc += (newSrc.includes('?') ? '&' : '?') + 'enablejsapi=1';
              iframe.src = newSrc;
          }

          // Create YouTube player
          const player = new YT.Player(iframe.id, {
              events: {
                  'onStateChange': (event) => {
                      if (event.data === YT.PlayerState.PLAYING) {
                          // Pause all other media when this video starts playing
                          pauseAllMediaExceptYouTube();
                          // Pause all other YouTube videos
                          youtubePlayerMap.forEach((otherPlayer, otherId) => {
                              if (otherId !== iframe.id && otherPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                                  otherPlayer.pauseVideo();
                              }
                          });
                      }
                  }
              }
          });
          
          youtubePlayerMap.set(iframe.id, player);
      }
  });
};

// Add event listeners for HTML5 media elements
document.addEventListener('DOMContentLoaded', () => {
  // Handle HTML5 video play events
  document.querySelectorAll('video').forEach(video => {
      video.addEventListener('play', () => {
          // Pause all audio
          pauseAllAudio();
          // Pause other videos
          document.querySelectorAll('video').forEach(otherVideo => {
              if (otherVideo !== video && !otherVideo.paused) {
                  otherVideo.pause();
              }
          });
          // Pause YouTube videos
          pauseAllYouTubeVideos();
      });
  });

  // Handle HTML5 audio play events
  document.querySelectorAll('audio').forEach(audio => {
      audio.addEventListener('play', () => {
          // Pause all videos (both HTML5 and YouTube)
          pauseAllHTML5Videos();
          pauseAllYouTubeVideos();
          // Pause other audio
          document.querySelectorAll('audio').forEach(otherAudio => {
              if (otherAudio !== audio && !otherAudio.paused) {
                  otherAudio.pause();
              }
          });
      });
  });
});

// Listen for hash changes
window.addEventListener('hashchange', handleAnchorChange);

// Initial load
loadYouTubeAPI();
handleAnchorChange();
// Sample data with detailed structure

const suggestionsData = [
  {
    image: 'https://i.scdn.co/image/ab67616d00001e0211848cabe10917c8aadba543',
    title: 'Simchas Torah Upmix',
    artist: 'Thank You Hashem, The Early Shabbos Band',
    number: 345234,
    href: '#songs/Simchas-Torah-Upmix',
    category: 'Songs',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0420/2505/files/photo_2024-01-13_17-28-44.jpg?v=1705602649',
    title: 'Borchu',
    artist: 'Zanvil Weinberger',
    number: 395994,
    href: '#songs/Borchu',
    category: 'Songs',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0420/2505/files/photo_2024-06-10_14-06-30.jpg?v=1718045094',
    title: 'Tuni Rabunun',
    artist: 'Avraham Fried, Heshy Weinberger',
    number: 367544,
    href: '#songs/Tuni-Rabubun',
    category: 'Songs',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0420/2505/files/photo_2023-06-28_06-00-23.jpg?v=1687968293',
    title: 'Shvitzn',
    artist: 'Ari Samet',
    number: 357465,
    href: '#songs/Shvitzn',
    category: 'Songs',
  },
  {
    image: 'https://cdn.shopify.com/s/files/1/0420/2505/products/photo_2023-02-26_18-28-38.jpg?v=1677522243',
    title: 'Vaani Evtach Boch',
    artist: 'Matt Dubb, Beri Weber, Shmuli Ungar',
    number: 367039,
    href: '#songs/Vaani-Evtach-Boch',
    category: 'Songs',
  },
  {
    image: 'tyh.jpg',
    title: 'Thank You Hashem',
    artist: 'Joey Newcomb, Moshe Storch',
    number: 382473,
    href: '#songs/Thank-You-Hashem',
    category: 'Songs',
  },
  {
    image: 'https://tn2tn.github.io/podcast/assets/images/episode08.png',
    title: 'Simcha Dynamics',
    artist: 'Tn 2 Tn Podcast',
    number: 142536,
    href: '#Podcasts/Tn2Tn',
    category: 'Podcasts',
  },
  {
    image: 'https://i.scdn.co/image/ab67656300005f1f5acd8bf2ab131662f9dc12b4',
    title: 'Daily Dose: 2129',
    artist: 'Torah Anytime',
    number: 102129,
    href: '#Podcasts/Daily-Dose',
    category: 'Podcasts',
  },
  {
    image: 'Untitled (24).png',
    title: 'Terror In Turkey',
    artist: 'Tn 2 Tn Podcast',
    number: 567567,
    href: '#Stories/Terror-In-Turkey',
    category: 'Stories',
  },
];

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const suggestionsList = document.getElementById('suggestions');
  const searchForm = document.querySelector('.search-form');

  searchInput.addEventListener('input', onInput);
  document.addEventListener('click', onClickOutside);

  function onInput(e) {
    const query = e.target.value.trim().toLowerCase();
    const currentCategory = document.getElementById('andthen-current-category').textContent.trim();
    suggestionsList.innerHTML = '';
  
    if (query === '') {
      suggestionsList.style.display = 'none';
      searchForm.classList.remove('active');
      return;
    }
  
    // Filter suggestions based on the query and current category
    const filteredSuggestions = suggestionsData.filter(item =>
      (item.title.toLowerCase().includes(query) || item.artist.toLowerCase().includes(query)) &&
      item.category.toLowerCase() === currentCategory.toLowerCase()
    );
  
    if (filteredSuggestions.length === 0) {
      suggestionsList.style.display = 'none';
      searchForm.classList.remove('active');
      return;
    }
  
    filteredSuggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.setAttribute('role', 'option');
  
      const img = document.createElement('img');
      img.src = suggestion.image;
      img.alt = suggestion.title;
      img.style.width = '40px';
      img.style.height = '40px';
      img.style.marginRight = '10px';
      img.style.borderRadius = '2px';
  
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
  
      const title = document.createElement('a');
      title.href = suggestion.href;
      title.textContent = suggestion.title;
      title.style.fontWeight = 'bold';
      title.style.textDecoration = 'none';
      title.style.color = '#ddd';
  
      const artist = document.createElement('span');
      artist.textContent = suggestion.artist;
      artist.style.fontSize = '12px';
      artist.style.color = '#555';
  
      div.appendChild(title);
      div.appendChild(artist);
  
      li.appendChild(img);
      li.appendChild(div);
      suggestionsList.appendChild(li);
  
      li.addEventListener('click', () => {
        selectSuggestion(suggestion.title, suggestion.href);
      });
    });
  
    suggestionsList.style.display = 'block';
    searchForm.classList.add('active');
  }
})  

document.addEventListener('DOMContentLoaded', () => {
  const homeButton = document.getElementById('home-button');
  const categoryLabel = document.getElementById('andthen-current-category');

  function updateHomeButtonAnchor() {
    const currentCategory = categoryLabel.textContent.trim();
    homeButton.href = `#${currentCategory}`;
  }

  // Update the home button anchor when the page loads
  updateHomeButtonAnchor();

  // Optionally, if the category label changes dynamically
  const observer = new MutationObserver(updateHomeButtonAnchor);
  observer.observe(categoryLabel, { childList: true, subtree: true });
});


document.addEventListener('DOMContentLoaded', () => {
  const categoryLabel = document.getElementById('andthen-current-category');
  const homeLink = document.querySelector('.home-link1.selected1');
  
  // Function to update the home-link href based on the selected category
  function updateHomeLinkHref() {
    const currentCategory = categoryLabel.textContent.trim(); // Get the current category
    homeLink.href = `#${currentCategory}`; // Set href to # followed by the category
  }

  // Update the link's href every time it's hovered over
  homeLink.addEventListener('mouseenter', updateHomeLinkHref);
});



document.addEventListener("DOMContentLoaded", function () {
  const containerRepeater = document.querySelector('.podcast-row-artists');

  // Array of image URLs, album titles, and artists
  const imageSources = [
    'https://koshertube.co.uk/wp-content/uploads/2023/07/Living-Lchaimjpg.jpg',
    'https://meaningfulminute.org/wp-content/uploads/2022/08/meaningful-people-banner-300x300.jpg',
    'https://i.scdn.co/image/ab67656300005f1f2b690ca3988b998271e7b4a6',
    'https://northeurope1-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=189118&inputFormat=png&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!AdeWsAn46EuJK-k8_2ZIbJzgyU4P-1tIlSdLmUJCp2y-89EcpC-nRIHou2Dt1Cn9%2Fitems%2F01CWZ4ZYMTYGNOT7PAIZDJX6JDHWR65KU6%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiJiMDk2ZDcwMS1mODA5LTRiZTgtODkyYi1lOTNjZmY2NjQ4NmMiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzIxMzY0MDAifQ.8YQnPiiVXNDlkEWoPGANAXyZHD075xBqILfQLVrlgNhdzMmwyrD1WPS2X5bJnGd9nEWH4wQyp0M9o-_lB85NGbJZiMCxcpwFcq6QF3VPTfFojt6-1VbwaQ0r0i_m1LndCASvJEt0u1IsZalfK7XWylkisAT49N5VfPD2D06NPK9RhiKawbhKl2Eda6uYjhve8NfOcNUZ9sESdxg44iA5B_r093UfOHuXAW24Ij3SQiJuL1jSmV28G2zRmpOUYeOB2RhW7sDB5veoo6a9dEzpIFeJnUGPRv0PFCgyo4QFgiTumIC0x87i3nG5UocmWhzaU7TomnHKPBwohiuakJ036LOeIWTbHDAkuY4Mn5vtMCZTh2v-yB7yZwaiaR82yoLa.kUz6cCsKfympxWovqsyVp5EOUCLnFP3982aUBYauRDU%26version%3DPublished&cb=63867712611&encodeFailures=1&width=1459&height=852&action=Access',
    'https://i.scdn.co/image/ab67656300005f1fed0cf5d32492a8e5fc86ba99',
    'https://i.scdn.co/image/ab6765630000ba8a91dcd06296852a64c9491f95',
    'https://i.scdn.co/image/ab67656300005f1f5acd8bf2ab131662f9dc12b4',
  ];

  const artistsTitles = [
    'Podcast',
    'Podcast',
    'Podcast',
    'Podcast',
    'Podcast',
    'Podcast',
    'Podcast'
  ];

  const artists = [
    'Living Lechaim',
    'Meaningful People',
    'Stories To Ispire',
    'Tn 2 Tn Podcast',
    'Vayimaen',
    'The Two Cents Podcast',
    'The Daily Dose'
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
    const artistHref = `#Podcasts/${artistSlug}`;

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
  const repeaterRow = document.getElementById('podcast-row-video');
  let currentlyPlayingVideo = null;

  // Function to pause the currently playing video
  function pauseCurrentlyPlayingVideo() {
      if (currentlyPlayingVideo) {
          currentlyPlayingVideo.pause();
          currentlyPlayingVideo = null;
      }
  }

  const videoSources = [
      'MST-1azpDYc?',
      'vp3BvqDa4bU',
      '_rYPW4QzwG8',
      'D_p6W4-ZPeg',
      'GX1XGmT43BI'
  ];

  const albumTitles = [
      'Umar Rebbi Yochanon',
      'Tzoin Kedushim',                
      'The Yomi',
      'A Fire',
      'Abba'
  ];

  const artists = [
      'Shulem Lemmer',
      'Lipa Schmeltser',                
      'Nissim Black',
      'Shmueli Ungar',
      'Mordechai Shapiro'
  ];

  // Create containers dynamically with individual YouTube video embeds, titles, and artists
  for (let i = 0; i < 5; i++) {
      const repeaterItem = document.createElement('div');
      repeaterItem.classList.add('video-repeater-row-item');
      repeaterItem.innerHTML = `
          <div class="video-image-container">
              <iframe width="350px" height="190" src="https://www.youtube.com/embed/${videoSources[i]}" frameborder="0" allowfullscreen style= "border-radius: 5px;"></iframe>
          </div>
          <div class="video-repeater-text">
              <div class="video-text-row">${albumTitles[i]}</div>
              <div class="video-text-row-small">${artists[i]}</div>
          </div>`;
      repeaterRow.appendChild(repeaterItem);
  }
})




const items = [
  {
    image: 'https://tn2tn.github.io/podcast/assets/images/episode08.png',
    title: 'Simcha Dynamics',
    artist: 'Tn 2 Tn Podcast',
    number: 142536,
    href: '#Podcasts/Tn2Tn',
    category: 'Podcasts'
  },
  {
    image:'https://i.scdn.co/image/ab67656300005f1f5acd8bf2ab131662f9dc12b4',
    title: 'Daily Dose: 2129',
    artist: 'Torah Anytime',
    number: 102129,
    href: '#Podcasts/Daily-Dose',
    category: 'Podcasts'
  },
  {
    image: 'Untitled (24).png',
    title: 'Terror In Turkey',
    artist: 'Tn 2 Tn Podcast',
    number: 567567,
    href: '#Stories/Terror-In-Turkey',
    category: 'Story'
  }     
];

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

function handlePlayPauseClick(event) {
  const overlay = event.currentTarget.closest('.overlay-1st');
  const playButton = overlay.querySelector('.play-button');
  const pauseButton = overlay.querySelector('.pause-button');
  const number = overlay.getAttribute('data-number');
  
  // Update player details when play/pause is clicked
  updatePlayerDetails(number);
  
  console.log(`Updated player details for item: ${number}`);
  event.stopPropagation(); // Prevent triggering hover functionality
  event.preventDefault(); // Prevent following the href link
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

// Create repeater items
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

// Initialize repeater items
const podcastRow = document.getElementById('podcast-row');
createRepeaterItems(podcastRow);
initializeRepeaterItems();

// Filter by category (default category can be updated as needed)
function filterItemsByCategory(category) {
  const repeaterItems = document.querySelectorAll('.repeater-row-item');
  repeaterItems.forEach(item => {
    if (item.getAttribute('data-category') === category || category === 'All') {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}

filterItemsByCategory('Podcasts');


// Stories data
const stories = [
  {
    image: 'https://mostlymusic.com/cdn/shop/products/lostinlvov-01.png?v=1680107591&width=800',
    title: 'Lost in Lvov',
    artist: 'Moshe Zaftig',
    number: 463522,
    href: '#Stories/Lost-In-Lvov',
    category: 'Story'
  },
  {
    image: 'Untitled (24).png',
    title: 'Terror In Turkey',
    artist: 'Tn 2 Tn Podcast',
    number: 567567,
    href: '#Stories/Terror-In-Turkey',
    category: 'Story'
  }
];

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

// Handle mouse enter for stories
function handleStoryMouseEnter(event) {
  const overlay = event.currentTarget.querySelector('.overlay-1st');
  overlay.style.opacity = '1';
}

// Handle mouse leave for stories
function handleStoryMouseLeave(event) {
  const overlay = event.currentTarget.querySelector('.overlay-1st');
  if (!overlay.classList.contains('playing')) {
    overlay.style.opacity = '0';
  }
}

// Handle play/pause click for stories
function handleStoryPlayPauseClick(event) {
  const overlay = event.currentTarget.closest('.overlay-1st');
  const number = overlay.getAttribute('data-number');

  // Update player details when play/pause is clicked
  updateStoryPlayerDetails(number);

  console.log(`Updated player details for story: ${number}`);
  event.stopPropagation(); // Prevent triggering hover functionality
  event.preventDefault(); // Prevent following the href link
}

// Initialize repeater items with event listeners for stories
function initializeStoryRepeaterItems(containerId) {
  const repeaterItems = document.querySelectorAll(`#${containerId} .repeater-row-item`);
  repeaterItems.forEach(item => {
    const overlay = item.querySelector('.overlay-1st');
    const playButton = item.querySelector('.play-button');
    const pauseButton = item.querySelector('.pause-button');

    item.addEventListener('mouseenter', handleStoryMouseEnter);
    item.addEventListener('mouseleave', handleStoryMouseLeave);
    playButton.addEventListener('click', handleStoryPlayPauseClick);
    pauseButton.addEventListener('click', handleStoryPlayPauseClick);
  });
}

// Create repeater items for stories
function createStoryRepeaterItems(containerId) {
  const repeaterRow = document.getElementById(containerId);
  repeaterRow.innerHTML = ''; // Clear any existing items
  stories.forEach(story => {
    const repeaterItem = document.createElement('a');
    repeaterItem.classList.add('repeater-row-item');
    repeaterItem.href = story.href;

    repeaterItem.innerHTML = `
      <div class="image-container">
        <img src="${story.image}" alt="Story Artwork">
        <div class="overlay-1st" data-number="${story.number}">
          <div class="play-button" style="display: block;">
            <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play Button" style="width: 50px; height: 50px;">
          </div>
          <div class="pause-button" style="display: none;">
            <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause Button" style="width: 50px; height: 50px;">
          </div>
        </div>
      </div>
      <div class="repeater-text">
        <div class="text-row">${story.title}</div>
        <div class="text-row-small">${story.artist}</div>
      </div>
    `;

    repeaterRow.appendChild(repeaterItem);
  });
}

// Initialize stories repeater
const storiesContainerId = 'stories-row';
createStoryRepeaterItems(storiesContainerId);
initializeStoryRepeaterItems(storiesContainerId);


const shabbosItems = [
  {
    image: 'shabbos1.png',
    title: 'Shabbos Collection',
    artist: 'Yiddish 24',
    number: 624567,
    href: '#Songs/streams/shabbos-collection',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/2'
  },
  {
    image: 'https://shira24.com/android-icon-192x192.png',
    title: 'Shabbos Shira',
    artist: 'Shira Choir',
    number: 624567,
    href: '#Songs/streams/shabbos-shira',
    category: 'Stream',
    audioUrl: 'https://music.shira24.com:5001/3?ver=1926'
  },
  {
    image: 'https://kcm.fm/upload/pictures/5/5186.jpg',
    title: 'תענוג לשבת',
    artist: 'Kol Chai Music',
    number: 624561,
    href: '#Songs/streams/תענוג לשבת',
    category: 'Stream',
    audioUrl: 'https://live.kcm.fm/17'
  },
  {
    image: 'shabbos4.png',
    title: 'Motsei Shabbos',
    artist: 'Yiddish 24',
    number: 624561,
    href: '#Songs/streams/motsei-shabbos',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/6'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const shabbosContainer = document.querySelector('.ShabbosLive');
  const audioPlayer = document.getElementById('audio');
  const playPauseButton = document.querySelector('.play-pause-button i');
  const imageArtwork = document.getElementById('image-artwork');
  const playingTitleElement = document.querySelector('#playing-details .text-row-player:nth-of-type(1)');
  const playingArtistElement = document.querySelector('#playing-details .text-row-player:nth-of-type(2)');

  let currentPlayingItem = null;

  // Create and append items
  shabbosItems.forEach(item => {
    const containerItem = document.createElement('div');
    containerItem.classList.add('Live1');
    containerItem.style.display = 'flex';
    containerItem.style.cursor = 'pointer';
    containerItem.style.position = 'relative';

    containerItem.innerHTML = `
      <img class="tagimgs" height="60px" width="60px" src="${item.image}" alt="${item.title}">
      <div class="overlay" data-number="${item.number}" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 90px;
        height: 100px;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;">
        <div class="play-button">
          <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play" style="
            width: 50px;
            height: 50px;">
        </div>
        <div class="pause-button" style="display: none;">
          <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause" style="
            width: 50px;
            height: 50px;">
        </div>
      </div>
      <div class="text-content">
      <p6>${wrapHebrewCharacters(item.title)}</p6>
        <p3>${item.artist}</p3>
      </div>
    `;

    const textContent = containerItem.querySelector('.text-content');
    const overlay = containerItem.querySelector('.overlay');
    const playButton = overlay.querySelector('.play-button');
    const pauseButton = overlay.querySelector('.pause-button');

// Function to wrap only Hebrew characters with a span
function wrapHebrewCharacters(text) {
  return text.replace(/[\u0590-\u05FF]+/g, match => {
    return `<span style="font-family: 'Noto Serif Hebrew', sans-serif;">${match}</span>`;
  });
}

    // Handle hover effects
    containerItem.addEventListener('mouseover', () => {
      overlay.style.opacity = '1';
    });

    containerItem.addEventListener('mouseout', () => {
      if (!overlay.classList.contains('playing')) {
        overlay.style.opacity = '0';
      }
    });

    // Handle click/play functionality
    containerItem.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation(); // Prevent event bubbling

      if (currentPlayingItem === containerItem && !audioPlayer.paused) {
        // Pause current track
        audioPlayer.pause();
        overlay.classList.remove('playing');
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
        currentPlayingItem = null;
      } else {
        // Stop previous track if exists
        if (currentPlayingItem) {
          const prevOverlay = currentPlayingItem.querySelector('.overlay');
          const prevPlayButton = prevOverlay.querySelector('.play-button');
          const prevPauseButton = prevOverlay.querySelector('.pause-button');
          prevOverlay.classList.remove('playing');
          prevPlayButton.style.display = 'block';
          prevPauseButton.style.display = 'none';
        }

        // Play new track
        audioPlayer.src = item.audioUrl;
        audioPlayer.play()
          .then(() => {
            // Update UI
            imageArtwork.src = item.image;
            playingTitleElement.textContent = item.title;
            playingArtistElement.textContent = item.artist;
            
            // Update buttons
            overlay.classList.add('playing');
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
            playPauseButton.classList.remove('fa-play-circle');
            playPauseButton.classList.add('fa-pause-circle');
            
            currentPlayingItem = containerItem;
          })
          .catch(error => {
            console.error('Error playing audio:', error);
          });
      }
    });

    shabbosContainer.appendChild(containerItem);
  });

  // Handle global play/pause button
  playPauseButton.addEventListener('click', () => {
    if (currentPlayingItem) {
      const overlay = currentPlayingItem.querySelector('.overlay');
      const playButton = overlay.querySelector('.play-button');
      const pauseButton = overlay.querySelector('.pause-button');

      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        playPauseButton.classList.remove('fa-play-circle');
        playPauseButton.classList.add('fa-pause-circle');
      } else {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
      }
    }
  });

  // Handle audio ended event
  audioPlayer.addEventListener('ended', () => {
    if (currentPlayingItem) {
      const overlay = currentPlayingItem.querySelector('.overlay');
      const playButton = overlay.querySelector('.play-button');
      const pauseButton = overlay.querySelector('.pause-button');
      overlay.classList.remove('playing');
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
      playPauseButton.classList.remove('fa-pause-circle');
      playPauseButton.classList.add('fa-play-circle');
    }
  });
});



const shabbosItem = [
  {
    image: 'shabbos1.png',
    title: 'Shabbos Collection',
    artist: 'Yiddish 24',
    number: 624567,
    href: '#Songs/streams/shabbos-collection',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/2'
  },
  {
    image: 'https://shira24.com/android-icon-192x192.png',
    title: 'Shabbos Shira',
    artist: 'Shira Choir',
    number: 624567,
    href: '#Songs/streams/shabbos-shira',
    category: 'Stream',
    audioUrl: 'https://music.shira24.com:5001/3?ver=1926'
  },
  {
    image: 'https://kcm.fm/upload/pictures/5/5186.jpg',
    title: 'תענוג לשבת',
    artist: 'Kol Chai Music',
    number: 624561,
    href: '#Songs/streams/תענוג לשבת',
    category: 'Stream',
    audioUrl: 'https://live.kcm.fm/17'
  },
  {
    image: 'shabbos4.png',
    title: 'Motsei Shabbos',
    artist: 'Yiddish 24',
    number: 624561,
    href: '#Songs/streams/motsei-shabbos',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/6'
  },
  {
    image: 'shabbos1.png',
    title: 'Shabbos Collection',
    artist: 'Yiddish 24',
    number: 624567,
    href: '#Songs/streams/shabbos-collection',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/2'
  },
  {
    image: 'https://shira24.com/android-icon-192x192.png',
    title: 'Shabbos Shira',
    artist: 'Shira Choir',
    number: 624567,
    href: '#Songs/streams/shabbos-shira',
    category: 'Stream',
    audioUrl: 'https://music.shira24.com:5001/3?ver=1926'
  },
  {
    image: 'https://kcm.fm/upload/pictures/5/5186.jpg',
    title: 'תענוג לשבת',
    artist: 'Kol Chai Music',
    number: 624561,
    href: '#Songs/streams/תענוג לשבת',
    category: 'Stream',
    audioUrl: 'https://live.kcm.fm/17'
  },
  {
    image: 'shabbos4.png',
    title: 'Motsei Shabbos',
    artist: 'Yiddish 24',
    number: 624561,
    href: '#Songs/streams/motsei-shabbos',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/6'
  },
  {
    image: 'shabbos1.png',
    title: 'Shabbos Collection',
    artist: 'Yiddish 24',
    number: 624567,
    href: '#Songs/streams/shabbos-collection',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/2'
  },
  {
    image: 'https://shira24.com/android-icon-192x192.png',
    title: 'Shabbos Shira',
    artist: 'Shira Choir',
    number: 624567,
    href: '#Songs/streams/shabbos-shira',
    category: 'Stream',
    audioUrl: 'https://music.shira24.com:5001/3?ver=1926'
  },
  {
    image: 'https://kcm.fm/upload/pictures/5/5186.jpg',
    title: 'תענוג לשבת',
    artist: 'Kol Chai Music',
    number: 624561,
    href: '#Songs/streams/תענוג לשבת',
    category: 'Stream',
    audioUrl: 'https://live.kcm.fm/17'
  },
  {
    image: 'shabbos4.png',
    title: 'Motsei Shabbos',
    artist: 'Yiddish 24',
    number: 624561,
    href: '#Songs/streams/motsei-shabbos',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/6'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const shabbosContainer = document.querySelector('.ShabbosList');
  const audioPlayer = document.getElementById('audio');
  const playPauseButton = document.querySelector('.play-pause-button i');
  const imageArtwork = document.getElementById('image-artwork');
  const playingTitleElement = document.querySelector('#playing-details .text-row-player:nth-of-type(1)');
  const playingArtistElement = document.querySelector('#playing-details .text-row-player:nth-of-type(2)');

  let currentPlayingItem = null;

  // Create and append items
  shabbosItem.forEach(item => {
    const containerItem = document.createElement('div');
    containerItem.classList.add('Live2');
    containerItem.style.display = 'flex';
    containerItem.style.cursor = 'pointer';
    containerItem.style.position = 'relative';

    containerItem.innerHTML = `
      <img class="tagimgs1" height="60px" width="60px" src="${item.image}" alt="${item.title}">
      <div class="overlay" data-number="${item.number}" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 60px;
        height: 60px;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;">
        <div class="play-button">
          <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play" style="
            width: 30px;
            height: 30px;">
        </div>
        <div class="pause-button" style="display: none;">
          <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause" style="
            width: 30px;
            height: 30px;">
        </div>
      </div>
      <div class="text-content1">
      <p6>${wrapHebrewCharacters(item.title)}</p6>
        <p3>${item.artist}</p3>
      </div>
    `;

    const textContent = containerItem.querySelector('.text-content1');
    const overlay = containerItem.querySelector('.overlay');
    const playButton = overlay.querySelector('.play-button');
    const pauseButton = overlay.querySelector('.pause-button');

// Function to wrap only Hebrew characters with a span
function wrapHebrewCharacters(text) {
  return text.replace(/[\u0590-\u05FF]+/g, match => {
    return `<span style="font-family: 'Noto Serif Hebrew', sans-serif;">${match}</span>`;
  });
}

    // Handle hover effects
    containerItem.addEventListener('mouseover', () => {
      overlay.style.opacity = '1';
    });

    containerItem.addEventListener('mouseout', () => {
      if (!overlay.classList.contains('playing')) {
        overlay.style.opacity = '0';
      }
    });

    // Handle click/play functionality
    containerItem.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation(); // Prevent event bubbling

      if (currentPlayingItem === containerItem && !audioPlayer.paused) {
        // Pause current track
        audioPlayer.pause();
        overlay.classList.remove('playing');
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
        currentPlayingItem = null;
      } else {
        // Stop previous track if exists
        if (currentPlayingItem) {
          const prevOverlay = currentPlayingItem.querySelector('.overlay');
          const prevPlayButton = prevOverlay.querySelector('.play-button');
          const prevPauseButton = prevOverlay.querySelector('.pause-button');
          prevOverlay.classList.remove('playing');
          prevPlayButton.style.display = 'block';
          prevPauseButton.style.display = 'none';
        }

        // Play new track
        audioPlayer.src = item.audioUrl;
        audioPlayer.play()
          .then(() => {
            // Update UI
            imageArtwork.src = item.image;
            playingTitleElement.textContent = item.title;
            playingArtistElement.textContent = item.artist;
            
            // Update buttons
            overlay.classList.add('playing');
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
            playPauseButton.classList.remove('fa-play-circle');
            playPauseButton.classList.add('fa-pause-circle');
            
            currentPlayingItem = containerItem;
          })
          .catch(error => {
            console.error('Error playing audio:', error);
          });
      }
    });

    shabbosContainer.appendChild(containerItem);
  });

  // Handle global play/pause button
  playPauseButton.addEventListener('click', () => {
    if (currentPlayingItem) {
      const overlay = currentPlayingItem.querySelector('.overlay');
      const playButton = overlay.querySelector('.play-button');
      const pauseButton = overlay.querySelector('.pause-button');

      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        playPauseButton.classList.remove('fa-play-circle');
        playPauseButton.classList.add('fa-pause-circle');
      } else {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
      }
    }
  });

  // Handle audio ended event
  audioPlayer.addEventListener('ended', () => {
    if (currentPlayingItem) {
      const overlay = currentPlayingItem.querySelector('.overlay');
      const playButton = overlay.querySelector('.play-button');
      const pauseButton = overlay.querySelector('.pause-button');
      overlay.classList.remove('playing');
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
      playPauseButton.classList.remove('fa-pause-circle');
      playPauseButton.classList.add('fa-play-circle');
    }
  });
});




const ChanukaItems = [
  {
    image: 'Chanuka1.png',
    title: 'Chanuka Collection',
    artist: 'Yiddish 24',
    number: 624551,
    href: '#Songs/streams/chanuka-collection',
    category: 'Stream',
    audioUrl: 'https://music.y24.app/4'
  },
  {
    image: 'https://kcm.fm/upload/pictures/7/7764.jpg',
    title: 'חנוכה',
    artist: 'Kol Chai Music',
    number: 624523,
    href: '#Songs/streams/חנוכה',
    category: 'Stream',
    audioUrl: 'https://live.kcm.fm/100'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const shabbosContainer = document.querySelector('.ChanukaLive');
  const audioPlayer = document.getElementById('audio');
  const playPauseButton = document.querySelector('.play-pause-button i');
  const imageArtwork = document.getElementById('image-artwork');
  const playingTitleElement = document.querySelector('#playing-details .text-row-player:nth-of-type(1)');
  const playingArtistElement = document.querySelector('#playing-details .text-row-player:nth-of-type(2)');

  let currentPlayingItem = null;

  // Create and append items
  ChanukaItems.forEach(item => {
    const containerItem = document.createElement('div');
    containerItem.classList.add('Live1');
    containerItem.style.display = 'flex';
    containerItem.style.cursor = 'pointer';
    containerItem.style.position = 'relative';

    containerItem.innerHTML = `
      <img class="tagimgs" height="60px" width="60px" src="${item.image}" alt="${item.title}">
      <div class="overlay" data-number="${item.number}" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 90px;
        height: 100px;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;">
        <div class="play-button">
          <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play" style="
            width: 50px;
            height: 50px;">
        </div>
        <div class="pause-button" style="display: none;">
          <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause" style="
            width: 50px;
            height: 50px;">
        </div>
      </div>
      <div class="text-content">
      <p6>${wrapHebrewCharacters(item.title)}</p6>
        <p3>${item.artist}</p3>
      </div>
    `;

    const textContent = containerItem.querySelector('.text-content');
    const overlay = containerItem.querySelector('.overlay');
    const playButton = overlay.querySelector('.play-button');
    const pauseButton = overlay.querySelector('.pause-button');

// Function to wrap only Hebrew characters with a span
function wrapHebrewCharacters(text) {
  return text.replace(/[\u0590-\u05FF]+/g, match => {
    return `<span style="font-family: 'Noto Serif Hebrew', sans-serif;">${match}</span>`;
  });
}

    // Handle hover effects
    containerItem.addEventListener('mouseover', () => {
      overlay.style.opacity = '1';
    });

    containerItem.addEventListener('mouseout', () => {
      if (!overlay.classList.contains('playing')) {
        overlay.style.opacity = '0';
      }
    });

    // Handle click/play functionality
    containerItem.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation(); // Prevent event bubbling

      if (currentPlayingItem === containerItem && !audioPlayer.paused) {
        // Pause current track
        audioPlayer.pause();
        overlay.classList.remove('playing');
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
        currentPlayingItem = null;
      } else {
        // Stop previous track if exists
        if (currentPlayingItem) {
          const prevOverlay = currentPlayingItem.querySelector('.overlay');
          const prevPlayButton = prevOverlay.querySelector('.play-button');
          const prevPauseButton = prevOverlay.querySelector('.pause-button');
          prevOverlay.classList.remove('playing');
          prevPlayButton.style.display = 'block';
          prevPauseButton.style.display = 'none';
        }

        // Play new track
        audioPlayer.src = item.audioUrl;
        audioPlayer.play()
          .then(() => {
            // Update UI
            imageArtwork.src = item.image;
            playingTitleElement.textContent = item.title;
            playingArtistElement.textContent = item.artist;
            
            // Update buttons
            overlay.classList.add('playing');
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
            playPauseButton.classList.remove('fa-play-circle');
            playPauseButton.classList.add('fa-pause-circle');
            
            currentPlayingItem = containerItem;
          })
          .catch(error => {
            console.error('Error playing audio:', error);
          });
      }
    });

    shabbosContainer.appendChild(containerItem);
  });

  // Handle global play/pause button
  playPauseButton.addEventListener('click', () => {
    if (currentPlayingItem) {
      const overlay = currentPlayingItem.querySelector('.overlay');
      const playButton = overlay.querySelector('.play-button');
      const pauseButton = overlay.querySelector('.pause-button');

      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        playPauseButton.classList.remove('fa-play-circle');
        playPauseButton.classList.add('fa-pause-circle');
      } else {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
      }
    }
  });

  // Handle audio ended event
  audioPlayer.addEventListener('ended', () => {
    if (currentPlayingItem) {
      const overlay = currentPlayingItem.querySelector('.overlay');
      const playButton = overlay.querySelector('.play-button');
      const pauseButton = overlay.querySelector('.pause-button');
      overlay.classList.remove('playing');
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
      playPauseButton.classList.remove('fa-pause-circle');
      playPauseButton.classList.add('fa-play-circle');
    }
  });
});






const ChanukaItem = [
  {
    image: 'https://cdn.shopify.com/s/files/1/0420/2505/files/TYH_DJFarbrengIzzyFeat.Afko.man-ChanukahUpmix_2.jpg?v=1702315936',
    title: 'Chanuka Upmix',
    artist: 'Afiko.man, DJ Farbreng, Thank You Hashem',
    number: 425364,
    href: '#Songs/songs/chanuka-upmix',
    category: 'Song',
    audioUrl: 'audio/425364'
  },
  {
    image: 'https://mostlymusic.com/cdn/shop/files/photo_2023-12-05_12-20-40.jpg?v=1701881984&width=800',
    title: 'Chanukah Licht Medley',
    artist: 'Malchus Choir & More...',
    number: 748520,
    href: '#Songs/songs/chanukah-licht-medley',
    category: 'Song',
    audioUrl: 'audio/748520'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const shabbosContainer = document.querySelector('.ChanukaList');
  const audioPlayer = document.getElementById('audio');
  const playPauseButton = document.querySelector('.play-pause-button i');
  const imageArtwork = document.getElementById('image-artwork');
  const playingTitleElement = document.querySelector('#playing-details .text-row-player:nth-of-type(1)');
  const playingArtistElement = document.querySelector('#playing-details .text-row-player:nth-of-type(2)');

  let currentPlayingItem = null;

  // Create and append items
  ChanukaItem.forEach(item => {
    const containerItem = document.createElement('div');
    containerItem.classList.add('Live2');
    containerItem.style.display = 'flex';
    containerItem.style.cursor = 'pointer';
    containerItem.style.position = 'relative';

    containerItem.innerHTML = `
      <img class="tagimgs1" height="60px" width="60px" src="${item.image}" alt="${item.title}">
      <div class="overlay" data-number="${item.number}" style="
        position: absolute;
        top: 0;
        left: 0;
        width: 60px;
        height: 60px;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;">
        <div class="play-button">
          <img src="https://img.icons8.com/material-rounded/512/FFFFFF/play--v2.png" alt="Play" style="
            width: 30px;
            height: 30px;">
        </div>
        <div class="pause-button" style="display: none;">
          <img src="https://img.icons8.com/material-rounded/512/FFFFFF/pause--v2.png" alt="Pause" style="
            width: 30px;
            height: 30px;">
        </div>
      </div>
      <div class="text-content1">
      <p6>${wrapHebrewCharacters(item.title)}</p6>
        <p3>${item.artist}</p3>
      </div>
    `;

    const textContent = containerItem.querySelector('.text-content1');
    const overlay = containerItem.querySelector('.overlay');
    const playButton = overlay.querySelector('.play-button');
    const pauseButton = overlay.querySelector('.pause-button');

// Function to wrap only Hebrew characters with a span
function wrapHebrewCharacters(text) {
  return text.replace(/[\u0590-\u05FF]+/g, match => {
    return `<span style="font-family: 'Noto Serif Hebrew', sans-serif;">${match}</span>`;
  });
}

    // Handle hover effects
    containerItem.addEventListener('mouseover', () => {
      overlay.style.opacity = '1';
    });

    containerItem.addEventListener('mouseout', () => {
      if (!overlay.classList.contains('playing')) {
        overlay.style.opacity = '0';
      }
    });

    // Handle click/play functionality
    containerItem.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation(); // Prevent event bubbling

      if (currentPlayingItem === containerItem && !audioPlayer.paused) {
        // Pause current track
        audioPlayer.pause();
        overlay.classList.remove('playing');
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
        currentPlayingItem = null;
      } else {
        // Stop previous track if exists
        if (currentPlayingItem) {
          const prevOverlay = currentPlayingItem.querySelector('.overlay');
          const prevPlayButton = prevOverlay.querySelector('.play-button');
          const prevPauseButton = prevOverlay.querySelector('.pause-button');
          prevOverlay.classList.remove('playing');
          prevPlayButton.style.display = 'block';
          prevPauseButton.style.display = 'none';
        }

        // Play new track
        audioPlayer.src = item.audioUrl;
        audioPlayer.play()
          .then(() => {
            // Update UI
            imageArtwork.src = item.image;
            playingTitleElement.textContent = item.title;
            playingArtistElement.textContent = item.artist;
            
            // Update buttons
            overlay.classList.add('playing');
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
            playPauseButton.classList.remove('fa-play-circle');
            playPauseButton.classList.add('fa-pause-circle');
            
            currentPlayingItem = containerItem;
          })
          .catch(error => {
            console.error('Error playing audio:', error);
          });
      }
    });

    shabbosContainer.appendChild(containerItem);
  });

  // Handle global play/pause button
  playPauseButton.addEventListener('click', () => {
    if (currentPlayingItem) {
      const overlay = currentPlayingItem.querySelector('.overlay');
      const playButton = overlay.querySelector('.play-button');
      const pauseButton = overlay.querySelector('.pause-button');

      if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'block';
        playPauseButton.classList.remove('fa-play-circle');
        playPauseButton.classList.add('fa-pause-circle');
      } else {
        audioPlayer.pause();
        playButton.style.display = 'block';
        pauseButton.style.display = 'none';
        playPauseButton.classList.remove('fa-pause-circle');
        playPauseButton.classList.add('fa-play-circle');
      }
    }
  });

  // Handle audio ended event
  audioPlayer.addEventListener('ended', () => {
    if (currentPlayingItem) {
      const overlay = currentPlayingItem.querySelector('.overlay');
      const playButton = overlay.querySelector('.play-button');
      const pauseButton = overlay.querySelector('.pause-button');
      overlay.classList.remove('playing');
      playButton.style.display = 'block';
      pauseButton.style.display = 'none';
      playPauseButton.classList.remove('fa-pause-circle');
      playPauseButton.classList.add('fa-play-circle');
    }
  });
});

