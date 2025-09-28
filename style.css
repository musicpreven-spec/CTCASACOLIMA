/* script.js — versión robusta
 - Previsualización de imágenes (servicios)
 - Slider testimonios (robusto con resize)
 - Slider instalaciones (robusto)
 - Manejo básico del formulario (local)
*/

/* 1) Previsualización: servicios */
document.querySelectorAll('.img-uploader').forEach(upl => {
  upl.addEventListener('change', function(ev) {
    const file = ev.target.files[0];
    const targetId = ev.target.dataset.target;
    if (!file) return;
    const imgEl = document.getElementById(targetId);
    const reader = new FileReader();
    reader.onload = (e) => {
      imgEl.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});

/* 2) Testimonios slider (robusto) */
(function(){
  const sliderContainer = document.getElementById('testimonials-slider'); // contenedor con slides
  if (!sliderContainer) return;

  const slides = Array.from(sliderContainer.querySelectorAll('.testimonial-slide'));
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');
  const dotsWrap = document.getElementById('dots');

  // envolver slider en viewport para overflow hidden (si no existe)
  let viewport = sliderContainer.parentElement;
  if (!viewport.classList.contains('testimonials-viewport')) {
    // asumo que en el HTML original el contenedor inmediato es el wrapper; si no, este paso no rompe nada
    // (en el CSS añadimos .testimonials-viewport - asegúrate de que el index.html tenga la estructura o simplemente funciona igualmente)
  }

  let active = 0;

  // asegurar estilos de flex en slides
  sliderContainer.style.display = 'flex';
  sliderContainer.style.transition = 'transform 0.45s ease';
  slides.forEach(s => {
    s.style.flex = '0 0 100%';
    s.style.boxSizing = 'border-box';
  });

  // crear dots
  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'dot' + (i === 0 ? ' active' : '');
    b.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });

  function update() {
    // mover slider
    sliderContainer.style.transform = `translateX(-${active * 100}%)`;
    // dots
    Array.from(dotsWrap.children).forEach((d, idx) => d.classList.toggle('active', idx === active));
  }

  function goTo(i) {
    active = Math.max(0, Math.min(slides.length - 1, i));
    update();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(active - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(active + 1));

  // responsive: en resize aseguramos que la transformación sigue siendo correcta
  window.addEventListener('resize', () => {
    // mantenemos la misma proporción, solo reaplicamos transform
    update();
  });

  // init
  update();
})();

/* 3) Galería instalaciones (robusto) */
(function(){
  const slider = document.getElementById('gallery-slider');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('.gallery-slide'));
  const prevBtn = document.getElementById('prevGal');
  const nextBtn = document.getElementById('nextGal');
  const dotsWrap = document.getElementById('dotsGal');

  let active = 0;

  slider.style.display = 'flex';
  slider.style.transition = 'transform 0.45s ease';
  slides.forEach(s => s.style.flex = '0 0 100%');

  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = i === 0 ? 'dot active' : 'dot';
    b.setAttribute('aria-label', 'Ir a la instalación ' + (i + 1));
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });

  function update() {
    slider.style.transform = `translateX(-${active * 100}%)`;
    Array.from(dotsWrap.children).forEach((d, idx) => d.classList.toggle('active', idx === active));
  }

  function goTo(i) {
    active = Math.max(0, Math.min(slides.length - 1, i));
    update();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(active - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(active + 1));

  window.addEventListener('resize', update);
  update();
})();

/* 4) Formulario: validación simple y limpieza (sin backend) */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    if(!nombre || !telefono || !correo){
      alert('Por favor completa los campos requeridos: Nombre, Teléfono y Correo.');
      return;
    }

    alert('Gracias, ' + nombre + '. Hemos recibido tu registro/solicitud de cita. Nos pondremos en contacto.');
    this.reset();
  });
}
