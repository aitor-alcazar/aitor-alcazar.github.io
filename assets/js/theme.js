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

  function initCarousel() {
    var carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(function (carousel) {
      var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-slide]'));
      if (!slides.length) {
        return;
      }

      var status = carousel.querySelector('.carousel-status');
      var prevButton = carousel.querySelector('.carousel-prev');
      var nextButton = carousel.querySelector('.carousel-next');
      var indicators = Array.prototype.slice.call(carousel.querySelectorAll('[data-carousel-index]'));
      var currentIndex = 0;

      function updateActive(index) {
        currentIndex = (index + slides.length) % slides.length;
        slides.forEach(function (slide, idx) {
          slide.classList.toggle('active', idx === currentIndex);
        });
        if (status) {
          status.textContent = (currentIndex + 1) + ' / ' + slides.length;
        }
        indicators.forEach(function (button, idx) {
          var active = idx === currentIndex;
          button.classList.toggle('active', active);
          button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
      }

      if (prevButton) {
        prevButton.addEventListener('click', function () {
          updateActive(currentIndex - 1);
        });
      }

      if (nextButton) {
        nextButton.addEventListener('click', function () {
          updateActive(currentIndex + 1);
        });
      }

      indicators.forEach(function (button) {
        button.addEventListener('click', function () {
          var targetIndex = parseInt(button.getAttribute('data-carousel-index'), 10);
          updateActive(targetIndex);
        });
      });

      carousel.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          if (prevButton) prevButton.click();
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          if (nextButton) nextButton.click();
        }
      });

      carousel.setAttribute('tabindex', '0');
      updateActive(0);
    });
  }

  function init() {
    root.classList.remove('no-js');
    root.classList.add('js');
    initTheme();
    initCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
