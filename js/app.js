const A='assets/';
const WEDDING_DATE='2026-10-25T04:00:00+05:30';
const pages=[
 {type:'greeting',k:'WEDDING GREETINGS',sub:'With joy in our hearts',title:'Dhiviyan R',second:'Meenaloshini S',copy:'Together with our families, we invite you to celebrate the beginning of our forever.',date:'25 · 10 · 2026',day:'SUNDAY'},
 {type:'invite',k:'WEDDING INVITATION',sub:'We cordially invite you',title:'to the wedding of',second:'Dhiviyan R & Meenaloshini S',copy:'Your presence and blessings will make our celebration complete.'},
 {type:'story',k:'OUR STORY',sub:'Two families · Two hearts',title:'Dhiviyan R',second:'Meenaloshini S',story:'What began as an arranged meeting slowly became a beautiful bond. Two families brought us together; every meeting brought more comfort; shared smiles became affection; and affection quietly grew into love.',line:'Two families. Two hearts. One beautiful journey.'},
 {type:'venue',k:'WEDDING CEREMONY',sub:'Sunday · 25 October 2026 · 4:00 AM – 6:00 AM',title:'Arulmigu Thiru Dhandayudhapani Swamy Temple',img:'temple.png',map:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7827.574755042421!2d78.19702832391894!3d11.203361476875445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babc934d928a9cf%3A0x2314aed2a65da005!2sArulmigu%20Thiru%20Dhandayudhapani%20SwamyTemple!5e0!3m2!1sen!2sin!4v1789895733033!5m2!1sen!2sin',link:'https://maps.app.goo.gl/LHNeB3Z5MGhMieSM9'},
 {type:'venue',k:'RECEPTION',sub:'Sunday · 25 October 2026 · 11:00 AM – 3:00 PM',title:'NRL Marriage Hall',img:'marriage-hall.png',map:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1956.808137336093!2d78.18244783506799!3d11.216000987826316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babcebfabf74c05%3A0x8b03ce56a7272e86!2sNRL%20Marriage%20Hall!5e0!3m2!1sen!2sin!4v1789895796927!5m2!1sen!2sin',link:'https://maps.app.goo.gl/AcHCEb3QfQESiGnf8'},
 {type:'families',k:'WITH BLESSINGS',sub:'Two families, one new beginning',title:'Blessed by our families',copy:'With the love, blessings and good wishes of our parents and families.'},
 {type:'final',k:'A NOTE FROM US',sub:'Dhiviyan & Meenaloshini',title:'Your presence',second:'means the world to us',copy:'Please join us, bless us and celebrate this beautiful beginning with us.',line:'With love, always',sign:'Dhiviyan R & Meenaloshini S'},
 {type:'countdown',k:'THE COUNTDOWN BEGINS',sub:'Until we become husband & wife',title:'Countdown',second:'to our marriage',copy:'25 October 2026 · 4:00 AM'}
];
const music = document.getElementById("weddingMusic");

async function startMusic() {
    try {
        await music.play();
        document.body.classList.add("music-playing");
    } catch (error) {
        document.body.classList.add("music-required");
    }
}

// Try automatically when the invitation opens
window.addEventListener("load", () => {
    startMusic();
});

// First interaction fallback
document.addEventListener("pointerdown", () => {
    if (music.paused) {
        startMusic();
    }
}, { once: true });

const familyNames={bride:['Sivakumar V','Poongodi S'],groom:['Rajagopal K','Subbulakshmi M']};
const pagesEl=document.getElementById('pages'),dots=document.getElementById('dots');let current=0,busy=false,auto=true,timer=null,startX=0,startY=0;
function logo(){return '<div class="ganapathi-logo"><img src="'+A+'ganapathi.png'+'" alt="Vinayagar blessing"><span>॥ श्री गणेशाय नमः ॥</span></div>'}
function pageMarkup(p,i){
 let body='';
 const no=String(i+1).padStart(2,'0')+' / 08';
 if(p.type==='greeting') body=`${logo()}<div class="kicker">${p.k}</div><div class="subtitle">${p.sub}</div><h1><span class="groom-name">${p.title}</span><span class="and">&amp;</span><span class="bride-name">${p.second}</span></h1><div class="copy">${p.copy}</div><div class="date"><div class="day">${p.date.split(' · ')[0]}</div><div class="month">OCTOBER<small>2026</small></div></div><div class="weekday">${p.day}</div><div class="heart">♡</div><div class="page-no">${no}</div>`;
 if(p.type==='invite') body=`${logo()}<div class="kicker">${p.k}</div><div class="subtitle">${p.sub}</div><h1>${p.title}<span class="and">&amp;</span>${p.second}</h1><div class="copy">${p.copy}</div><div class="couple-wrap couple-bottom"><img class="couple-photo" src="${A}couple/couple-photo.png" alt="Dhiviyan and Meenaloshini"></div><div class="page-no">${no}</div>`;
 if(p.type==='story') body=`${logo()}<div class="kicker">${p.k}</div><div class="subtitle">${p.sub}</div><div class="story-names"><span class="groom-name">Dhiviyan R</span><span class="story-heart">&amp;</span><span class="bride-name">Meenaloshini S</span></div><div class="story-gallery"><figure class="story-card story-card-1"><img src="${A}couple/story-01-first-meeting.png" alt="Dhiviyan and Meenaloshini first meeting"><figcaption>01 · FIRST MEETING</figcaption></figure><figure class="story-card story-card-2"><img src="${A}couple/story-02-meeting.png" alt="Dhiviyan and Meenaloshini second meeting"><figcaption>02 · SECOND MEETING</figcaption></figure><figure class="story-card story-card-3"><img src="${A}couple/story-03-meeting.png" alt="Dhiviyan and Meenaloshini third meeting"><figcaption>03 · SHARED SMILES</figcaption></figure><figure class="story-card story-card-4"><img src="${A}couple/story-04-meeting.png" alt="Dhiviyan and Meenaloshini fourth meeting"><figcaption>04 · BECOMING US</figcaption></figure></div><div class="story-line">${p.line}</div><div class="story-small">${p.story}</div><div class="page-no">${no}</div>`;
 if(p.type==='venue') body=`<div class="kicker">${p.k}</div><div class="subtitle">${p.sub}</div><img class="venue-photo" src="${A}venues/${p.img}" alt="${p.title}"><div class="venue-title">${p.title}</div><div class="location-row"><a class="location-btn" href="${p.link}" target="_blank" rel="noopener">OPEN LOCATION</a></div><div class="map-wrap"><iframe src="${p.map}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="page-no">${no}</div>`;
 if(p.type==='families') body=`${logo()}<div class="kicker">${p.k}</div><div class="subtitle">${p.sub}</div><div class="blessing">${p.copy}</div><div class="family"><div><h3>BRIDE'S FAMILY</h3><p>${familyNames.bride.join('<br>')}</p></div><div><h3>GROOM'S FAMILY</h3><p>${familyNames.groom.join('<br>')}</p></div></div><div class="heart">♡</div><div class="page-no">${no}</div>`;
 if(p.type==='final') body=`<div class="kicker">${p.k}</div><div class="subtitle">${p.sub}</div><h1>${p.title}<span class="and">&amp;</span>${p.second}</h1><div class="final-note">${p.copy}</div><div class="signature">${p.line}<br><strong>${p.sign}</strong></div><div class="heart">♡</div><div class="page-no">${no}</div>`;
 if(p.type==='countdown') body=`${logo()}<div class="kicker">${p.k}</div><div class="subtitle">${p.sub}</div><h1>${p.title}<span class="and">&amp;</span>${p.second}</h1><div class="countdown" id="countdown"><div><strong data-unit="days">--</strong><span>DAYS</span></div><i>:</i><div><strong data-unit="hours">--</strong><span>HOURS</span></div><i>:</i><div><strong data-unit="minutes">--</strong><span>MINUTES</span></div><i>:</i><div><strong data-unit="seconds">--</strong><span>SECONDS</span></div></div><div class="countdown-date">${p.copy}</div><div class="heart">♡</div><div class="page-no">${no}</div>`;
 return `<article class="page ${i===0?'current':''}" data-i="${i}"><div class="page-inner"><div class="content">${body}</div></div></article>`;
}
pagesEl.innerHTML=pages.map(pageMarkup).join('');dots.innerHTML=pages.map((_,i)=>`<span class="${i===0?'active':''}"></span>`).join('');
function setDots(){[...dots.children].forEach((x,i)=>x.classList.toggle('active',i===current))}
function turn(target,dir){if(busy||target===current)return;busy=true;clearTimeout(timer);const old=document.querySelector(`[data-i="${current}"]`),next=document.querySelector(`[data-i="${target}"]`);next.classList.add('prepare');requestAnimationFrame(()=>old.classList.add(dir==='next'?'flip-next':'flip-prev'));setTimeout(()=>{old.className='page';next.className='page current';current=target;setDots();busy=false;if(auto)start()},930)}
function next(){turn((current+1)%pages.length,'next')}function prev(){turn((current-1+pages.length)%pages.length,'prev')}
document.getElementById('next').onclick=next;document.getElementById('prev').onclick=prev;dots.onclick=e=>{const i=[...dots.children].indexOf(e.target);if(i>=0)turn(i,i>current?'next':'prev')};
function start(){clearTimeout(timer);if(auto)timer=setTimeout(next,6000)}
document.getElementById('auto').onclick=()=>{auto=!auto;document.getElementById('auto').textContent=auto?'AUTO':'PAUSE';auto?start():clearTimeout(timer)};document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev()});document.addEventListener('touchstart',e=>{startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY},{passive:true});document.addEventListener('touchend',e=>{const x=e.changedTouches[0].clientX,y=e.changedTouches[0].clientY,dx=x-startX,dy=y-startY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))dx<0?next():prev()},{passive:true});
document.getElementById('full').onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch(e){}};
const audio=document.getElementById('audio');audio.src=A+'music/wedding.mp3';document.getElementById('music').onclick=async()=>{try{if(audio.paused){await audio.play();document.getElementById('music').textContent='❚❚'}else{audio.pause();document.getElementById('music').textContent='♫'}}catch(e){alert('Add your MP3 as assets/music/wedding.mp3')}};

function updateCountdown(){const el=document.getElementById('countdown');if(!el)return;const diff=Math.max(0,new Date(WEDDING_DATE).getTime()-Date.now());const total=Math.floor(diff/1000);const days=Math.floor(total/86400);const hours=Math.floor(total%86400/3600);const minutes=Math.floor(total%3600/60);const seconds=total%60;el.querySelector('[data-unit="days"]').textContent=String(days).padStart(2,'0');el.querySelector('[data-unit="hours"]').textContent=String(hours).padStart(2,'0');el.querySelector('[data-unit="minutes"]').textContent=String(minutes).padStart(2,'0');el.querySelector('[data-unit="seconds"]').textContent=String(seconds).padStart(2,'0')}
setInterval(updateCountdown,1000);updateCountdown();
function bokeh(){const b=document.getElementById('bokeh');for(let i=0;i<11;i++){const e=document.createElement('i');e.className='bokeh';e.style.left=(8+i*8.2)+'%';e.style.top=(10+(i*17)%78)+'%';e.style.width=e.style.height=(4+i%5*2)+'px';e.style.setProperty('--d',(7+i%5*2)+'s');e.style.setProperty('--delay',(-i)+'s');b.appendChild(e)}}
function air(){const a=document.getElementById('air');for(let i=0;i<10;i++){const e=document.createElement('i');e.className='airline';e.style.top=(10+i*8)+'vh';e.style.setProperty('--y',((i%3)-1)*2+'vh');e.style.setProperty('--d',(14+i%5*2)+'s');e.style.setProperty('--delay',(-i*2)+'s');a.appendChild(e)}}
const flowerFiles=['pink-large-01.png','pink-small-01.png','lavender-01.png','white-01.png'];const petalFiles=Array.from({length:18},(_,i)=>`petal-${String(i+1).padStart(2,'0')}.png`);const butterflyFiles=Array.from({length:14},(_,i)=>`butterfly-${String(i+1).padStart(2,'0')}.png`);
function fallingFlowers(){const l=document.getElementById('fallingFlowers');for(let i=0;i<12;i++){const e=document.createElement('i');e.className='flower-fall';e.style.left=(i*8.3%100)+'%';e.style.width=(22+i%4*8)+'px';e.style.height=e.style.width;e.style.backgroundImage=`url('${A}flowers/${flowerFiles[i%flowerFiles.length]}')`;e.style.setProperty('--d',(18+i%5*3)+'s');e.style.setProperty('--delay',(-i*3)+'s');e.style.setProperty('--x',((i%2?-1:1)*(35+i%4*20))+'px');e.style.setProperty('--x2',((i%2?1:-1)*(45+i%5*18))+'px');l.appendChild(e)}}
function petals(){const l=document.getElementById('petals');for(let i=0;i<28;i++){const e=document.createElement('i');e.className='petal';e.style.left=(i*3.7%100)+'%';const s=7+i%5*3;e.style.width=e.style.height=s+'px';e.style.backgroundImage=`url('${A}petals/individual/${petalFiles[i%petalFiles.length]}')`;e.style.setProperty('--d',(14+i%7*2)+'s');e.style.setProperty('--delay',(-i*1.5)+'s');e.style.setProperty('--o',(0.25+i%5*.08).toFixed(2));e.style.setProperty('--x',((i%2?-1:1)*(30+i%6*15))+'px');e.style.setProperty('--x2',((i%2?1:-1)*(50+i%5*18))+'px');l.appendChild(e)}}
const paths=[
 ['-8vw','24vh','16vw','12vh','36vw','27vh','60vw','15vh','105vw','23vh'],
 ['108vw','44vh','88vw','32vh','67vw','54vh','40vw','37vh','-8vw','50vh'],
 ['-8vw','70vh','18vw','56vh','42vw','73vh','68vw','60vh','108vw','69vh'],
 ['104vw','18vh','86vw','28vh','66vw','14vh','39vw','29vh','-7vw','18vh'],
 ['-6vw','42vh','20vw','51vh','44vw','38vh','73vw','49vh','106vw','41vh'],
 ['105vw','76vh','82vw','66vh','55vw','79vh','28vw','65vh','-8vw','76vh'],
 ['12vw','108vh','26vw','76vh','49vw','56vh','72vw','30vh','94vw','-10vh'],
 ['92vw','110vh','74vw','82vh','52vw','60vh','27vw','35vh','4vw','-8vh']
];
function butterflies(){
 const l=document.getElementById('butterflies');
 const sizes=[26,31,36,42,48,54,61,68,29,38,45,57,33,72,41,50,27,64,35,46];
 for(let i=0;i<20;i++){
   const e=document.createElement('i'), p=paths[i%paths.length], s=sizes[i];
   e.className='butterfly '+(i%4===0?'slow':'fast');
   e.style.width=s+'px';
   e.style.height=(s*.78)+'px';
   e.style.backgroundImage=`url('${A}butterflies/individual/${butterflyFiles[i%butterflyFiles.length]}')`;
   e.style.setProperty('--d',(i%4===0?10.5:4.8+(i%5)*.65)+'s');
   e.style.setProperty('--delay',(-i*1.35)+'s');
   for(let n=0;n<5;n++){
     e.style.setProperty(`--x${n+1}`,p[n*2]);
     e.style.setProperty(`--y${n+1}`,p[n*2+1]);
     e.style.setProperty(`--r${n+1}`,((i+n)%2?'-':'')+(2+i%5)+'deg');
   }
   // A little individual wing-flight rhythm.
   e.style.setProperty('--wing',(0.18+(i%4)*0.05)+'s');
   l.appendChild(e);
 }
 // A few tiny "background" butterflies add depth without crowding the card.
 for(let i=0;i<8;i++){
   const e=document.createElement('i'), p=paths[(i+3)%paths.length], s=18+i%4*5;
   e.className='butterfly fast butterfly-tiny';
   e.style.width=s+'px'; e.style.height=(s*.78)+'px';
   e.style.backgroundImage=`url('${A}butterflies/individual/${butterflyFiles[(i+5)%butterflyFiles.length]}')`;
   e.style.setProperty('--d',(4.2+i%3*.55)+'s'); e.style.setProperty('--delay',(-i*.9)+'s');
   for(let n=0;n<5;n++){
     e.style.setProperty(`--x${n+1}`,p[n*2]);
     e.style.setProperty(`--y${n+1}`,p[n*2+1]);
     e.style.setProperty(`--r${n+1}`,((i+n)%2?'-':'')+(1+i%3)+'deg');
   }
   l.appendChild(e);
 }
}
bokeh();air();fallingFlowers();petals();butterflies();
const curtain=document.getElementById('curtain');
setTimeout(()=>{
  document.body.classList.add('curtain-open');
  setTimeout(()=>start(),1250);
},4300);
