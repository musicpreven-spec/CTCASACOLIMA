// Galería y demo de contacto
document.addEventListener('DOMContentLoaded', function(){
  const track=document.querySelector('.slides-track');
  const slides=Array.from(document.querySelectorAll('.slide'));
  const prev=document.querySelector('.slide-arrow.prev');
  const next=document.querySelector('.slide-arrow.next');
  const dotsContainer=document.querySelector('.gallery-dots');
  if(track && slides.length){
    let current=0;
    function update(){track.style.transform=`translateX(-${current*100}%)`;dotsContainer.querySelectorAll('button').forEach((b,i)=>b.classList.toggle('active',i===current))}
    slides.forEach(()=>{const b=document.createElement('button');dotsContainer.appendChild(b);b.addEventListener('click',()=>{current=Array.from(dotsContainer.children).indexOf(b);update()})})
    prev.addEventListener('click',()=>{current=(current-1+slides.length)%slides.length;update()})
    next.addEventListener('click',()=>{current=(current+1)%slides.length;update()})
    update()
  }

  // Chat popup
  const btn=document.getElementById('open-chat-btn');
  btn && btn.addEventListener('click',()=>{window.open('chatbot.html','EmanuelChat','width=420,height=700,resizable=yes')})

  // Contact form demo
  const form=document.getElementById('contact-form');
  form && form.addEventListener('submit',e=>{e.preventDefault();alert('Registro enviado — demo');form.reset()})
});
