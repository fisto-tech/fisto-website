// Back to Top Button Functionality
const backToTopButton = document.getElementById("backToTop");

// Show button when scrolled down 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

function slowScrollToTop(duration = 1000) {
  const start = window.scrollY;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing (ease-out)
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}

// Smooth scroll to top with slight bump
backToTopButton.addEventListener("click", () => {
  backToTopButton.disabled = true;

  // Small bump up
  window.scrollBy({ top: -10, behavior: "auto" });

  // Delay then slow scroll
  setTimeout(() => {
    slowScrollToTop(1800); // Increase duration to make it slower

    setTimeout(() => {
      backToTopButton.disabled = false;
    }, 2000);
  }, 150);
});

// preloader

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  // Wait for all animations to complete (approximately 5 seconds)
  setTimeout(() => {
    preloader?.classList.add("fade-out");

    // Show main content after preloader fades out
    setTimeout(() => {
      mainContent?.classList.add("visible");
      document.body.classList.add("loaded");
    }, 600);
  }, 5000);
});

// Fallback: If page takes too long to load, show content after 8 seconds
setTimeout(() => {
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");

  if (preloader && !preloader.classList.contains("fade-out")) {
    preloader.classList.add("fade-out");
    setTimeout(() => {
      mainContent?.classList.add("visible");
      document.body.classList.add("loaded");
    }, 600);
  }
}, 8000);

 document.addEventListener('DOMContentLoaded', function () {
      AOS.init({ duration: 1000 });
    });
    window.addEventListener('load', function () {
      AOS.refresh();
    });

    gsap.registerPlugin(ScrollTrigger);

// A helper function to get initial transform based on direction
function getInitialTransform(direction) {
  switch(direction) {
    case 'from-left':   return { x: -100, opacity: 0 };
    case 'from-right':  return { x: 100, opacity: 0 };
    case 'from-bottom': return { y: 100, opacity: 0 };
    case 'from-top':    return { y: -100, opacity: 0 };
    default:            return { opacity: 0 };
  }
}

document.querySelectorAll('.animate-item').forEach(elem => {
  // Determine direction class on the element
  const directions = ['from-left', 'from-right', 'from-bottom', 'from-top'];
  const direction = directions.find(dir => elem.classList.contains(dir)) || '';

  // Set initial position before animation
  gsap.set(elem, getInitialTransform(direction));

  // Create ScrollTrigger animation
  gsap.to(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 100%",    // when the top of the element hits 80% viewport height
      end: "bottom 10%",   // when bottom hits 20% viewport height
      toggleActions: "play reverse play reverse", // play on enter, reverse on leave back
      // markers: true, // uncomment for debugging
    },
    x: 0,
    y: 0,
    opacity: 1,
    duration: 1.25,
    ease: "power3.out",
  });
});


document.querySelectorAll('.scale-item').forEach(elem => {
  // Start with smaller scale and 0 opacity
  gsap.set(elem, { scale: 0.8, opacity: 0 });

  gsap.to(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play reverse play reverse",
      // markers: true, // for debugging
    },
    scale: 1,
    opacity: 1,
    duration: 1,
    ease: "power3.out",
  });
});