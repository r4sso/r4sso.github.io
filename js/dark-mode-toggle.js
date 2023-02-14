document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('#dark-mode-toggle');
  const icon = document.querySelector('.icon-toggle');
  const html = document.querySelector('html');

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      html.setAttribute('data-bs-theme', 'dark');
      icon.setAttribute('data-feather', 'sun');
    } else {
      html.setAttribute('data-bs-theme', 'light');
      icon.setAttribute('data-feather', 'moon');
    }
    // Use localStorage to remember the user's preference
    localStorage.setItem('theme', html.getAttribute('data-bs-theme'));

    // Replace the icon with the new one
    feather.replace();
  });

  // Check if the user has already set a preference for the theme
  if (localStorage.getItem('theme') === 'dark') {
    themeToggle.checked = true;
    html.setAttribute('data-bs-theme', 'dark');
    icon.setAttribute('data-feather', 'sun');
  } else {
    themeToggle.checked = false;
    html.setAttribute('data-bs-theme', 'light');
    icon.setAttribute('data-feather', 'moon');
  }

  // Replace the icon with the initial one
  feather.replace();
});