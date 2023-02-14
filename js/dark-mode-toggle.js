document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.querySelector('#dark-mode-toggle');
  const icon = document.querySelector('.icon-toggle');
  const html = document.querySelector('html');

  const setTheme = (theme) => {
    html.setAttribute('data-bs-theme', theme);
    themeToggle.checked = theme === 'dark';
    icon.setAttribute('data-feather', theme === 'dark' ? 'sun' : 'moon');
    feather.replace();
    localStorage.setItem('theme', theme);
  };

  themeToggle.addEventListener('change', () => {
    setTheme(themeToggle.checked ? 'dark' : 'light');
  });

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('light');
  }
});
