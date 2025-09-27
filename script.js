// script.js - Interactividad: galería, chat popup, form send (demo)

// GALLERY SLIDER
document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.slides-track');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.slide-arrow.prev');
  const nextBtn = document.querySelector('.slide-arrow.next');
  const dotsContainer = document.getElementById('gallery-dots');

  if (!track) return;

  let current = 0;
  function renderDots() {
    dotsContainer.innerHTML = '';
    slides.forEach((s, i) => {
      const b = document.createElement('button');
      if (i === 0) b.classList.add('active');
      b.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(b);
    });
  }
  function update() {
    const w = track.clientWidth;
    track.style.transform = `translateX(-${current * 100}%)`;
    const dots = Array.from(dotsContainer.children);
    dots.forEach(d => d.classList.remove('active'));
    if (dots[current]) dots[current].classList.add('active');
  }
  function goTo(i) {
    current = (i + slides.length) % slides.length;
    update();
  }
  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  renderDots();
  update();

  // CHAT POPUP
  const openChatBtn = document.getElementById('open-chat-btn');
  openChatBtn && openChatBtn.addEventListener('click', () => {
    const w = 420, h = 700;
    const left = (screen.width / 2) - (w / 2);
    const top = (screen.height / 2) - (h / 2);
    // chatbot.html debe estar en la misma carpeta raíz (o actualiza la ruta)
    window.open('chatbot.html', 'EmanuelChat', `width=${w},height=${h},top=${top},left=${left},resizable=yes`);
  });

  // CONTACT FORM - demo: reemplaza fetch por tu endpoint (Apps Script o EmailJS)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
      };
      // Aquí puedes enviar con fetch a tu Apps Script:
      // fetch(APP_SCRIPT_URL, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)})
      //   .then(res=>res.json()).then(r=>{ alert('Registro enviado'); form.reset(); });

      alert('Registro enviado. Gracias — demo.'); 
      form.reset();
    });
  }
});
