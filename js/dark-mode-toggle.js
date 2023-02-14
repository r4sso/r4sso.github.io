document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('#dark-mode-toggle');
  const icon = document.querySelector('[data-feather]');
  const html = document.querySelector('html');

  feather.replace();

  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      html.setAttribute('data-bs-theme', 'dark');
      icon.setAttribute('data-feather', 'sun');
      feather.replace();
    } else {
      html.setAttribute('data-bs-theme', 'light');
      icon.setAttribute('data-feather', 'moon');
      feather.replace();
    }
    // Use localStorage to remember the user's preference
    localStorage.setItem('theme', html.getAttribute('data-bs-theme'));
  });

  // Check if the user has already set a preference for the theme
  if (localStorage.getItem('theme') === 'dark') {
    themeToggle.checked = true;
    html.setAttribute('data-bs-theme', 'dark');
    icon.setAttribute('data-feather', 'sun');
    feather.replace();
  } else {
    themeToggle.checked = false;
    html.setAttribute('data-bs-theme', 'light');
    icon.setAttribute('data-feather', 'moon');
    feather.replace();
  }
});
