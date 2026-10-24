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

      menuButton.setAttribute(
        'aria-expanded',
        isOpen ? 'true' : 'false'
      );
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


  // Scroll to top

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


  // Site theme

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

  handleMobileMenu();
  handleMobileDropdowns();
  handleThemeToggle();

})();
