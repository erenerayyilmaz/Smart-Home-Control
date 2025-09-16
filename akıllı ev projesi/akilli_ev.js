
(function(){
  const root = document.documentElement;
  const toggleButton = document.getElementById('themeToggle');

  const applyTheme = (theme) => {
    if (!theme) return;
    root.setAttribute('data-theme', theme);
  };

  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }
})();
