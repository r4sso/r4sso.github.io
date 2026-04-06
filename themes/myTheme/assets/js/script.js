// Function to toggle the theme
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle('dark');
  // Set the theme in local storage
  localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');

  // Call the function to change Giscus theme
  changeGiscusTheme(isDarkMode ? 'dark' : 'light');
}

// Jf javascript enabled show scroll to top/theme button else hidden
document.querySelectorAll('.show-with-js').forEach(element => {
    element.classList.remove('hidden');
});

// Function to handle theme icon visibility
function handleThemeIcons() {
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  // Change the icons inside the button based on the current theme
  if (document.documentElement.classList.contains('dark')) {
      themeToggleDarkIcon.classList.add('hidden');
      themeToggleLightIcon.classList.remove('hidden');
  } else {
      themeToggleLightIcon.classList.add('hidden');
      themeToggleDarkIcon.classList.remove('hidden');
  }
}

// Function to handle mobile menu toggle
function handleMobileMenu() {
  // Select button by the aria-controls attribute we added
  const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');

  // Guard: Stop if elements aren't on this specific page
  if (!menuButton || !mobileMenu) return;

  menuButton.addEventListener('click', () => {
      // 1. Toggle the menu visibility
      const isNowHidden = mobileMenu.classList.toggle('hidden');
      
      // 2. Update ARIA state for accessibility
      menuButton.setAttribute('aria-expanded', !isNowHidden);
      
      // 3. REACTIVE PART: Toggle the class that animates the hamburger into an X
      menuButton.classList.toggle('is-active');
  });
}

// Function to handle scroll to top
const btn = document.getElementById('scroll-to-top');
window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btn.classList.remove('hidden');
  } else {
    btn.classList.add('hidden');
  }
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// Check if the theme has been set via local storage
const storedTheme = localStorage.getItem('color-theme');
if (storedTheme) {
  document.documentElement.classList.add(storedTheme);
  handleThemeIcons();
} else {
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  localStorage.setItem('color-theme', preferredTheme);
  document.documentElement.classList.add(preferredTheme);
  handleThemeIcons();
}

// Function to change Giscus theme
function changeGiscusTheme(theme) {
  function sendMessage(message) {
      const iframe = document.querySelector('iframe.giscus-frame');
      if (!iframe) return;
      iframe.contentWindow.postMessage({
          giscus: message
      }, 'https://giscus.app');
  }
  sendMessage({
      setConfig: {
          theme: theme,
      }
  });
}

// Get theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
  toggleTheme();
  handleThemeIcons();
});

// Init UI
handleMobileMenu();

