/* script.js — Corrección:
   - Inputs ocultos: habilitar click en .service-img-wrap para abrir el file picker
   - Slider testimonios robusto (muestra correctamente los 3 testimonios)
   - Slider instalaciones robusto
   - Mantener validación del formulario
*/

/* 1) Hacer que la caja de imagen sea el trigger del input file (inputs están ocultos por CSS) */
document.querySelectorAll('.service-card').forEach(card => {
  const imgWrap = card.querySelector('.service-img-wrap');
  const input = card.querySelector('.img-uploader');

  if (!imgWrap || !input) return;

  // Al hacer click en la caja de imagen, abrir file picker
  imgWrap.addEventListener('click', () => input.click());

  // También soportar arrastrar y soltar imagen (drop)
  imgWrap.addEventListener('dragover', (e) => {
    e.preventDefault();
    imgWrap.style.opacity = '0.95';
  });
  imgWrap.addEventListener('dragleave', () => {
    imgWrap.style.opacity = '1';
  });
  imgWrap.addEventListener('drop', (e) => {
    e.preventDefault();
    imgWrap.style.opacity = '1';
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      input.files = e.dataTransfer.files;
      // disparar change manualmente
      const ev = new Event('change');
      input.dispatchEvent(ev);
    }
  });

  // Cuando se selecciona archivo, previsualizar
  input.addEventListener('change', function(ev) {
    const file = ev.target.files[0];
    if (!file) return;
    const imgEl = card.querySelector('.service-img');
    const reader = new FileReader();
    reader.onload = (e) => {
      imgEl.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});

/* 2) Testimonios slider robusto: ahora se asegura mostrar todos los slides */
(function(){
  const slider = document.getElementById('testimonials-slider');
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');
  const dotsWrap = document.getElementById('dots');

  if (!slider || !dotsWrap) return;

  const slides = Array.from(slider.querySelectorAll('.testimonial-slide'));
  let active = 0;

  // forzar estilos necesarios
  slider.style.display = 'flex';
  slider.style.transition = 'transform 0.45s ease';
  slides.forEach(s => s.style.flex = '0 0 100%');

  // construir dots (limpio antes)
  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = i === 0 ? 'dot active' : 'dot';
    btn.setAttribute('aria-label', 'Ir al testimonio ' + (i+1));
    btn.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(btn);
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

  // asegurar que al cambiar tamaño la posición siga correcta
  window.addEventListener('resize', update);

  // inicializar
  update();
})();

/* 3) Galería instalaciones (robusto) */
(function(){
  const slider = document.getElementById('gallery-slider');
  const prevBtn = document.getElementById('prevGal');
  const nextBtn = document.getElementById('nextGal');
  const dotsWrap = document.getElementById('dotsGal');

  if (!slider || !dotsWrap) return;

  const slides = Array.from(slider.querySelectorAll('.gallery-slide'));
  let active = 0;

  slider.style.display = 'flex';
  slider.style.transition = 'transform 0.45s ease';
  slides.forEach(s => s.style.flex = '0 0 100%');

  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = i === 0 ? 'dot active' : 'dot';
    btn.setAttribute('aria-label', 'Ir a la instalación ' + (i+1));
    btn.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(btn);
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
