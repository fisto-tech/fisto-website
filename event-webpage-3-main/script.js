/* ═══════════════════════════════════════════════════
   FIST-O Tech — Main Script
   ═══════════════════════════════════════════════════ */

(() => {
  'use strict';

  /* ── Preloader ───────────────────────────────── */
  const PRELOADER_SESSION_KEY = 'fistoPreloaderShown';
  const preloader = document.getElementById('preloader');
  const hasSeenPreloader = sessionStorage.getItem(PRELOADER_SESSION_KEY) === 'true';

  const initAOS = () => {
    try {
      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
      if (!prefersReducedMotion && window.AOS) {
        window.AOS.init({
          duration: 950,
          easing: 'ease-out-cubic',
          offset: 120,
          delay: 0,
          once: false,
          mirror: true,
          anchorPlacement: 'top-bottom',
          disableMutationObserver: false
        });

        const refreshAOS = () => {
          try {
            window.AOS.refreshHard();
          } catch (_) {}
        };

        window.addEventListener('load', () => {
          refreshAOS();
          window.setTimeout(refreshAOS, 250);
        }, { once: true });

        window.addEventListener('pageshow', () => {
          refreshAOS();
          window.setTimeout(refreshAOS, 250);
        });

        if (document.fonts?.ready) {
          document.fonts.ready.then(() => refreshAOS()).catch(() => {});
        }
      }
    } catch (_) {}
  };

  const finishPreload = () => {
    if (!preloader) return;
    document.body.classList.add('is-loaded');
    document.body.classList.remove('is-loading');
    sessionStorage.setItem(PRELOADER_SESSION_KEY, 'true');
    initAOS(); // Start animations immediately while preloader fades out
    // Allow CSS transition to finish, then remove from DOM
    window.setTimeout(() => {
      preloader.remove();
    }, 550);
  };

  if (hasSeenPreloader) {
    if (preloader) preloader.remove();
    document.body.classList.add('is-loaded');
    document.body.classList.remove('is-loading');
    initAOS();
  } else {
    // Hide loader when everything is ready
    window.addEventListener('load', finishPreload, { once: true });
    // Failsafe (in case some external resource hangs)
    window.setTimeout(finishPreload, 5000);
  }

  /* ── Navbar scroll-glass effect ───────────────── */
  const navbar = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 30; // px before glass kicks in

  const handleScroll = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  // Passive listener for performance
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Run once on load in case page is already scrolled
  handleScroll();

  /* AOS is now initialized after preloader finishes */

  /* ── 3D Card Hover Effect ───────────────────── */
  const cards = document.querySelectorAll('.solution-card');

  const isHoverEffect = window.innerWidth > 991;

  if (isHoverEffect) {

    cards.forEach($card => {
      let bounds;
    
      const rotateToMouse = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
          x: leftX - bounds.width / 2,
          y: topY - bounds.height / 2
        };
        
        // Smooth calculation for tilt (adjust 20 for more/less tilt)
        const transitionX = center.y / (bounds.height / 20);
        const transitionY = -center.x / (bounds.width / 20);
    
        $card.style.transform = `
          scale3d(1.07, 1.07, 1.07)
          rotateX(${transitionX}deg)
          rotateY(${transitionY}deg)
        `;
    
        const glow = $card.querySelector('.glow');
        if (glow) {
          glow.style.background = `
            radial-gradient(
              circle at
              ${leftX}px
              ${topY}px,
              #ffffff55,
              #0000000f
            )
          `;
        }
      };
    
      $card.addEventListener('mouseenter', () => {
        // Remove AOS delay so it doesn't interfere with continuous hover updates
        $card.style.setProperty('transition-delay', '0ms', 'important');
        bounds = $card.getBoundingClientRect();
        $card.classList.remove('returning'); // Remove snap-back transition
        $card.addEventListener('mousemove', rotateToMouse);
      });
    
      $card.addEventListener('mouseleave', () => {
        $card.removeEventListener('mousemove', rotateToMouse);
        $card.classList.add('returning'); // Add smooth transition back
        $card.style.transform = '';
        
        const glow = $card.querySelector('.glow');
        if (glow) {
          glow.style.background = '';
        }
      });
    });
  }
    
  /* ── Interactive 3D Video Controls ───────────── */
  const video = document.getElementById('interactive3dVideo');
  const audio = document.getElementById('interactive3dAudio');
  const playPauseBtn = document.getElementById('videoPlayPauseBtn');
  const musicBtn = document.getElementById('videoMusicBtn');
  const playIcon = document.getElementById('videoPlayIcon');
  const pauseIcon = document.getElementById('videoPauseIcon');
  const musicOnIcon = document.getElementById('videoMusicOnIcon');
  const musicOffIcon = document.getElementById('videoMusicOffIcon');
  
  const progressContainer = document.getElementById('videoProgressContainer');
  const progressBar = document.getElementById('videoProgressBar');
  const fullscreenBtn = document.getElementById('videoFullscreenBtn');
  const videoWrapper = video ? video.closest('.media-section__video-wrapper') : null;

  if (video && audio && playPauseBtn && musicBtn) {
    // Play/Pause logic
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.paused) {
        video.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      } else {
        video.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
      }
    });

    // Music On/Off logic
    let musicOn = false;
    audio.muted = true;
    
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (musicOn) {
        audio.muted = true;
        musicOn = false;
        musicOnIcon.style.display = 'none';
        musicOffIcon.style.display = 'block';
      } else {
        audio.muted = false;
        if (!video.paused) {
          audio.play().catch(() => {});
        }
        musicOn = true;
        musicOnIcon.style.display = 'block';
        musicOffIcon.style.display = 'none';
      }
    });
    
    video.addEventListener('play', () => {
      if (!audio.muted && musicOn) {
        audio.play().catch(() => {});
      }
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    });
    
    video.addEventListener('pause', () => {
      audio.pause();
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    });

    // Progress Bar Logic
    if (progressContainer && progressBar) {
      video.addEventListener('timeupdate', () => {
        if (video.duration) {
          const progressPercent = (video.currentTime / video.duration) * 100;
          progressBar.style.width = `${progressPercent}%`;
        }
      });

      const scrub = (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pos = Math.max(0, Math.min((e.clientX - rect.left) / rect.width, 1));
        video.currentTime = pos * video.duration;
      };

      let isDragging = false;
      progressContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        scrub(e);
      });
      document.addEventListener('mousemove', (e) => {
        if (isDragging) scrub(e);
      });
      document.addEventListener('mouseup', () => {
        isDragging = false;
      });
      
      // Prevent pausing video when clicking progress bar
      progressContainer.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Fullscreen Logic
    if (fullscreenBtn && videoWrapper) {
      fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          if (videoWrapper.requestFullscreen) {
            videoWrapper.requestFullscreen();
          } else if (videoWrapper.webkitRequestFullscreen) {
            videoWrapper.webkitRequestFullscreen();
          } else if (videoWrapper.msRequestFullscreen) {
            videoWrapper.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        }
      });
    }
  }

})();
