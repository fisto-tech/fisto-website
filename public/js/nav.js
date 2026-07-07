const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");
const dropdownParent = document.querySelector(".has-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const navbar = document.querySelector(".navbar");

// Sticky navbar on scroll
let lastScroll = 0;
window.addEventListener("scroll", function () {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Mobile menu toggle
mobileToggle.addEventListener("click", function () {
  this.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on non-dropdown links
navLinks.querySelectorAll("a:not(.dropdown-toggle)").forEach((link) => {
  link.addEventListener("click", function () {
    mobileToggle.classList.remove("active");
    navLinks.classList.remove("active");
    if (dropdownParent) {
      dropdownParent.classList.remove("active");
    }
  });
});

// Mobile dropdown toggle
if (dropdownToggle && window.innerWidth <= 991) {
  dropdownToggle.addEventListener("click", function (e) {
    e.preventDefault();
    dropdownParent.classList.toggle("active");
  });
}

// Handle dropdown on resize
window.addEventListener("resize", function () {
  if (window.innerWidth > 991) {
    mobileToggle.classList.remove("active");
    navLinks.classList.remove("active");
    if (dropdownParent) {
      dropdownParent.classList.remove("active");
    }
  }
});

// Re-bind mobile dropdown event on resize
let lastWidth = window.innerWidth;
window.addEventListener("resize", function () {
  const currentWidth = window.innerWidth;
  if ((lastWidth > 991 && currentWidth <= 991) || (lastWidth <= 991 && currentWidth > 991)) {
    location.reload(); // Reload to properly rebind events
  }
  lastWidth = currentWidth;
});