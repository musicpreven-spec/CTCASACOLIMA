/* script.js
 - Maneja previsualización de imágenes por servicio
 - Control simple del carrusel de testimonios
 - Control del formulario (sin backend)
*/

/* Utilidad: previsualizar imágenes subidas por servicio */
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

/* Testimonios: slider simple con flechas y puntos */
(function(){
  const slider = document.getElementById('testimonials-slider');
  const slides = Array.from(slider.querySelectorAll('.testimonial-slide'));
  const prevBtn = document.getElementById('prevTest');
  const nextBtn = document.getElementById('nextTest');
  const dotsWrap = document.getElementById('dots');
  let active = 0;

  // crear dots
  slides.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = i === 0 ? 'dot active' : 'dot';
    if (i === 0) b.classList.add('active');
    b.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(b);
  });

  function updateSlider() {
    // desplazamos el contenedor
    slider.style.transform = `translateX(-${active * 100}%)`;
    // actualizar dots
    Array.from(dotsWrap.children).forEach((d, idx) => {
      d.classList.toggle('active', idx === active);
    });
  }

  function goTo(i) {
    active = Math.max(0, Math.min(slides.length - 1, i));
    updateSlider();
  }

  prevBtn.addEventListener('click', () => goTo(active - 1));
  nextBtn.addEventListener('click', () => goTo(active + 1));

  // responsive: ajustar el ancho de cada slide para permitir translateX por %.
  function setSlidesWidth() {
    slides.forEach(s => s.style.minWidth = '100%');
  }
  window.addEventListener('resize', setSlidesWidth);
  setSlidesWidth();
  updateSlider();
})();

/* Formulario: acción local (sin backend) */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const correo = document.getElementById('correo').value.trim();

  // validación básica
  if(!nombre || !telefono || !correo){
    alert('Por favor completa los campos requeridos: Nombre, Teléfono y Correo.');
    return;
  }

  // aquí puedes integrar envío real (fetch / jsmail) más adelante
  // por ahora mostramos confirmación y limpiamos el formulario
  alert('Gracias, ' + nombre + '. Hemos recibido tu registro. Pronto nos comunicaremos contigo.');
  this.reset();
});

