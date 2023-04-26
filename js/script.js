document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        });
    });

var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    
// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
}
    
var themeToggleBtn = document.getElementById('theme-toggle');
    
themeToggleBtn.addEventListener('click', function() {
    
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');
    
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }
    
        // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        }
        
    });



// Get the dropdown toggle button element
const dropdownToggle = document.getElementById('dropdownNavbarLink');

// Get the dropdown menu element
const dropdownMenu = document.getElementById('dropdownNavbar');

// Add event listener for click event on dropdown toggle button
dropdownToggle.addEventListener('click', () => {
  // Toggle the "hidden" class on the dropdown menu to show/hide it
  dropdownMenu.classList.toggle('hidden');
});

// Close the dropdown menu when clicking outside of it
document.addEventListener('click', (event) => {
  if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.add('hidden');
  }
});

// Close the dropdown menu when pressing Esc key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    dropdownMenu.classList.add('hidden');
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


// var toc = document.querySelector('.toc');
// if (toc.textContent.trim().length === 0) {
//   toc.style.display = 'none';
// }

// JavaScript code
window.addEventListener('load', function() {
  var thumbImage = document.getElementById('thumb-image');
  if (thumbImage && !thumbImage.getAttribute('src')) {
    thumbImage.remove();
  }
});


// navbar responsive 
// const button = document.querySelector('#menu-button');
// const menu = document.querySelector('#menu');


// button.addEventListener('click', () => {
//   menu.classList.toggle('hidden');
// });

