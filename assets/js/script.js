// Function to toggle the theme
function toggleTheme() {
  const isDarkMode = document.documentElement.classList.toggle('dark');
  // Set the color-theme in local storage
  localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
}

// Function to handle theme icon visibility
function handleThemeIcons() {
  const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
  const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  // Change the icons inside the button based on the current theme
  if (document.documentElement.classList.contains('dark')) {
    themeToggleDarkIcon.classList.add('hidden'); // Add hidden class to dark icon
    themeToggleLightIcon.classList.remove('hidden'); // Remove hidden class from light icon
  } else {
    themeToggleLightIcon.classList.add('hidden'); // Add hidden class to light icon
    themeToggleDarkIcon.classList.remove('hidden'); // Remove hidden class from dark icon
  }
}

// Function to handle mobile menu toggle
function handleMobileMenu() {
  const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');
  const mobileMenu = document.getElementById('mobile-menu');

  // Add click event listener to mobile menu button
  mobileMenuButton.addEventListener('click', () => {
    // Toggle the "aria-expanded" attribute
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle the "hidden" class on the mobile menu
    mobileMenu.classList.toggle('hidden');
  });
}

// Function to handle scroll to top
function handleScrollToTop() {
  window.onscroll = function() { scrollFunction() };
  
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
  // Apply the stored theme to the document element
  document.documentElement.classList.add(storedTheme);

  // Handle theme icons based on the stored theme
  handleThemeIcons();
} else {
  // Get the user's preferred color scheme (dark or light)
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  // Set the color-theme in local storage to the preferred theme
  localStorage.setItem('color-theme', preferredTheme);

  // Apply the preferred theme to the document element
  document.documentElement.classList.add(preferredTheme);

  // Handle theme icons based on the preferred theme
  handleThemeIcons();
}

// Get theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle');

// Add a click event listener to the theme toggle button
themeToggleBtn.addEventListener('click', () => {
  // Toggle the theme
  toggleTheme();

  // Handle theme icons
  handleThemeIcons();
});

// Handle mobile menu
handleMobileMenu();

// Handle scroll to top
handleScrollToTop();
