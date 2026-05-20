(function () {
  var root = document.documentElement;
  var storageKey = 'theme-choice';
  var buttons;

  function preferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(choice) {
    var theme = choice === 'auto' ? preferredTheme() : choice;
    root.setAttribute('data-theme', theme);
    if (buttons) {
      buttons.forEach(function (button) {
        button.classList.toggle('active', button.getAttribute('data-theme-choice') === choice);
      });
    }
  }

  function init() {
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
