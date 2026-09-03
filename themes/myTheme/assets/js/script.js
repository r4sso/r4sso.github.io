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
     Giscus
     ───────────────────────────────────── */

  var GISCUS_DARK_THEME =
    'https://r4sso.my/css/giscus.css';

  var GISCUS_LIGHT_THEME =
    'https://r4sso.my/css/giscus-light.css';


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
    function sendTheme(iframe) {
      if (!iframe || !iframe.contentWindow) return;
      changeGiscusTheme();
      // retry for giscus ready
      setTimeout(changeGiscusTheme, 300);
      setTimeout(changeGiscusTheme, 800);
      setTimeout(changeGiscusTheme, 1500);
    }

    var observer = new MutationObserver(function () {
      var iframe = document.querySelector('iframe.giscus-frame');

      if (!iframe) return;

      if (!iframe.dataset.themeInitialized) {
        iframe.dataset.themeInitialized = 'true';

        iframe.addEventListener('load', function () {
          sendTheme(iframe);
        });

        // in case already loaded
        setTimeout(function () {
          sendTheme(iframe);
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    var iframe = document.querySelector('iframe.giscus-frame');

    if (iframe && !iframe.dataset.themeInitialized) {
      iframe.dataset.themeInitialized = 'true';

      iframe.addEventListener('load', function () {
        sendTheme(iframe);
      });

      setTimeout(function () {
        sendTheme(iframe);
      }, 100);
    }

    // also handle giscus ready message
    window.addEventListener('message', function (e) {
      if (e.origin !== 'https://giscus.app') return;
      if (!(typeof e.data === 'object' && e.data.giscus)) return;
      // giscus loaded, ensure correct theme
      var iframe = document.querySelector('iframe.giscus-frame');
      if (iframe) sendTheme(iframe);
    });
  }


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

      /*
       * Change only Giscus' custom stylesheet.
       *
       * The iframe itself is NOT reloaded.
       */
      changeGiscusTheme();
    });
  }


  /* ─────────────────────────────────────
     Initialize
     ───────────────────────────────────── */

  handleMobileMenu();
  handleThemeToggle();
  watchGiscus();

})();
