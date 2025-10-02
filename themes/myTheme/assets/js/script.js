// Function to toggle the theme
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle('dark');
  // Set the theme in local storage
  localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');

  // Call the function to change Giscus theme
  changeGiscusTheme(isDarkMode ? 'dark' : 'light');
}

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
  const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton.addEventListener('click', () => {
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
  });
}

// Function to handle scroll to top
function handleScrollToTop() {
  window.onscroll = function() {
      scrollFunction()
  };

  function scrollFunction() {
      const scrollToTopButton = document.getElementById("scroll-to-top");
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          scrollToTopButton.style.display = "block";
      } else {
          scrollToTopButton.style.display = "none";
      }
  }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
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
handleScrollToTop();

