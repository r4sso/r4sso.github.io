// cgit square — lightweight, Iosevka, light/dark toggle
(function () {
  'use strict';

  /* ─────────────────────────────────────
     Mobile menu
     ───────────────────────────────────── */

  function handleMobileMenu() {
    var menuButton = document.querySelector('[aria-controls="mobile-menu"]');
    var mobileMenu = document.getElementById('mobile-menu');

    if (!menuButton || !mobileMenu) return;

    menuButton.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');

      menuButton.classList.toggle('is-active', isOpen);

      menuButton.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );
    });
  }


  /* ─────────────────────────────────────
     Scroll to top
     ───────────────────────────────────── */

  var btn = document.getElementById('scroll-to-top');

  if (btn) {
    window.addEventListener('scroll', function () {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (scrollTop > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
  }

  window.scrollToTop = function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  /* ─────────────────────────────────────
     Site theme
     ───────────────────────────────────── */

  function handleThemeToggle() {
    var toggle = document.getElementById('theme-toggle');

    if (!toggle) return;

    toggle.addEventListener('click', function () {
      var isLight =
        document.documentElement.classList.toggle('light');

      if (isLight) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }


  /* ─────────────────────────────────────
     Initialize
     ───────────────────────────────────── */

  handleMobileMenu();
  handleThemeToggle();

})();
