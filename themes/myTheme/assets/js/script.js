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
    var observer = new MutationObserver(function () {
      var iframe = document.querySelector('iframe.giscus-frame');

      if (!iframe) return;

      /*
       * Wait until the Giscus iframe has loaded.
       */
      if (!iframe.dataset.themeInitialized) {
        iframe.dataset.themeInitialized = 'true';

        iframe.addEventListener('load', function () {
          changeGiscusTheme();
        });

        /*
         * In case the iframe is already loaded.
         */
        setTimeout(function () {
          changeGiscusTheme();
        }, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    /*
     * Giscus may already exist when this function runs.
     */
    var iframe = document.querySelector('iframe.giscus-frame');

    if (iframe) {
      iframe.dataset.themeInitialized = 'true';

      iframe.addEventListener('load', function () {
        changeGiscusTheme();
      });

      setTimeout(function () {
        changeGiscusTheme();
      }, 100);
    }
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
