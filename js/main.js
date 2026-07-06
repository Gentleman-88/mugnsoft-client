(function () {
  var doc = document.documentElement;
  if ('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)) {
    doc.className += ' is-touch';
  }

  var nav = document.querySelector('.w-nav');
  if (nav) {
    var menuButton = nav.querySelector('.w-nav-button');
    var navMenu = nav.querySelector('.w-nav-menu');
    var closeButton = nav.querySelector('.menu-close-icon-wrap');

    function setMenuOpen(isOpen) {
      if (!menuButton || !navMenu) return;
      menuButton.classList.toggle('w--open', isOpen);
      if (isOpen) {
        navMenu.setAttribute('data-nav-menu-open', '');
        document.body.style.overflow = 'hidden';
      } else {
        navMenu.removeAttribute('data-nav-menu-open');
        document.body.style.overflow = '';
      }
    }

    if (menuButton) {
      menuButton.addEventListener('click', function () {
        setMenuOpen(!menuButton.classList.contains('w--open'));
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', function () {
        setMenuOpen(false);
      });
    }
  }

  document.querySelectorAll('.w-tabs').forEach(function (tabs) {
    var links = tabs.querySelectorAll('.w-tab-link');
    var panes = tabs.querySelectorAll('.w-tab-pane');

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var tabId = link.getAttribute('data-tab');
        if (!tabId) return;

        links.forEach(function (item) {
          item.classList.remove('w--current');
        });
        panes.forEach(function (pane) {
          pane.classList.remove('w--tab-active');
        });

        link.classList.add('w--current');
        var activePane = tabs.querySelector('.w-tab-pane[data-tab="' + tabId + '"]');
        if (activePane) {
          activePane.classList.add('w--tab-active');
        }
      });
    });
  });

  var player = document.querySelector('wistia-player');
  var thumb = document.querySelector('.video-thumb-image');

  if (player && thumb) {
    player.addEventListener('play', function () {
      thumb.style.opacity = '0';
      thumb.style.pointerEvents = 'none';
    });

    function showThumbnail() {
      thumb.style.opacity = '1';
      thumb.style.pointerEvents = 'none';
    }

    player.addEventListener('pause', showThumbnail);
    player.addEventListener('ended', showThumbnail);
  }

  document.querySelectorAll('.faq-item-top').forEach(function (top) {
    top.addEventListener('click', function () {
      var answer = top.parentElement.querySelector('.faq-item-answer');
      var vertical = top.querySelector('.faq-icon-line.vertical');
      var lines = top.querySelectorAll('.faq-icon-line');
      var opened = answer.classList.contains('open');

      if (!opened) {
        answer.classList.add('open');
        answer.style.height = answer.scrollHeight + 'px';
        answer.addEventListener('transitionend', function handler() {
          answer.style.height = 'auto';
          answer.removeEventListener('transitionend', handler);
        });
        if (vertical) {
          vertical.style.transform = 'rotate(90deg)';
        }
        lines.forEach(function (line) {
          line.style.backgroundColor = '#028A49';
        });
      } else {
        answer.style.height = answer.scrollHeight + 'px';
        requestAnimationFrame(function () {
          answer.style.height = '0px';
        });
        answer.classList.remove('open');
        if (vertical) {
          vertical.style.transform = 'rotate(0deg)';
        }
        lines.forEach(function (line) {
          line.style.backgroundColor = '';
        });
      }
    });
  });

const container = document.querySelector(".eb-bk-frame-inner");

if (container) {

  function updateHeight() {
    const iframe = container.querySelector("iframe");

    if (!iframe) return;

    const h = iframe.getBoundingClientRect().height;

    if (h) {
      container.style.height = h + "px";
    }
  }

  const observer = new MutationObserver(() => {
    const iframe = container.querySelector("iframe");

    if (!iframe) return;

    updateHeight();

    new ResizeObserver(updateHeight).observe(iframe);

    observer.disconnect();
  });

  observer.observe(container, {
    childList: true,
    subtree: true
  });

  window.addEventListener("resize", updateHeight);
}
})();
