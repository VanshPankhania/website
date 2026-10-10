(function () {
  const tabs = document.querySelectorAll('.tab');
  const ink = document.querySelector('.tab-ink');
  const cards = Array.from(document.querySelectorAll('.card'));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Sliding underline under the active tab
  function moveInk(tab) {
    ink.style.width = tab.offsetWidth + 'px';
    ink.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
  }
  const active = () => document.querySelector('.tab.active');
  moveInk(active());
  addEventListener('resize', () => moveInk(active()));
  document.fonts && document.fonts.ready.then(() => moveInk(active()));

  // Filter projects: fade out, swap, fade in
  let timer;
  tabs.forEach(tab => tab.addEventListener('click', () => {
    if (tab.classList.contains('active')) return;
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    moveInk(tab);

    const f = tab.dataset.filter;
    clearTimeout(timer);
    cards.forEach(c => c.classList.add('out'));
    timer = setTimeout(() => {
      cards.forEach(c => { c.hidden = !(f === 'all' || c.dataset.cat === f); });
      requestAnimationFrame(() => requestAnimationFrame(() =>
        cards.forEach(c => c.classList.remove('out'))));
    }, reduce ? 0 : 280);
  }));

  // Cards rise in once as they scroll into view
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target); }
    }), { threshold: .15 });
    cards.forEach((c, i) => { c.classList.add('pre'); c.style.transitionDelay = (i % 3) * 70 + 'ms'; io.observe(c); });
    // Clear the stagger delay after entry so filtering stays snappy
    cards.forEach(c => c.addEventListener('transitionend', () => { c.style.transitionDelay = ''; }, { once: true }));
  }

  // Show a labelled placeholder until you add the image file
  document.querySelectorAll('.shot img').forEach(img => {
    const mark = () => img.parentElement.classList.add('empty');
    img.addEventListener('error', mark);
    if (img.complete && img.naturalWidth === 0) mark();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
