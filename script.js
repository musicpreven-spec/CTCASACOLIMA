/* script.js
 - Previsualización de imágenes (servicios)
 - Slider testimonios
 - Slider instalaciones
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

/* 2) Testimonios slider */
(function(){
  const slider = document.getElementById('testimonials-slider');
  const slides = Array.from(slider.querySelectorAll('.testimonial-slide'));
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');
  const dotsWrap = document.getElementById('dots');
  let active = 0;

  // crear dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = i === 0 ? 'dot active' : 'dot';
    if (i === 0) b.classList.add('active');
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

  prevBtn.addEventListener('click', () => goTo(active - 1));
  nextBtn.addEventListener('click', () => goTo(active + 1));

  // init
  slides.forEach(s => s.style.minWidth = '100%');
  update();
})();

/* 3) Galería instalaciones (cuadradas) */
(function(){
  const slider = document.getElementById('gallery-slider');
  const slides = Array.from(slider.querySelectorAll('.gallery-slide'));
  const prevBtn = document.getElementById('prevGal');
  const nextBtn = document.getElementById('nextGal');
  const dotsWrap = document.getElementById('dotsGal');
  let active = 0;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = i === 0 ? 'dot active' : 'dot';
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

  prevBtn.addEventListener('click', () => goTo(active - 1));
  nextBtn.addEventListener('click', () => goTo(active + 1));

  slides.forEach(s => s.style.minWidth = '100%');
  update();
})();

/* 4) Formulario: validación simple y limpieza (sin backend) */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const correo = document.getElementById('correo').value.trim();

  if(!nombre || !telefono || !correo){
    alert('Por favor completa los campos requeridos: Nombre, Teléfono y Correo.');
    return;
  }

  // Simulación de envío: podrías conectar jsmail / fetch aquí
  alert('Gracias, ' + nombre + '. Hemos recibido tu registro/solicitud de cita. Nos pondremos en contacto.');
  this.reset();
});
