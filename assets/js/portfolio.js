/* Sanjit Kulkarni — Portfolio (2026 redesign)
   Vanilla JS only: mobile nav, scrollspy, header state, scroll-reveal.
   Used only by index.html. */
(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Mobile nav drawer */
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Header background once the page scrolls past the hero */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Scrollspy: highlight the nav link for the section in view */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute("id");
          navAnchors.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  /* Reveal-on-scroll for elements marked .reveal. A generous rootMargin
     triggers the reveal just before an element reaches the viewport so
     fast/flick scrolling doesn't skip past it unrevealed. The timeout
     below is a hard safety net: nothing stays invisible for more than
     2.5s no matter what the observer does. */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "150px 0px 0px 0px" }
    );
    revealEls.forEach(function (el) {
      reveal.observe(el);
    });
    setTimeout(function () {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 2500);
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
