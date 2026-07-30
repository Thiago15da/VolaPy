/**
 * VOLA — Core Application Module
 * vola.com.py · Private Aviation Platform
 */

'use strict';

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const CONFIG = {
  whatsapp: {
    number: '595981234567',
  },
  scroll: {
    navThreshold: 40,
  },
  magnetic: {
    strength: 0.35,
    maxOffset: 12,
  },
};

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/**
 * Builds a WhatsApp deep-link with a pre-formatted message.
 * @param {string} message
 * @returns {string}
 */
function buildWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.whatsapp.number}?text=${encoded}`;
}

/* ------------------------------------------------------------------ */
/*  Navigation — Glassmorphism on Scroll                               */
/* ------------------------------------------------------------------ */

const Nav = {
  el: null,

  init() {
    this.el = $('#nav');
    if (!this.el) return;

    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    this.initMobile();
  },

  handleScroll() {
    const scrolled = window.scrollY > CONFIG.scroll.navThreshold;
    this.el.classList.toggle('nav--scrolled', scrolled);
  },

  initMobile() {
    const toggle = $('#navToggle');
    const mobile = $('#navMobile');
    if (!toggle || !mobile) return;

    toggle.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('nav__mobile--open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      mobile.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    $$('.nav__mobile-link, .nav__mobile .btn', mobile).forEach((link) => {
      link.addEventListener('click', () => {
        mobile.classList.remove('nav__mobile--open');
        toggle.setAttribute('aria-expanded', 'false');
        mobile.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  },
};

/* ------------------------------------------------------------------ */
/*  Flight Quoter — WhatsApp Redirect                                  */
/* ------------------------------------------------------------------ */

const Quoter = {
  form: null,
  originInput: null,
  destinationInput: null,

  init() {
    this.form = $('#quoterForm');
    this.originInput = $('#origin');
    this.destinationInput = $('#destination');

    if (!this.form) return;

    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  },

  handleSubmit(event) {
    event.preventDefault();

    const origin = this.originInput.value.trim();
    const destination = this.destinationInput.value.trim();

    if (!origin || !destination) {
      this.showError();
      return;
    }

    const message = I18n.formatQuoteMessage(origin, destination);
    const url = buildWhatsAppUrl(message);

    window.open(url, '_blank', 'noopener,noreferrer');
  },

  showError() {
    this.form.classList.add('quoter--error');
    this.form.addEventListener(
      'animationend',
      () => this.form.classList.remove('quoter--error'),
      { once: true }
    );

    const emptyField = !this.originInput.value.trim()
      ? this.originInput
      : this.destinationInput;

    emptyField.focus();
  },
};

/* ------------------------------------------------------------------ */
/*  Concierge CTA — WhatsApp Redirect                                  */
/* ------------------------------------------------------------------ */

const Concierge = {
  init() {
    const btn = $('#conciergeBtn');
    if (!btn) return;

    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const url = buildWhatsAppUrl(I18n.getDefaultWhatsAppMessage());
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  },
};

/* ------------------------------------------------------------------ */
/*  Magnetic Hover — Premium Micro-interaction                         */
/* ------------------------------------------------------------------ */

const Magnetic = {
  elements: [],

  init() {
    this.elements = $$('[data-magnetic]');
    if (!this.elements.length) return;

    this.elements.forEach((el) => {
      el.addEventListener('mousemove', this.onMove.bind(this, el));
      el.addEventListener('mouseleave', this.onLeave.bind(this, el));
    });
  },

  onMove(el, event) {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * CONFIG.magnetic.strength;
    const deltaY = (event.clientY - centerY) * CONFIG.magnetic.strength;

    const x = Math.max(-CONFIG.magnetic.maxOffset, Math.min(CONFIG.magnetic.maxOffset, deltaX));
    const y = Math.max(-CONFIG.magnetic.maxOffset, Math.min(CONFIG.magnetic.maxOffset, deltaY));

    el.style.transform = `translate(${x}px, ${y}px)`;
  },

  onLeave(el) {
    el.style.transform = '';
  },
};

/* ------------------------------------------------------------------ */
/*  Scroll Reveal — Subtle Entry Animations                            */
/* ------------------------------------------------------------------ */

const Reveal = {
  observer: null,

  init() {
    const targets = $$('[data-reveal]');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => this.observer.observe(el));
  },
};

/* ------------------------------------------------------------------ */
/*  Smooth Anchor Navigation                                           */
/* ------------------------------------------------------------------ */

const Anchors = {
  init() {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;

        const target = $(id);
        if (!target) return;

        event.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;

        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth',
        });
      });
    });
  },
};

/* ------------------------------------------------------------------ */
/*  Bootstrap                                                          */
/* ------------------------------------------------------------------ */

document.addEventListener('DOMContentLoaded', () => {
  I18n.init();
  Nav.init();
  Quoter.init();
  Concierge.init();
  Magnetic.init();
  Reveal.init();
  Anchors.init();
});
