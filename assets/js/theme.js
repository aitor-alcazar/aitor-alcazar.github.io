(function () {
  var root = document.documentElement;
  var storageKey = 'theme-choice';
  var buttons = [];

  function preferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(choice) {
    var theme = choice === 'auto' ? preferredTheme() : choice;
    root.setAttribute('data-theme', theme);
    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-theme-choice') === choice;
      button.classList.toggle('active', isActive);
    });
  }

  function initTheme() {
    buttons = Array.prototype.slice.call(document.querySelectorAll('[data-theme-choice]'));
    var saved = localStorage.getItem(storageKey) || 'auto';
    applyTheme(saved);

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var choice = button.getAttribute('data-theme-choice');
        localStorage.setItem(storageKey, choice);
        applyTheme(choice);
      });
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      if ((localStorage.getItem(storageKey) || 'auto') === 'auto') {
        applyTheme('auto');
      }
    });
  }

  function init() {
    root.classList.remove('no-js');
    root.classList.add('js');
    initTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
