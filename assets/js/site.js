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
  const divisionPages = new Set([
    'technology.html',
    'trade-energy-resources.html',
    'oil-gas-petroleum.html',
    'fisheries-seafood.html',
    'mining-specialty-products.html',
    'media-entertainment.html',
    'industrial-refrigeration.html'
  ]);
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const destination = (link.getAttribute('href') || '').split(/[?#]/)[0] || 'index.html';
    const isCurrent = destination === currentPage
      || (divisionPages.has(currentPage) && destination === 'what-we-do.html');
    if (isCurrent) link.setAttribute('aria-current', 'page');
    else if (link.getAttribute('aria-current') === 'page') link.removeAttribute('aria-current');
  });

  document.querySelectorAll('img').forEach((image) => {
    if (!image.hasAttribute('decoding')) image.setAttribute('decoding', 'async');
  });

  const explorationRoutes = {
    'about.html': {
      title: 'Keep exploring Gigahash Global.',
      copy: 'Move from our corporate perspective into the businesses, opportunities and relationships that make it practical.',
      links: [
        ['What we do', 'Explore the operating divisions.', 'what-we-do.html'],
        ['Present an opportunity', 'Start with a qualified business conversation.', 'opportunities.html'],
        ['Contact Gigahash', 'Reach the Seattle corporate team.', 'contact.html']
      ]
    },
    'what-we-do.html': {
      title: 'Choose the business that fits the opportunity.',
      copy: 'Explore a focused capability, then continue directly into a qualified conversation when the fit is clear.',
      links: [
        ['Technology', 'Digital solutions, deployment and support.', 'technology.html'],
        ['Trade & resources', 'Energy, fisheries, mining and specialty products.', 'trade-energy-resources.html'],
        ['Present an opportunity', 'Share the context for a first review.', 'opportunities.html']
      ]
    },
    'technology.html': {
      title: 'Connect technology with execution.',
      copy: 'A technology requirement often depends on equipment, implementation and a practical operating plan.',
      links: [
        ['Industrial systems', 'Explore refrigeration and engineered infrastructure.', 'industrial-refrigeration.html'],
        ['Trade & resources', 'See commercial and supply-side capabilities.', 'trade-energy-resources.html'],
        ['Discuss a technology project', 'Present the need, stage and intended outcome.', 'opportunities.html?inquiry=technology']
      ]
    },
    'trade-energy-resources.html': {
      title: 'Follow the opportunity into the right market.',
      copy: 'Move from the broader commercial view into a focused sector or begin a qualified review.',
      links: [
        ['Oil, gas & petroleum', 'Explore qualified energy opportunities.', 'oil-gas-petroleum.html'],
        ['Fisheries & seafood', 'Explore sourcing, cold-chain and market relationships.', 'fisheries-seafood.html'],
        ['Present an opportunity', 'Start with the mandate and commercial context.', 'opportunities.html?inquiry=trade']
      ]
    },
    'oil-gas-petroleum.html': {
      title: 'Build the commercial route around the mandate.',
      copy: 'Related capabilities can help connect supply, infrastructure and market requirements.',
      links: [
        ['Mining & specialty products', 'Explore additional resource and trade opportunities.', 'mining-specialty-products.html'],
        ['Industrial systems', 'Explore engineered infrastructure support.', 'industrial-refrigeration.html'],
        ['Discuss an energy opportunity', 'Share the specification, volume and timing.', 'opportunities.html?inquiry=oil-gas']
      ]
    },
    'fisheries-seafood.html': {
      title: 'Connect the product to the cold chain and market.',
      copy: 'A strong fisheries opportunity depends on sourcing, logistics and the right commercial counterparties.',
      links: [
        ['Industrial systems', 'Explore cold-chain and refrigeration capabilities.', 'industrial-refrigeration.html'],
        ['Trade & resources', 'Return to the wider commercial portfolio.', 'trade-energy-resources.html'],
        ['Discuss a fisheries opportunity', 'Share the product, volume and timing.', 'opportunities.html?inquiry=fisheries']
      ]
    },
    'mining-specialty-products.html': {
      title: 'Move from resource to commercial route.',
      copy: 'Explore related market capabilities or begin a qualified conversation about the underlying opportunity.',
      links: [
        ['Oil, gas & petroleum', 'Explore another focused energy and resource practice.', 'oil-gas-petroleum.html'],
        ['Technology', 'Explore systems that support implementation and visibility.', 'technology.html'],
        ['Discuss a resource opportunity', 'Share the asset, mandate and stage.', 'opportunities.html?inquiry=resources']
      ]
    },
    'media-entertainment.html': {
      title: 'Take the idea from audience to execution.',
      copy: 'Connect talent, production, sponsorship and commercial relationships through the right next conversation.',
      links: [
        ['RewardsPlanet', 'Explore a developing Gigahash consumer venture.', 'rewardsplanet.html'],
        ['What we do', 'See the wider Gigahash portfolio.', 'what-we-do.html'],
        ['Discuss a media opportunity', 'Share the audience, timing and intended role.', 'opportunities.html?inquiry=media-production']
      ]
    },
    'industrial-refrigeration.html': {
      title: 'Extend the system beyond the equipment.',
      copy: 'Explore the sectors where engineered infrastructure, logistics and commercial coordination meet.',
      links: [
        ['Fisheries & seafood', 'Explore cold-chain dependent opportunities.', 'fisheries-seafood.html'],
        ['Technology', 'Explore digital and operational systems.', 'technology.html'],
        ['Discuss an industrial project', 'Share the site, capacity and operating need.', 'opportunities.html?inquiry=industrial']
      ]
    },
    'rewardsplanet.html': {
      title: 'Explore the venture in context.',
      copy: 'RewardsPlanet is a developing Gigahash venture. Continue into the corporate portfolio or start a partnership conversation.',
      links: [
        ['What we do', 'Explore Gigahash operating businesses.', 'what-we-do.html'],
        ['Present a partnership', 'Share the contribution and intended outcome.', 'opportunities.html?inquiry=rewardsplanet'],
        ['Contact Gigahash', 'Reach the corporate team.', 'contact.html']
      ]
    },
    'opportunities.html': {
      title: 'Prepare the next conversation.',
      copy: 'Review the relevant business area before submitting a qualified opportunity, or contact the corporate team for a general inquiry.',
      links: [
        ['What we do', 'Find the closest Gigahash business.', 'what-we-do.html'],
        ['Contact Gigahash', 'Start a general corporate conversation.', 'contact.html'],
        ['About Gigahash', 'Understand the wider operating perspective.', 'about.html']
      ]
    },
    'contact.html': {
      title: 'Find the right starting point.',
      copy: 'Use the corporate contact route for general questions, or explore a business area before presenting a defined opportunity.',
      links: [
        ['What we do', 'Explore the Gigahash operating businesses.', 'what-we-do.html'],
        ['Present an opportunity', 'Use the qualified opportunity gateway.', 'opportunities.html'],
        ['About Gigahash', 'Read the corporate perspective.', 'about.html']
      ]
    },
    'thankyou.html': {
      title: 'Continue exploring while we review your inquiry.',
      copy: 'Your message is on its way. Learn more about the businesses and capabilities behind the conversation.',
      links: [
        ['What we do', 'Explore the Gigahash portfolio.', 'what-we-do.html'],
        ['About Gigahash', 'Read the corporate perspective.', 'about.html'],
        ['RewardsPlanet', 'Explore a developing Gigahash venture.', 'rewardsplanet.html']
      ]
    }
  };
  const explorationRoute = explorationRoutes[currentPage];
  const main = document.querySelector('main');
  if (explorationRoute && main) {
    const section = document.createElement('section');
    section.className = 'explore-next';
    section.setAttribute('aria-labelledby', 'explore-next-title');
    const container = document.createElement('div');
    container.className = 'container';
    const heading = document.createElement('div');
    heading.className = 'explore-next-heading';
    const eyebrow = document.createElement('p');
    eyebrow.className = 'eyebrow gold';
    eyebrow.textContent = 'Continue exploring';
    const title = document.createElement('h2');
    title.id = 'explore-next-title';
    title.textContent = explorationRoute.title;
    const copy = document.createElement('p');
    copy.textContent = explorationRoute.copy;
    heading.append(eyebrow, title, copy);
    try {
      const referrerUrl = new URL(document.referrer);
      const isSameSiteReferrer = referrerUrl.origin === location.origin && referrerUrl.href !== location.href;
      if (isSameSiteReferrer) {
        const backLink = document.createElement('a');
        backLink.className = 'explore-back';
        backLink.href = `${referrerUrl.pathname}${referrerUrl.search}${referrerUrl.hash}`;
        backLink.textContent = '← Back to previous page';
        backLink.addEventListener('click', (event) => {
          if (history.length > 1) {
            event.preventDefault();
            history.back();
          }
        });
        heading.append(backLink);
      }
    } catch (_) {}
    const grid = document.createElement('div');
    grid.className = 'explore-next-grid';
    explorationRoute.links.forEach(([label, description, href]) => {
      const link = document.createElement('a');
      link.className = 'explore-next-card';
      link.href = href;
      const linkLabel = document.createElement('strong');
      linkLabel.textContent = label;
      const linkDescription = document.createElement('span');
      linkDescription.textContent = description;
      link.append(linkLabel, linkDescription);
      link.addEventListener('click', () => track('exploration_navigation', { destination: href, source: currentPage }));
      grid.append(link);
    });
    container.append(heading, grid);
    section.append(container);
    main.append(section);
  }

  const sensitiveInformationNotice = 'Do not submit passwords, account or payment details, identity documents, tax or banking records, verification codes, API keys, confidential files, or other sensitive personal information through this public form.';
  document.querySelectorAll('form[data-ajax]').forEach((form) => {
    const message = form.querySelector('textarea[name="message"]');
    if (!message) return;
    const noticeId = 'sensitive-information-notice';
    const existingNotice = form.querySelector(`#${noticeId}`);
    if (!existingNotice) {
      const notice = document.createElement('p');
      notice.id = noticeId;
      notice.className = 'form-guidance';
      notice.textContent = sensitiveInformationNotice;
      message.insertAdjacentElement('afterend', notice);
    }
    const describedBy = new Set((message.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
    describedBy.add(noticeId);
    message.setAttribute('aria-describedby', Array.from(describedBy).join(' '));
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
