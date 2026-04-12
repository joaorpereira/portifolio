(function () {
  var STORAGE_KEY = 'portfolio-reveal';
  var QUERY_KEY = 'password';
  var QUERY_VAL = 'veterano';

  function applyRevealState() {
    try {
      var sp = new URLSearchParams(window.location.search);
      if (sp.get(QUERY_KEY) === QUERY_VAL) {
        try {
          sessionStorage.setItem(STORAGE_KEY, '1');
        } catch (e) {}
        sp.delete(QUERY_KEY);
        var q = sp.toString();
        var path = window.location.pathname + (q ? '?' + q : '') + window.location.hash;
        window.history.replaceState({}, '', path);
      }
    } catch (e) {}

    var ok = false;
    try {
      ok = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {}

    document.documentElement.setAttribute('data-reveal', ok ? '1' : '0');

    try {
      var p = window.location.pathname.replace(/\/$/, '') || '/';
      if (p === '/projects' && !ok) {
        window.location.replace('/');
      }
    } catch (e) {}
  }

  function stripSensitiveDom() {
    var ok = document.documentElement.getAttribute('data-reveal') === '1';

    if (!ok) {
      document.querySelectorAll('[data-sensitive]').forEach(function (n) {
        n.remove();
      });
      document.querySelectorAll('a[data-sensitive-card]').forEach(function (a) {
        var d = document.createElement('div');
        d.className = a.className;
        d.removeAttribute('href');
        d.innerHTML = a.innerHTML;
        a.parentNode.replaceChild(d, a);
      });
      return;
    }

    document.querySelectorAll('a[data-reveal-link]').forEach(function (a) {
      var h = a.getAttribute('href');
      if (!h || h.startsWith('mailto:') || h.startsWith('http:') || h.startsWith('https:') || h.startsWith('//'))
        return;
      try {
        var u = new URL(h, window.location.origin);
        if (u.origin !== window.location.origin) return;
        u.searchParams.set(QUERY_KEY, QUERY_VAL);
        a.setAttribute('href', u.pathname + u.search + u.hash);
      } catch (e) {}
    });
  }

  applyRevealState();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stripSensitiveDom);
  } else {
    stripSensitiveDom();
  }
})();
