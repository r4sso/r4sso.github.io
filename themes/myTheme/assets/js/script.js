(function () {
  'use strict';

  // Mobile menu
  function handleMobileMenu() {
    var menuButton = document.querySelector('[aria-controls="mobile-menu"]');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!menuButton || !mobileMenu) return;
    menuButton.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('open');
      menuButton.classList.toggle('is-active', isOpen);
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Mobile submenus
  function handleMobileDropdowns() {
    var triggers = document.querySelectorAll('.mobile-dropdown-trigger');
    for (var i = 0; i < triggers.length; i++) {
      (function (trigger) {
        var submenu = document.getElementById(trigger.dataset.submenu);
        var chevron = trigger.querySelector('svg');
        if (!submenu) return;
        trigger.addEventListener('click', function () {
          var isOpen = submenu.classList.toggle('open');
          trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          if (chevron) {
            chevron.style.transform = isOpen ? 'rotate(180deg)' : '';
          }
        });
      })(triggers[i]);
    }
  }

  // Scroll to top — throttled with rAF
  var scrollBtn = document.getElementById('scroll-to-top');
  if (scrollBtn) {
    var scrollTicking = false;
    window.addEventListener('scroll', function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(function () {
          var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          scrollBtn.classList.toggle('visible', y > 300);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  }

  // Scroll to top function for anchor fallback
  window.scrollToTop = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme: sync checkbox from localStorage, then let CSS :has() be the source of truth
  (function () {
    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.checked = localStorage.getItem('theme') === 'light';
      toggle.addEventListener('change', function () {
        localStorage.setItem('theme', toggle.checked ? 'light' : 'dark');
      });
    }
  })();

  handleMobileMenu();
  handleMobileDropdowns();

})();
