(() => {
  'use strict';

  const track = (eventName, parameters = {}) => {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', eventName, parameters);
      else if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: eventName, ...parameters });
    } catch (_) {
      // Analytics must never interfere with the website experience.
    }
  };

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');

  document.querySelectorAll('nav').forEach((nav) => {
    if (!nav.hasAttribute('aria-label')) nav.setAttribute('aria-label', 'Main navigation');
  });
  document.querySelectorAll('.brand-mark').forEach((mark) => mark.setAttribute('aria-hidden', 'true'));
  if (toggle && !toggle.hasAttribute('aria-label')) toggle.setAttribute('aria-label', 'Open navigation');

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const divisionPages = new Set(['technology.html', 'trade-energy-resources.html', 'media-entertainment.html', 'industrial-refrigeration.html']);
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const destination = (link.getAttribute('href') || '').split(/[?#]/)[0] || 'index.html';
    const isCurrent = destination === currentPage
      || (divisionPages.has(currentPage) && link.getAttribute('href')?.includes('#divisions'));
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else if (link.getAttribute('aria-current') === 'page') link.removeAttribute('aria-current');
  });

  document.querySelectorAll('img').forEach((image) => {
    if (!image.hasAttribute('decoding')) image.setAttribute('decoding', 'async');
  });

  const closeMenu = () => {
    links?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open navigation');
  };

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    links?.classList.toggle('open', !open);
  });

  links?.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    const destination = link.getAttribute('href') || '';
    if (/technology|trade-energy-resources|media-entertainment|industrial-refrigeration/.test(destination)) {
      track('division_navigation', { destination });
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && links?.classList.contains('open')) {
      closeMenu();
      toggle?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (links?.classList.contains('open') && !event.target.closest('.nav')) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  }, { passive: true });

  if (header && !header.classList.contains('inner')) {
    const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }), { threshold: .12 })
    : null;
  document.querySelectorAll('.reveal').forEach((element) => observer ? observer.observe(element) : element.classList.add('visible'));

  document.querySelectorAll('#year').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const params = new URLSearchParams(window.location.search);
  const select = document.querySelector('[name="inquiry_type"]');
  const validInquiryValues = select ? Array.from(select.options).map((option) => option.value) : [];
  let inquiry = params.get('inquiry');
  try {
    if (!inquiry) inquiry = sessionStorage.getItem('gigahash_inquiry_type');
  } catch (_) {
    // The form remains understandable when browser storage is unavailable.
  }
  if (select && inquiry && validInquiryValues.includes(inquiry)) select.value = inquiry;
  const inquiryGuidance = document.querySelector('#inquiry-guidance');
  const messageLabel = document.querySelector('label[for="message"]');
  const inquiryInstructions = {
    technology: 'Include the business need, intended users, existing systems, required integrations, current stage and target timing.',
    'oil-gas': 'Include the product, specification, volume, origin or destination, delivery basis, timing, mandate status and available documentation. Do not submit confidential documents through this form.',
    fisheries: 'Include the species or product, fresh/frozen/smoked form, volume, origin or destination, season or timing, cold-chain requirements, mandate status and available origin or compliance documentation.',
    trade: 'Include the product, specification, volume, origin or destination, delivery terms, timing and whether you represent the buyer or seller.',
    resources: 'Include the resource or asset, location, ownership or mandate status, project stage, available documentation and the role you want Gigahash to consider.',
    talent: 'Include the talent category, territory, current representation status, audience, commercial objectives, availability and the type of opportunity or support required.',
    'events-sponsorship': 'Include the event concept, location, audience, timing, organizer status, requested sponsor category, available rights and the role you want Gigahash to consider.',
    'media-production': 'Include the film, media or production need, territory, audience, timing, rights status and the type of partner or production support required.',
    industrial: 'Include the operating use case, site, capacity, temperature or performance requirements, equipment status, location and target timing.',
    investment: 'Include the opportunity, sector, current stage, capital or strategic need, proposed role and relevant timing.',
    rewardsplanet: 'Include your organization, proposed partnership type, technology, content, reward or market contribution, and the outcome you want to explore.',
    other: 'Describe the business need, location, current stage, timing and the role you want Gigahash to consider.'
  };
  const inquiryLabels = {
    technology: 'Describe the technology project',
    'oil-gas': 'Describe the oil, gas or petroleum opportunity',
    fisheries: 'Describe the fisheries or seafood opportunity',
    trade: 'Describe the trade or supply requirement',
    resources: 'Describe the mining or resource opportunity',
    talent: 'Describe the talent representation or booking opportunity',
    'events-sponsorship': 'Describe the event or sponsorship opportunity',
    'media-production': 'Describe the film, media or production inquiry',
    industrial: 'Describe the industrial or refrigeration project',
    investment: 'Describe the investment or strategic opportunity',
    rewardsplanet: 'Describe the RewardsPlanet partnership idea',
    other: 'Describe the opportunity'
  };
  const updateInquiryGuidance = () => {
    if (!inquiryGuidance || !select) return;
    inquiryGuidance.textContent = inquiryInstructions[select.value]
      || 'Choose the closest match so we can route your submission appropriately.';
    if (messageLabel) messageLabel.textContent = inquiryLabels[select.value] || 'Briefly describe the opportunity';
  };
  updateInquiryGuidance();
  select?.addEventListener('change', () => {
    try { sessionStorage.setItem('gigahash_inquiry_type', select.value); } catch (_) {}
    track('opportunity_selection', { inquiry_type: select.value });
    updateInquiryGuidance();
  });

  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.includes('opportunities.html')) track('opportunity_cta_click', { destination: href });
      if (href.includes('rewardsplanet.html')) track('rewardsplanet_interest', { destination: href });
      if (/^https?:\/\//.test(href) && !href.includes(location.hostname)) track('outbound_link', { destination: href });
    });
  });

  document.querySelectorAll('form[data-ajax]').forEach((form) => {
    form.addEventListener('input', () => {
      track('form_start', { form_subject: form.querySelector('[name="_subject"]')?.value || 'inquiry' });
    }, { once: true });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      const button = form.querySelector('button[type="submit"]');
      if (!form.checkValidity()) {
        track('form_validation_error');
        return form.reportValidity();
      }

      button.disabled = true;
      if (status) status.textContent = 'Sending your inquiry...';
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Submission failed');
        track('form_submission_success', { inquiry_type: select?.value || 'general' });
        form.reset();
        try { sessionStorage.removeItem('gigahash_inquiry_type'); } catch (_) {}
        if (status) status.textContent = 'Thank you. Your inquiry has been received.';
        const successUrl = form.dataset.successUrl;
        if (successUrl) window.setTimeout(() => window.location.assign(successUrl), 900);
      } catch (_) {
        track('form_submission_error');
        if (status) status.textContent = 'We could not send this form. Please email info@gigahashgroup.com.';
      } finally {
        button.disabled = false;
      }
    });
  });
})();
