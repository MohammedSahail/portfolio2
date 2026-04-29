document.addEventListener('DOMContentLoaded', () => {
  // Update footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Theme Toggle ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    htmlEl.classList.add('light');
  } else if (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    htmlEl.classList.add('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      htmlEl.classList.toggle('light');
      const isLight = htmlEl.classList.contains('light');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    });
  }

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (mainNav.classList.contains('active')) {
        icon.classList.replace('bx-menu', 'bx-x');
      } else {
        icon.classList.replace('bx-x', 'bx-menu');
      }
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        if (icon) icon.classList.replace('bx-x', 'bx-menu');
      });
    });
  }

  // --- Scroll to Top Button ---
  const topBtn = document.getElementById('topBtn');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  });

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Intersection Observer for Scroll Animations ---
  const reveals = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('active');
        // Stop observing once animated in
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });
});