(function () {
  document.querySelectorAll('.shot img').forEach(img => {
    const mark = () => img.parentElement.classList.add('empty');
    img.addEventListener('error', mark);
    if (img.complete && img.naturalWidth === 0) mark();
  });
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 });
    items.forEach(i => io.observe(i));
  } else items.forEach(i => i.classList.add('in'));
  document.getElementById('year').textContent = new Date().getFullYear();
})();
