// Script principal para interactividad: galería, formulario y pop-up de chatbot
dots.forEach(d=>d.classList.remove('active'));
if(dots[current]) dots[current].classList.add('active');
}
function goto(i){ current = (i+slides.length)%slides.length; update(); }
prevBtn.addEventListener('click', ()=>{ goto(current-1); });
nextBtn.addEventListener('click', ()=>{ goto(current+1); });
renderDots(); update();


// OPEN CHAT POPUP
const openChatBtn = document.getElementById('open-chat-btn');
openChatBtn.addEventListener('click', ()=>{
// abre ventana emergente con chatbot.html (asegúrate de subir chatbot.html al mismo directorio)
const w = 420, h = 700;
const left = (screen.width/2)-(w/2);
const top = (screen.height/2)-(h/2);
window.open('chatbot.html','EmanuelChat',`width=${w},height=${h},top=${top},left=${left}`);
});


// CONTACT FORM (envío simple a Google Apps Script o EmailJS)
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e){
e.preventDefault();
const data = {
name: document.getElementById('name').value,
phone: document.getElementById('phone').value,
email: document.getElementById('email').value,
reason: document.getElementById('reason').value,
message: document.getElementById('message').value
};
// Enviar a tu endpoint (Apps Script / EmailJS) - ejemplo: fetch(APP_SCRIPT_URL, {method:'POST', body: JSON.stringify(data)})
alert('Registro enviado. Pronto nos comunicaremos. (Demo)');
form.reset();
});
});