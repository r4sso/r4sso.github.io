// document.addEventListener('DOMContentLoaded', () => {
//   const themeToggle = document.querySelector('#dark-mode-toggle');
//   const icon = document.getElementById('icon-toggle');
//   const html = document.querySelector('html');

//   themeToggle.addEventListener('change', () => {
//     if (themeToggle.checked) {
//       html.setAttribute('data-bs-theme', 'dark');
//       icon.innerHTML = '<i class="fa-regular fa-sun"></i>';
//     } else {
//       html.setAttribute('data-bs-theme', 'light');
//       icon.innerHTML = '<i class="fa-solid fa-moon"></i>';
//     }
//     // Use localStorage to remember the user's preference
//     localStorage.setItem('theme', html.getAttribute('data-bs-theme'));
//   });

//   // Check if the user has already set a preference for the theme
//   if (localStorage.getItem('theme') === 'dark') {
//     themeToggle.checked = true;
//     html.setAttribute('data-bs-theme', 'dark');
//     icon.innerHTML = '<i class="fas fa-sun"></i>';
//   } else {
//     themeToggle.checked = false;
//     html.setAttribute('data-bs-theme', 'light');
//     icon.innerHTML = '<i class="fa-solid fa-moon"></i>';
//   }
// });
