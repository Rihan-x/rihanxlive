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

/* ================= OPTIONAL FIRE ANIMATIONS ================= */
// (You can copy your canvas fire/loader code here from your previous HTML)
