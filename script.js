/* ============================================================
   Андрей Батин — personal site
   ============================================================ */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- scroll progress + sticky nav ---------- */

  const progressBar = document.getElementById("progressBar");
  const nav = document.getElementById("nav");

  function onScroll() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    if (progressBar) progressBar.style.width = (ratio * 100).toFixed(2) + "%";
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
    setActiveLink();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* ---------- reveal on scroll ---------- */

  const revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- animated counters ---------- */

  const counters = document.querySelectorAll(".counter");

  function animateCounter(el) {
    const target = Number(el.dataset.value || 0);
    if (reduceMotion) {
      el.textContent = String(target);
      return;
    }
    const duration = 1100;
    const start = performance.now();

    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) { el.textContent = String(el.dataset.value || 0); });
  }

  /* ---------- active nav link ---------- */

  const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
  const sections = navLinks
    .map(function (link) {
      const id = link.getAttribute("href");
      return id && id.startsWith("#") ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  function setActiveLink() {
    if (!sections.length) return;
    const offset = 140;
    let current = null;

    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) current = section;
    });

    navLinks.forEach(function (link) {
      const id = link.getAttribute("href");
      link.classList.toggle("is-active", !!current && id === "#" + current.id);
    });
  }

  onScroll();
})();
