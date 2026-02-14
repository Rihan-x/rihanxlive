/* ================= FIREBASE CONFIG ================= */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ================= LOAD SITE CONTENT ================= */
db.collection('siteContent').doc('main').get().then(doc=>{
  const data = doc.data();
  if(!data) return;
  document.getElementById('player-name').innerText = data.playerName;
  document.getElementById('player-tagline').innerText = data.tagline;
  document.getElementById('ign').innerText = data.ign;
  document.getElementById('uid').innerText = data.uid;
  document.getElementById('server').innerText = data.server;
  document.getElementById('live-time').innerText = data.liveTime;
  document.getElementById('business-email').innerText = data.businessEmail;
  document.getElementById('business-email').href = `mailto:${data.businessEmail}`;

  // Social Links
  const socialContainer = document.getElementById('social-links');
  socialContainer.innerHTML='';
  data.socialLinks.forEach(s=>{
    const a = document.createElement('a');
    a.href = s.url; a.target="_blank"; a.className="btn"; a.innerText=s.name;
    socialContainer.appendChild(a);
  });

  // Reviews
  const reviewsContainer = document.getElementById('reviews-list');
  reviewsContainer.innerHTML='';
  data.reviews.forEach(r=>{
    const p = document.createElement('p');
    p.innerHTML=`<strong>${r.name}</strong> ⭐${r.stars} – "${r.comment}"`;
    reviewsContainer.appendChild(p);
  });
});

/* ================= TOURNAMENT FORM ================= */
document.getElementById('tournamentForm').addEventListener('submit', e=>{
  e.preventDefault();
  db.collection('tournament').add({
    name: document.getElementById('name').value,
    ign: document.getElementById('tign').value,
    uid: document.getElementById('tuid').value,
    email: document.getElementById('temail').value,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(()=>{
    alert('Registration submitted!');
    e.target.reset();
  });
});

/* ================= SCROLL ANIMATION ================= */
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", ()=>{
  sections.forEach(sec=>{
    const top = window.scrollY;
    const offset = sec.offsetTop - 400;
    if(top > offset) sec.classList.add("show");
  });
});
/* ================= FIRE & EMBERS ================= */
const canvas = document.getElementById("fire");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const embersCanvas = document.getElementById("embers");
const ectx = embersCanvas.getContext("2d");
embersCanvas.width = window.innerWidth;
embersCanvas.height = window.innerHeight;

// Particle তৈরি
function createParticles(count, isEmber=false){
  let arr=[];
  for(let i=0;i<count;i++){
    arr.push({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      size: Math.random()*5+1,
      speedY: Math.random()*2+1,
      speedX: (Math.random()-0.5)*0.5,
      alpha: Math.random()*0.5+0.3,
      isEmber
    });
  }
  return arr;
}

let particles = createParticles(120);
let embers = createParticles(60, true);

function drawParticles(arr, ctx){
  arr.forEach(p=>{
    if(p.isEmber){
      ctx.fillStyle = `rgba(255,${Math.floor(Math.random()*100)},0,${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fill();
      p.y -= p.speedY;
      if(p.y<0) p.y = window.innerHeight;
    } else {
      const gradient = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size);
      gradient.addColorStop(0,"rgba(255,255,255,0.8)");
      gradient.addColorStop(0.3,"rgba(255,69,0,0.7)");
      gradient.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
      ctx.fill();
      p.y -= p.speedY;
      p.x += p.speedX;
      if(p.y<0) p.y = window.innerHeight;
      if(p.x<0) p.x = window.innerWidth;
      if(p.x>window.innerWidth) p.x = 0;
    }
  });
}

function animateFire(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ectx.clearRect(0,0,canvas.width,canvas.height);
  drawParticles(particles, ctx);
  drawParticles(embers, ectx);
  requestAnimationFrame(animateFire);
}
animateFire();

// Window resize হলে canvas adjust হবে
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  embersCanvas.width = window.innerWidth;
  embersCanvas.height = window.innerHeight;
});

/* ================= OPTIONAL FIRE ANIMATIONS ================= */
// (You can copy your canvas fire/loader code here from your previous HTML)
