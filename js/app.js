const $=id=>document.getElementById(id), A='assets/';
const pageData=[
 {k:'WEDDING INVITATION',title:'Dhiviyan R',second:'Meenaloshini S',sub:'Together with their families',copy:'With hearts full of love and dreams of forever,<br>we invite you to celebrate the beginning of our beautiful journey.',date:true},
 {k:'A BEAUTIFUL BEGINNING',title:'Two Hearts',second:'One Journey',sub:'A new chapter begins',copy:'Two lives, two stories, and one beautiful future.<br>We would be delighted to have you with us as our forever begins.',heart:true},
 {k:'THE WEDDING CEREMONY',title:'25 OCTOBER',second:'2026',sub:'4:00 AM — 6:00 AM',venue:'<strong>Arulmigu Thiru Dhandayudhapani Swamy Temple</strong><br>Join us as we exchange our vows and begin our married life together.'},
 {k:'RECEPTION',title:'CELEBRATE',second:'WITH US',sub:'11:00 AM — 3:00 PM',venue:'<strong>NRL Marriage Hall</strong><br>Come celebrate, smile, dine and make beautiful memories with us.'},
 {k:'WITH LOVE',title:'Dhiviyan R',second:'Meenaloshini S',sub:'25 · 10 · 2026',copy:'Thank you for being part of our special day.<br>Our forever begins here. ♡',heart:true}
];
const pages=$('pages'), dots=$('dots');
let current=0,busy=false,autoMode=true,timer=null,touchX=0,touchY=0;
function renderPage(p,i){let extra=p.date?'<div class="date"><div class="day">25</div><div class="month">OCTOBER<small>2026</small></div></div>':'';if(p.heart)extra+='<div class="heart">♡</div>';if(p.venue)extra='<div class="venue">'+p.venue+'</div>';return '<article class="page '+(i===0?'current':'')+'" data-page="'+i+'"><div class="page-inner"><div class="content"><div class="ornament">❧ &nbsp;✦&nbsp; ❧</div><div class="kicker">'+p.k+'</div><div class="subtitle">'+p.sub+'</div><h1>'+p.title+'<span class="and">&amp;</span>'+p.second+'</h1><div class="divider"><i></i><b>❦</b><i></i></div>'+(p.copy?'<div class="copy">'+p.copy+'</div>':'')+extra+'<div class="page-no">'+String(i+1).padStart(2,'0')+' / 05</div></div></div></article>'}
pages.innerHTML=pageData.map(renderPage).join('');dots.innerHTML=pageData.map((_,i)=>'<span class="'+(i===0?'active':'')+'"></span>').join('');
function updateDots(){[...dots.children].forEach((d,i)=>d.classList.toggle('active',i===current))}
function stopAuto(){clearTimeout(timer);timer=null}
function startAuto(){stopAuto();if(autoMode)timer=setTimeout(()=>turn((current+1)%pageData.length,'next'),5000)}
function turn(target,dir){if(busy||target===current)return;busy=true;stopAuto();const old=document.querySelector('[data-page="'+current+'"]'),nextPage=document.querySelector('[data-page="'+target+'"]');nextPage.classList.add('prepare');requestAnimationFrame(()=>old.classList.add(dir==='next'?'flip-next':'flip-prev'));setTimeout(()=>{old.className='page';nextPage.className='page current';current=target;updateDots();busy=false;startAuto()},930)}
$('next').onclick=()=>turn((current+1)%pageData.length,'next');$('prev').onclick=()=>turn((current-1+pageData.length)%pageData.length,'prev');dots.onclick=e=>{const i=[...dots.children].indexOf(e.target);if(i>=0)turn(i,i>current?'next':'prev')};document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')$('next').click();if(e.key==='ArrowLeft')$('prev').click()});document.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;touchY=e.changedTouches[0].clientY},{passive:true});document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX,dy=e.changedTouches[0].clientY-touchY;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))dx<0?$('next').click():$('prev').click()},{passive:true});
$('auto').onclick=()=>{autoMode=!autoMode;$('auto').textContent=autoMode?'AUTO':'PAUSE';autoMode?startAuto():stopAuto()};$('full').onclick=async()=>{try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch(e){}};const audio=$('audio');$('music').onclick=async()=>{if(!audio.src)audio.src=A+'music/wedding.mp3';try{if(audio.paused){await audio.play();$('music').textContent='❚❚'}else{audio.pause();$('music').textContent='♫'}}catch(e){}};
/* ===== GARDEN BUILDER: INDIVIDUAL PNGS, HAND-COMPOSED ===== */
function addPiece(parent, cls, src, x, y, w, h, rot=0, dur='9s', delay='0s', mx='2px', my='2px', sc='1'){
 const e=document.createElement('div');
 e.className='garden-piece '+cls;
 e.style.left=x; e.style.top=y; e.style.width=w; e.style.height=h;
 e.style.backgroundImage=`url("${src}")`;
 e.style.setProperty('--rot',rot+'deg'); e.style.setProperty('--d',dur); e.style.setProperty('--delay',delay);
 e.style.setProperty('--mx',mx); e.style.setProperty('--my',my); e.style.setProperty('--sc',sc);
 parent.appendChild(e); return e;
}
const flowerFiles=['pink-large-01.png','pink-small-01.png','pink-small-02.png','white-01.png','lavender-01.png'];
const leafFiles=Array.from({length:18},(_,i)=>`leaf-${String(i+1).padStart(2,'0')}.png`);
const stemFiles=Array.from({length:4},(_,i)=>`stem-${String(i+1).padStart(2,'0')}.png`);
const wl=Array.from({length:14},(_,i)=>`wisteria-long-${String(i+1).padStart(2,'0')}.png`);
const wm=Array.from({length:6},(_,i)=>`wisteria-medium-${String(i+1).padStart(2,'0')}.png`);
const ws=Array.from({length:15},(_,i)=>`wisteria-short-${String(i+1).padStart(2,'0')}.png`);

function cornerCluster(host, mirror, seed, flipY=false){
 const sx=mirror?-1:1, sy=flipY?-1:1;
 // Three stems make the skeleton. Flowers/leaves sit directly on the skeleton.
 const stems=[
  [4,8,185,285,-13,'7.5s'],[24,0,170,270,8,'9s'],[47,12,155,255,-5,'10.5s']
 ];
 stems.forEach((s,j)=>addPiece(host,'gc-stem',A+'stems/'+stemFiles[(seed+j)%stemFiles.length],s[0]+'%',s[1]+'%',s[2]+'px',s[3]+'px',sx*s[4],s[5],-(j+seed*.3)+'s',sx*3+'px',sy*2+'px','.98'));

 // Flowers are intentionally clustered near stem ends, not scattered.
 const flowers=[
  [4,7,96,96,-8,0],[25,4,74,74,8,1],[45,10,64,64,-4,2],
  [15,28,60,60,7,3],[35,27,54,54,-7,4],[3,43,48,48,-10,2],[29,47,44,44,8,1]
 ];
 flowers.forEach((q,j)=>addPiece(host,'gc-flower',A+'flowers/'+flowerFiles[(seed+q[5]+j)%flowerFiles.length],q[0]+'%',q[1]+'%',q[2]+'px',q[3]+'px',sx*q[4],(6.5+j*.75)+'s',-(j*.7+seed*.15)+'s',sx*2+'px',sy*2+'px',j%3===0?'1':'.94'));

 // Leaves are placed beside the stems in pairs, producing real botanical branches.
 const leafPos=[
  [12,17,-28],[29,15,25],[49,19,-20],[9,33,22],[25,36,-26],[43,35,21],
  [4,51,-22],[20,51,27],[37,52,-24],[52,47,20],[15,63,-26],[34,63,24]
 ];
 leafPos.forEach((q,j)=>addPiece(host,'gc-leaf',A+'leaves/individual/'+leafFiles[(seed*3+j)%leafFiles.length],q[0]+'%',q[1]+'%',(38+(j%3)*6)+'px',(48+(j%2)*7)+'px',sx*q[2],(7.2+(j%4)*1.1)+'s',-(j*.45)+'s',sx*1+'px',sy*2+'px','.96'));

 // Wisteria hangs down from the upper inner edge of the bouquet.
 const wis=[
  ['long',wl[(seed*2)%wl.length],2,0,132,215,-2],
  ['medium',wm[(seed+2)%wm.length],28,2,96,155,2],
  ['short',ws[(seed+5)%ws.length],51,6,72,118,-2],
  ['short',ws[(seed+9)%ws.length],15,5,66,108,3]
 ];
 wis.forEach((q,j)=>{
  const folder=q[0]==='long'?'wisteria-long':q[0]==='medium'?'wisteria-medium':'wisteria-short';
  addPiece(host,'gc-wisteria',A+'wisteria/individual/'+folder+'/'+q[1],q[2]+'%',q[3]+'%',q[4]+'px',q[5]+'px',sx*q[6],(8+j*1.4)+'s',-(j*1.1+seed*.2)+'s',sx*2+'px',sy*4+'px','.97');
 });
}

function buildGarden(){
 const g=$('garden');
 const tl=document.createElement('div'),tr=document.createElement('div'),bl=document.createElement('div'),br=document.createElement('div');
 tl.className='garden-cluster corner-tl';tr.className='garden-cluster corner-tr';bl.className='garden-cluster corner-bl';br.className='garden-cluster corner-br';
 g.append(tl,tr,bl,br);
 cornerCluster(tl,false,1,false);cornerCluster(tr,true,4,false);cornerCluster(bl,false,7,true);cornerCluster(br,true,10,true);
 // two very light side accents built from individual stems/leaves only
 ['left','right'].forEach((side,idx)=>{
  const s=document.createElement('div');s.className='side-sprig '+side;g.appendChild(s);
  addPiece(s,'gc-stem',A+'stems/stem-0'+(idx+2)+'.png','10%','5%',130,220,idx?-18:-18,'12s',idx?'-4s':'-1s',idx?-2:2,2,'.9');
  for(let j=0;j<4;j++)addPiece(s,'gc-leaf',A+'leaves/individual/'+leafFiles[idx*4+j],(18+j*18)+'%',(25+j*14)+'%',35,46,(j%2?-25:25)*(idx?-1:1),(8+j)+'s',-(j*.8)+'s',idx?-1:1,2,'.9');
 });
}

function makeBokeh(){const b=$('bokeh');[[17,26,7,9],[29,64,5,11],[38,18,5,8],[67,22,7,10],[82,31,6,9],[91,65,8,12],[13,73,5,10],[76,79,7,9]].forEach(([x,y,s,d],i)=>{const e=document.createElement('span');e.className='bokeh';e.style.left=x+'%';e.style.top=y+'%';e.style.width=e.style.height=s+'px';e.style.setProperty('--d',d+'s');e.style.setProperty('--delay',-i+'s');b.appendChild(e)})}
function makeAir(){const l=$('air');for(let i=0;i<12;i++){const e=document.createElement('span');e.className='air';e.style.top=(8+i*7)+'vh';e.style.setProperty('--y',((i%3)-1)*2+'vh');e.style.setProperty('--r',(i%2?2:-2)+'deg');e.style.setProperty('--d',(12+i%5*2)+'s');e.style.setProperty('--delay',-i*1.6+'s');l.appendChild(e)}}
function makePetals(){const l=$('petals');for(let i=0;i<44;i++){const e=document.createElement('span'),n=i%50+1;e.className='petal';e.style.left=(i*2.31%100)+'%';e.style.width=e.style.height=(9+(i%6)*3)+'px';e.style.backgroundImage='url("'+A+'petals/individual/petal-'+String(n).padStart(2,'0')+'.png")';e.style.setProperty('--d',(10+(i%8)*1.4)+'s');e.style.setProperty('--delay',-i*1.2+'s');e.style.setProperty('--o',(.32+(i%5)*.1));e.style.setProperty('--a',((i%2?1:-1)*(30+(i%7)*11))+'px');e.style.setProperty('--b',((i%2?-1:1)*(45+(i%6)*14))+'px');e.style.setProperty('--c',((i%2?1:-1)*(38+(i%8)*12))+'px');e.style.setProperty('--e',((i%2?-1:1)*(60+(i%9)*10))+'px');l.appendChild(e)}}
function makeButterflies(){const l=$('butterflies'),files=Array.from({length:14},(_,i)=>A+'butterflies/individual/butterfly-'+String(i+1).padStart(2,'0')+'.png');const paths=[['-8vw','20vh','12vw','14vh','28vw','25vh','44vw','13vh','62vw','24vh','110vw','16vh'],['110vw','32vh','94vw','20vh','79vw','38vh','61vw','28vh','43vw','41vh','-10vw','26vh'],['-8vw','63vh','12vw','51vh','28vw','68vh','48vw','55vh','70vw','70vh','108vw','58vh'],['96vw','12vh','83vw','21vh','67vw','9vh','51vw','22vh','34vw','12vh','-7vw','20vh'],['-6vw','82vh','18vw','72vh','35vw','84vh','54vw','73vh','75vw','84vh','106vw','72vh']];for(let i=0;i<22;i++){const p=paths[i%paths.length],e=document.createElement('div'),size=i<5?82+(i*7):i<13?54+(i%4)*8:32+(i%5)*6;e.className='butterfly';e.style.width=size+'px';e.style.height=size*.78+'px';e.style.backgroundImage='url("'+files[i%files.length]+'")';e.style.setProperty('--d',(i<5?12+i%3*2:i<13?7+i%4:4.8+i%4*.7)+'s');e.style.setProperty('--delay',-i*1.6+'s');for(let n=0;n<6;n++){e.style.setProperty('--x'+(n+1),p[n*2]);e.style.setProperty('--y'+(n+1),p[n*2+1]);e.style.setProperty('--r'+(n+1),((i+n)%2?-1:1)*(2+i%4)+'deg')}l.appendChild(e)}}
function startle(x,y){document.querySelectorAll('.butterfly').forEach(b=>{const r=b.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,d=Math.hypot(x-cx,y-cy);if(d<190){b.classList.add('startled');b.style.setProperty('--x2',(cx-x)*.75+'px');b.style.setProperty('--y2',(cy-y)*.75+'px');setTimeout(()=>b.classList.remove('startled'),900)}})}window.addEventListener('pointermove',e=>startle(e.clientX,e.clientY),{passive:true});window.addEventListener('pointerdown',e=>startle(e.clientX,e.clientY),{passive:true});
buildGarden();makeBokeh();makeAir();makePetals();makeButterflies();startAuto();
