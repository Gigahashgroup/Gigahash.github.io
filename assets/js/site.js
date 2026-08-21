(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links?.classList.toggle('open', !open);
  });

  links?.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      links.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  });

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
  document.querySelectorAll('.reveal').forEach((el) => observer ? observer.observe(el) : el.classList.add('visible'));

  const params = new URLSearchParams(window.location.search);
  const inquiry = params.get('inquiry');
  const select = document.querySelector('[name="inquiry_type"]');
  if (inquiry && select) select.value = inquiry;

  document.querySelectorAll('form[data-ajax]').forEach((form) => {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      const button = form.querySelector('button[type="submit"]');
      if (!form.checkValidity()) return form.reportValidity();
      button.disabled = true;
      if (status) status.textContent = 'Sending your inquiry...';
      try {
        const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Submission failed');
        form.reset();
        if (status) status.textContent = 'Thank you. Your inquiry has been received.';
      } catch (error) {
        if (status) status.textContent = 'We could not send this form. Please email info@gigahashgroup.com.';
      } finally {
        button.disabled = false;
      }
    });
  });
})();
