/* ============================================================
   LETTERBOXD-THEMED PORTFOLIO — script.js
   Author: @miabeyefendi
   ============================================================ */

(function () {
  'use strict';

  // ── Dynamic year in footer ──
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Fade-in on scroll (Intersection Observer) ──
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately for older browsers
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Active nav link highlight on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (sections.length && navLinks.length) {
    var scrollTimeout;

    function onScroll() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        var scrollY = window.scrollY || window.pageYOffset;
        var active = null;

        sections.forEach(function (section) {
          var offsetTop = section.offsetTop - 80;
          if (scrollY >= offsetTop) {
            active = section.getAttribute('id');
          }
        });

        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          if (active && link.getAttribute('href') === '#' + active) {
            link.classList.add('nav__link--active');
          }
        });
      }, 50);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Smooth scroll for all anchor links (in-page) ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      var target = document.getElementById(targetId);
      if (!target) return;

      // Only prevent default if prefers-reduced-motion is not set
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        e.preventDefault();
        var offset = 66; // nav height
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
        // Move focus to target for keyboard/screen reader users
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });

  // ── Stagger link-card animation delay ──
  var linkCards = document.querySelectorAll('.link-card');
  linkCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.035) + 's';
  });

  // ── Stagger project card animation delay ──
  var projectCards = document.querySelectorAll('.card');
  projectCards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.1) + 's';
  });

}());
