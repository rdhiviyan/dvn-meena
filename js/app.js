const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const petals = document.querySelector('.petals');
for(let i=0;i<34;i++){
  const p=document.createElement('span');
  p.className='petal';
  p.style.left=(Math.random()*100)+'%';
  p.style.animationDuration=(7+Math.random()*10)+'s';
  p.style.animationDelay=(-Math.random()*16)+'s';
  p.style.transform=`scale(${.45+Math.random()*.9}) rotate(${Math.random()*180}deg)`;
  petals.appendChild(p);
}

const target = new Date('2026-10-25T04:00:00+05:30').getTime();
function countdown(){
  let d = Math.max(0,target-Date.now());
  const day=Math.floor(d/86400000); d%=86400000;
  const hour=Math.floor(d/3600000); d%=3600000;
  const min=Math.floor(d/60000); d%=60000;
  const sec=Math.floor(d/1000);
  document.getElementById('days').textContent=String(day).padStart(2,'0');
  document.getElementById('hours').textContent=String(hour).padStart(2,'0');
  document.getElementById('minutes').textContent=String(min).padStart(2,'0');
  document.getElementById('seconds').textContent=String(sec).padStart(2,'0');
}
countdown(); setInterval(countdown,1000);

// Flower opening + wedding music
const openingScreen = document.getElementById('openingScreen');
const openInvitation = document.getElementById('openInvitation');
const weddingSong = document.getElementById('weddingSong');
const musicIndicator = document.getElementById('musicIndicator');

openInvitation.addEventListener('click', async () => {
  try {
    weddingSong.volume = 0.78;
    await weddingSong.play();
    musicIndicator.textContent = '♪ Playing';
    musicIndicator.classList.add('show');
  } catch (err) {
    musicIndicator.textContent = '♪ Tap to play';
    musicIndicator.classList.add('show');
  }
  openingScreen.classList.add('opened');
  document.body.classList.add('invitation-open');
  setTimeout(() => {
    openingScreen.remove();
    document.getElementById('home').scrollIntoView({behavior:'smooth'});
  }, 900);
});

musicIndicator.addEventListener('click', async () => {
  if (weddingSong.paused) {
    await weddingSong.play();
    musicIndicator.textContent = '♪ Playing';
  } else {
    weddingSong.pause();
    musicIndicator.textContent = '♪ Paused';
  }
});
