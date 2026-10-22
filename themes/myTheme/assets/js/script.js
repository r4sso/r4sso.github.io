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


 // Giscus

  var GISCUS_DARK_THEME =
    '/css/giscus.css';

  var GISCUS_LIGHT_THEME =
    '/css/giscus-light.css';


  function getGiscusTheme() {
    return document.documentElement.classList.contains('light')
      ? GISCUS_LIGHT_THEME
      : GISCUS_DARK_THEME;
  }


  function changeGiscusTheme() {
    var iframe = document.querySelector('iframe.giscus-frame');

    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: getGiscusTheme()
          }
        }
      },
      'https://giscus.app'
    );
  }


  function watchGiscus() {
    if (!document.getElementById('giscus-container')) return;

    function sendTheme() {
      changeGiscusTheme();
      // retry for giscus ready
      setTimeout(changeGiscusTheme, 300);
      setTimeout(changeGiscusTheme, 800);
      setTimeout(changeGiscusTheme, 1500);
    }

    function watchFrame(iframe) {
      if (!iframe || iframe.dataset.themeInitialized) return;

      iframe.dataset.themeInitialized = 'true';

      iframe.addEventListener('load', function () {
        sendTheme();
      });

      // in case already loaded
      setTimeout(function () {
        sendTheme();
      }, 100);
    }

    var observer = new MutationObserver(function () {
      watchFrame(document.querySelector('iframe.giscus-frame'));
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    watchFrame(document.querySelector('iframe.giscus-frame'));

    // also handle giscus ready message
    window.addEventListener('message', function (e) {
      if (e.origin !== 'https://giscus.app') return;
      if (!(typeof e.data === 'object' && e.data.giscus)) return;
      // giscus loaded, ensure correct theme
      sendTheme();
    });
  }

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

      changeGiscusTheme();
    });
  }

  handleMobileMenu();
  handleMobileDropdowns();
  handleThemeToggle();
  watchGiscus();

})();
