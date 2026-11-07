const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const CUP='<svg><use href="#cup"/></svg>';
const bg=$('#bg'),nav=$('#nav');
bg.onclick=()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
nav.onclick=e=>{if(e.target.tagName==='A'){nav.classList.remove('open');bg.setAttribute('aria-expanded',false)}};
// banner
const BN=[["Es teh yang laris, usaha yang gampang dijalankan.","Gabung kemitraan Teh Jabrik: booth container siap jualan, 34 menu, dan pendampingan dari awal buka."],["Satu paket, semua sudah termasuk.","Booth, peralatan, bahan awal, dan pelatihan dalam satu paket kemitraan yang jelas."],["34 menu, dari teh klasik sampai kekinian.","Pelanggan punya banyak pilihan rasa, jadi mereka punya alasan untuk datang lagi."]];
const bn=$('#bn');
bn.innerHTML=BN.map((b,i)=>`<div class="bs${i?'':' on'}"><div class="bt"><h1>${b[0]}</h1><p>${b[1]}</p></div><picture><source media="(max-width:700px)" srcset="img/banner-${i+1}-m.jpg"><img src="img/banner-${i+1}.jpg" alt="Banner Teh Jabrik ${i+1}" onload="this.closest('.bs').querySelector('.bt').style.display='none'" onerror="var p=this.previousElementSibling;if(p){p.remove();this.src=this.getAttribute('src')}else this.remove()"></picture></div>`).join('')+'<div class="bc"><button id="bp" aria-label="Banner sebelumnya">‹</button><div class="dots" id="dots"></div><button id="bnx" aria-label="Banner berikutnya">›</button></div>';
const bs=$$('.bs'),dots=$('#dots');let cur=0,timer;
bs.forEach((_,i)=>{const d=document.createElement('button');d.className='dot';d.setAttribute('aria-label','Banner '+(i+1));d.onclick=()=>{go(i);auto()};dots.append(d)});
function go(i){cur=(i+bs.length)%bs.length;bs.forEach((s,j)=>s.classList.toggle('on',j===cur));$$('.dot').forEach((d,j)=>d.classList.toggle('on',j===cur))}
function auto(){clearInterval(timer);timer=setInterval(()=>go(cur+1),5500)}
$('#bp').onclick=()=>{go(cur-1);auto()};$('#bnx').onclick=()=>{go(cur+1);auto()};go(0);auto();
let bx=null;bn.addEventListener('pointerdown',e=>bx=e.clientX);bn.addEventListener('pointerup',e=>{if(bx!==null&&Math.abs(e.clientX-bx)>40){go(cur+(e.clientX<bx?1:-1));auto()}bx=null});
// marquee
const mw=["Kemitraan es teh","Booth container","34 menu","Siap jualan","Pelatihan dan SOP"];$('#mq').innerHTML=[...mw,...mw,...mw,...mw].map(t=>`<span>${t}</span>`).join('');
// menu
const menus=[
    "Lychee Tea","Jasmine Tea","Apple Tea","Lemon Tea","Mango Tea","Markisa Tea","Blackcurrant Tea","Strawberry Tea",
    "Americano","Butterscoth","Kopsu Gula Aren","Mocaccino","Capucino","Kopi Jabrik", "Chocolate",
    "Strawberry Squash","Mango Squash","Apple Squash","Blackcurrant Squash","Lychee Squash","Markisa Squash","Lemon Squash",
    "Apple Yakult","Mango Yakult","Lychee Yakult","Blackcurrant Yakult","Lemon Yakult","Strawberry Yakult","Markisa Yakult",
    "Taro","Bubble Gum","Matcha","Avocado Milk","Pink Lava", "Red Velvet"];
$('#menu').innerHTML=menus.map((m,i)=>`<li><div class="ph">${CUP}<img loading="lazy" src="img/menu/menu-${String(i+1).padStart(2,'0')}.svg" alt="${m}" onerror="this.remove()"></div><span>${m}</span></li>`).join('');
// tilt
function tilt(el,m){el.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`rotateY(${x*m}deg) rotateX(${-y*m}deg)`});el.addEventListener('pointerleave',()=>el.style.transform='')}
tilt($('#pkc'),5);$$('.ben').forEach(b=>tilt(b,9));
// booth coverflow
const cap=["Tampak depan","Tampak samping terbuka","Tampak samping tertutup"];
const cf=$('#cf');cf.innerHTML=cap.map((c,i)=>`<figure><div class="ph">${CUP}<img src="img/booth-${i+1}.jpg" alt="Booth Teh Jabrik ${c}" onerror="this.remove()"></div><figcaption>${c}</figcaption></figure>`).join('');
const fg=$$('#cf figure');let ci=0;
function cfr(){fg.forEach((f,i)=>{let o=i-ci;if(o>1)o-=fg.length;if(o<-1)o+=fg.length;f.style.transform=`translateX(calc(-50% + ${o*58}%)) translateZ(${o?-180:0}px) rotateY(${-o*38}deg) scale(${o?.86:1})`;f.style.opacity=o?.5:1;f.style.zIndex=o?1:3})}
function fit(){cf.style.height=(fg[0].offsetHeight+40)+'px'}fit();addEventListener('resize',fit);addEventListener('load',fit);cfr();$('#nx').onclick=()=>{ci=(ci+1)%fg.length;cfr()};$('#pv').onclick=()=>{ci=(ci-1+fg.length)%fg.length;cfr()};
let sx=null;cf.addEventListener('pointerdown',e=>sx=e.clientX);cf.addEventListener('pointerup',e=>{if(sx!==null&&Math.abs(e.clientX-sx)>40)(e.clientX<sx?$('#nx'):$('#pv')).click();sx=null});
// form -> WhatsApp
$('#f').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.target),n=(d.get('n')||'').trim(),w=(d.get('w')||'').trim();
if(!n||!w){$('#err').style.display='block';return}$('#err').style.display='none';
const t=`Halo admin Teh Jabrik, saya ingin tanya kemitraan.\n\nNama: ${n}\nWhatsApp: ${w}\nKota: ${(d.get('k')||'-').trim()}\nPesan: ${(d.get('m')||'-').trim()}`;
const a=document.createElement('a');a.href='https://wa.me/628983999111?text='+encodeURIComponent(t);a.target='_blank';a.rel='noopener';document.body.append(a);a.click();a.remove()});
