// Function to update the theme attribute
function updateThemeAttribute(theme) {
  // Get the element with the data-theme attribute
  const elementWithTheme = document.querySelector('[data-theme]');

  // Update the data-theme attribute with the current theme
  elementWithTheme.setAttribute('data-theme', theme);
}

// Check if the theme has been set via local storage previously
if (!localStorage.getItem('color-theme')) {
  // Get the user's preferred color scheme (dark or light)
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  // Set the color-theme cookie to the preferred theme
  localStorage.setItem('color-theme', preferredTheme);

  // Apply the preferred theme to the document element
  document.documentElement.classList.add(preferredTheme);

  // Update the data-theme attribute
  updateThemeAttribute(preferredTheme);
}

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark') {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  // Toggle the theme when the button is clicked
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');

  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  }
});


// Get the mobile menu button element
const mobileMenuButton = document.querySelector('[aria-controls="mobile-menu"]');

// Get the mobile menu element
const mobileMenu = document.getElementById('mobile-menu');

// Add click event listener to mobile menu button
mobileMenuButton.addEventListener('click', () => {
  // Toggle the "aria-expanded" attribute
  const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
  mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
  
  // Toggle the "hidden" class on the mobile menu
  mobileMenu.classList.toggle('hidden');
});


// scroll to top button
window.onscroll = function() { scrollFunction() };
  
    function scrollFunction() {
      var scrollToTopButton = document.getElementById("scroll-to-top");
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block";
      } else {
        scrollToTopButton.style.display = "none";
      }
    }
  
    function scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };


