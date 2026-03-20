/* ═══════════════════════════════════════════════════
   BARNI & JUNI v3 – 30 EPISODEN · 3 STAFFELN
   ═══════════════════════════════════════════════════ */

const CALENDAR_YEAR  = 2026;
const CALENDAR_MONTH = 4;

/* ── 30 Themes ────────────────────────────────────── */
const THEMES = {
  /* Season 1 – Europa */
  wald:           { cssClass:'theme-wald',          icon:'🌲', particles:'firefly',  stripe:'#4caf50', season:1 },
  nuernberg:      { cssClass:'theme-nuernberg',      icon:'🏰', particles:'dust',     stripe:'#d4813a', season:1 },
  zug:            { cssClass:'theme-zug',            icon:'🌙', particles:'stars',    stripe:'#7b9fd4', season:1 },
  cluj:           { cssClass:'theme-cluj',           icon:'🦇', particles:'petals',   stripe:'#a070c8', season:1 },
  bukarest:       { cssClass:'theme-bukarest',       icon:'🌹', particles:'petals',   stripe:'#c07080', season:1 },
  budapest:       { cssClass:'theme-budapest',       icon:'♨️', particles:'steam',    stripe:'#3dada8', season:1 },
  stockholm:      { cssClass:'theme-stockholm',      icon:'❄️', particles:'snow',     stripe:'#90b8d8', season:1 },
  lissabon:       { cssClass:'theme-lissabon',       icon:'🌊', particles:'tiles',    stripe:'#e8943a', season:1 },
  camino:         { cssClass:'theme-camino',         icon:'🌾', particles:'dust',     stripe:'#d4a830', season:1 },
  azoren:         { cssClass:'theme-azoren',         icon:'🌋', particles:'mist',     stripe:'#2e9e88', season:1 },
  /* Season 2 – Die weite Welt */
  madeira:        { cssClass:'theme-madeira',        icon:'🌺', particles:'petals',   stripe:'#5aaa40', season:2 },
  bordeaux:       { cssClass:'theme-bordeaux',       icon:'🍷', particles:'dust',     stripe:'#b84060', season:2 },
  istanbul:       { cssClass:'theme-istanbul',       icon:'🕌', particles:'dust',     stripe:'#c89830', season:2 },
  aegypten:       { cssClass:'theme-aegypten',       icon:'🐪', particles:'dust',     stripe:'#d4903a', season:2 },
  schnorcheln:    { cssClass:'theme-schnorcheln',    icon:'🐠', particles:'bubbles',  stripe:'#1a9fce', season:2 },
  malediven:      { cssClass:'theme-malediven',      icon:'🚫', particles:'mist',     stripe:'#3098b8', season:2 },
  bahamas:        { cssClass:'theme-bahamas',        icon:'🐚', particles:'bubbles',  stripe:'#20b8a8', season:2 },
  korallenriff:   { cssClass:'theme-korallenriff',   icon:'🐙', particles:'bubbles',  stripe:'#0870b8', season:2 },
  atlantik:       { cssClass:'theme-atlantik',       icon:'⛵', particles:'stars',    stripe:'#5080b0', season:2 },
  s2finale:       { cssClass:'theme-s2finale',       icon:'🌅', particles:'stars',    stripe:'#8050c0', season:2 },
  /* Season 3 – Der Heimweg */
  westkueste:     { cssClass:'theme-westkueste',     icon:'🌅', particles:'dust',     stripe:'#e87030', season:3 },
  costarica:      { cssClass:'theme-costarica',      icon:'🦜', particles:'firefly',  stripe:'#38c840', season:3 },
  amazonas:       { cssClass:'theme-amazonas',       icon:'🐆', particles:'firefly',  stripe:'#289828', season:3 },
  galapagos:      { cssClass:'theme-galapagos',      icon:'🐢', particles:'bubbles',  stripe:'#209880', season:3 },
  chile:          { cssClass:'theme-chile',          icon:'🏔️', particles:'stars',    stripe:'#7858c0', season:3 },
  buenosaires:    { cssClass:'theme-buenosaires',    icon:'💃', particles:'petals',   stripe:'#c83050', season:3 },
  patagonien:     { cssClass:'theme-patagonien',     icon:'🦅', particles:'mist',     stripe:'#6898c0', season:3 },
  konfrontation:  { cssClass:'theme-konfrontation',  icon:'🌑', particles:'stars',    stripe:'#9050a0', season:3 },
  erwachen:       { cssClass:'theme-erwachen',       icon:'🌅', particles:'firefly',  stripe:'#b8c840', season:3 },
  heimweg:        { cssClass:'theme-heimweg',        icon:'🐾', particles:'firefly',  stripe:'#c89838', season:3 },
};

const SEASON_LABELS = {
  1: { label:'Staffel 1 · Europa – Der Weg beginnt',   color:'#4a8c5a' },
  2: { label:'Staffel 2 · Die weite Welt',              color:'#3a7ea8' },
  3: { label:'Staffel 3 · Amerika – Der Heimweg',       color:'#a84040' },
};

const AI_SYSTEM = `Du bist ein poetischer Reiseschreiber der für ein Paar (Niklas und seine Frau) 
persönliche Reiseerinnerungen schreibt. Dein Stil ist warm, persönlich, nostalgisch und leicht poetisch. 
Schreibe immer auf Deutsch. Nutze "wir" als Perspektive. Maximal 4-5 Sätze. Kein Reiseführer-Ton – 
echte Gefühle, echte Momente. Keine Aufzählungen.`;

/* ── Date helpers ─────────────────────────────────── */
const today      = new Date();
const todayDay   = today.getDate();
const todayMonth = today.getMonth() + 1;
const todayYear  = today.getFullYear();
const WEEKDAYS   = ['So','Mo','Di','Mi','Do','Fr','Sa'];

function isUnlocked(day) {
  if (todayYear  > CALENDAR_YEAR)  return true;
  if (todayYear  < CALENDAR_YEAR)  return false;
  if (todayMonth > CALENDAR_MONTH) return true;
  if (todayMonth < CALENDAR_MONTH) return false;
  return todayDay >= day;
}
function isToday(day) {
  return todayYear===CALENDAR_YEAR && todayMonth===CALENDAR_MONTH && todayDay===day;
}
function getWeekday(day) {
  return WEEKDAYS[new Date(CALENDAR_YEAR, CALENDAR_MONTH-1, day).getDay()];
}

/* ── Data ─────────────────────────────────────────── */
let calendarData = {};

async function loadData() {
  try {
    const res  = await fetch('data/april.json');
    const json = await res.json();
    json.days.forEach(d => { calendarData[d.day] = d; });
  } catch(e) { console.warn('april.json nicht gefunden:', e); }
}

/* ── Season visibility ────────────────────────────── */
// S2 sichtbar erst wenn Tag 10 freigeschaltet (S1 abgeschlossen)
// S3 sichtbar erst wenn Tag 20 freigeschaltet (S2 abgeschlossen)
function isSeasonVisible(season) {
  if (season === 1) return true;
  if (season === 2) return isUnlocked(10);
  if (season === 3) return isUnlocked(20);
  return false;
}

const SEASON_TEASERS = {
  2: { label:'Staffel 2 · Die weite Welt', hint:'Schließe Staffel 1 ab um weiterzureisen…', color:'#3a7ea8' },
  3: { label:'Staffel 3 · Der Heimweg',    hint:'Schließe Staffel 2 ab um den Heimweg zu beginnen…', color:'#a84040' },
};

/* ── Calendar ─────────────────────────────────────── */
function buildCalendar() {
  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';
  let lastSeason = 0;

  for (let day = 1; day <= 30; day++) {
    const data     = calendarData[day] || {};
    const theme    = THEMES[data.theme] || THEMES.wald;
    const season   = data.season || 1;
    const unlocked = isUnlocked(day);
    const itToday  = isToday(day);
    const weekday  = getWeekday(day);

    // If this season is not yet visible, show a teaser block once and stop
    if (!isSeasonVisible(season)) {
      if (season !== lastSeason && SEASON_TEASERS[season]) {
        const t = SEASON_TEASERS[season];
        const teaser = document.createElement('div');
        teaser.className = 'season-teaser';
        teaser.style.borderColor = t.color + '40';
        teaser.innerHTML = `
          <div class="season-teaser-lock">🔒</div>
          <div class="season-teaser-title" style="color:${t.color}">${t.label}</div>
          <div class="season-teaser-hint">${t.hint}</div>
        `;
        grid.appendChild(teaser);
        lastSeason = season;
      }
      continue; // skip individual day cards for hidden seasons
    }

    // Season divider for visible seasons
    if (season !== lastSeason && SEASON_LABELS[season]) {
      const div = document.createElement('div');
      div.className = 'season-divider';
      const s = SEASON_LABELS[season];
      div.innerHTML = `
        <div class="season-divider-line" style="background:${s.color}"></div>
        <div class="season-divider-text" style="color:${s.color};border:1px solid ${s.color}20;background:${s.color}10">${s.label}</div>
        <div class="season-divider-line" style="background:${s.color}"></div>
      `;
      grid.appendChild(div);
      lastSeason = season;
    }

    const card = document.createElement('div');
    card.className = 'day-card ' + (unlocked ? 'unlocked' : 'locked') + ` s${season}-card`;
    if (itToday) card.classList.add('today');
    card.style.animationDelay = `${day * 0.04}s`;

    if (unlocked) {
      const thumb = data.thumbnail
        ? `<img class="card-thumbnail" src="${data.thumbnail}" alt="${data.location||''}" loading="lazy">`
        : '';
      card.innerHTML = `
        ${itToday ? '<div class="today-badge">Heute</div>' : ''}
        <div class="card-theme-stripe" style="background:${theme.stripe}"></div>
        <div class="card-inner">
          <div>
            <div class="card-day-number">${day}</div>
            <div class="card-day-sub">${weekday} · April</div>
          </div>
          ${thumb}
          ${data.location ? `<div class="card-location">${data.location}</div>` : ''}
        </div>
      `;
      card.addEventListener('click', () => openModal(day));
    } else {
      card.innerHTML = `
        <div class="card-inner">
          <div class="lock-icon">🔒</div>
          <div class="locked-day-number">${day}</div>
        </div>
      `;
    }
    grid.appendChild(card);
  }
}

/* ── Particles ────────────────────────────────────── */
function clearParticles() {
  document.getElementById('modalParticles').innerHTML = '';
}

function spawnParticles(type, accent) {
  const container = document.getElementById('modalParticles');
  clearParticles();
  const configs = {
    firefly: { n:18, size:[3,6],   colors:['#c8ff80','#a0e860','#80c840'],               dur:[8,16],  drift:[-30,30]  },
    dust:    { n:25, size:[1,3],   colors:['#e0c080','#c0a060','#a08040'],               dur:[12,20], drift:[-20,50]  },
    stars:   { n:30, size:[1,2],   colors:['#c0d8ff','#e0ecff','#ffffff'],               dur:[6,12],  drift:[-10,10]  },
    petals:  { n:15, size:[4,8],   colors:[accent,'#ffc0d0','#ffaacc'],                  dur:[10,18], drift:[-60,60]  },
    steam:   { n:12, size:[8,18],  colors:['rgba(200,240,240,.3)','rgba(150,220,220,.2)'],dur:[8,14],  drift:[-40,40]  },
    snow:    { n:35, size:[2,4],   colors:['#e8f4ff','#fff','#d0e8ff'],                  dur:[7,14],  drift:[-25,25]  },
    tiles:   { n:20, size:[2,4],   colors:['#4080c0','#6098d0','#80b0e0'],               dur:[10,16], drift:[-30,30]  },
    mist:    { n:8,  size:[20,50], colors:['rgba(80,200,180,.15)','rgba(60,160,140,.12)'],dur:[14,22], drift:[-20,20]  },
    bubbles: { n:22, size:[3,8],   colors:['rgba(80,200,255,.5)','rgba(60,180,240,.4)'], dur:[5,10],  drift:[-15,15]  },
  };
  const cfg = configs[type] || configs.dust;
  for (let i = 0; i < cfg.n; i++) {
    const el  = document.createElement('div');
    el.className = 'particle';
    const sz  = cfg.size[0]   + Math.random() * (cfg.size[1]-cfg.size[0]);
    const col = cfg.colors[Math.floor(Math.random()*cfg.colors.length)];
    const dur = cfg.dur[0]    + Math.random() * (cfg.dur[1]-cfg.dur[0]);
    const del = Math.random() * dur;
    const dr  = cfg.drift[0]  + Math.random() * (cfg.drift[1]-cfg.drift[0]);
    el.style.cssText = `
      width:${sz}px;height:${sz}px;background:${col};left:${Math.random()*100}%;
      --drift:${dr}px;animation-duration:${dur}s;animation-delay:-${del}s;
      border-radius:${type==='tiles'?'2px':'50%'};
      filter:${type==='firefly'?`blur(.5px) drop-shadow(0 0 3px ${col})`:'blur(.5px)'};
    `;
    container.appendChild(el);
  }
}

/* ── Modal ────────────────────────────────────────── */
const overlay      = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose   = document.getElementById('modalClose');
let   currentData  = {};
let   currentPhotos= [];

function openModal(day) {
  const data   = calendarData[day] || {};
  const theme  = THEMES[data.theme] || THEMES.wald;
  const season = data.season || 1;
  currentData  = data;

  // Apply theme
  modalContent.className = 'modal-content ' + theme.cssClass;

  // Header
  const sLabel = SEASON_LABELS[season];
  document.getElementById('modalSeasonBadge').textContent = sLabel ? sLabel.label : '';
  document.getElementById('modalSeasonBadge').style.color = sLabel ? sLabel.color : '';
  document.getElementById('modalEpisode').textContent  = data.subtitle || '';
  document.getElementById('modalLocation').textContent = data.location || `Tag ${day}`;
  document.getElementById('dividerIcon').textContent   = theme.icon;

  // Video
  const videoSection = document.getElementById('videoSection');
  const videoEl      = document.getElementById('modalVideo');
  const videoSrc     = document.getElementById('modalVideoSrc');
  if (data.video) {
    videoSrc.src = data.video; videoEl.load(); videoSection.style.display = '';
  } else {
    videoSection.style.display = 'none';
  }

  // Photos
  currentPhotos = data.photos || [];
  const photosGrid    = document.getElementById('photosGrid');
  const photosSection = document.getElementById('photosSection');
  photosGrid.innerHTML = '';
  if (currentPhotos.length) {
    photosSection.style.display = '';
    currentPhotos.forEach((src, i) => {
      const item = document.createElement('div');
      item.className = 'photo-item';
      item.innerHTML = `<img src="${src}" alt="Foto ${i+1}" loading="lazy">`;
      item.addEventListener('click', () => openLightbox(i));
      photosGrid.appendChild(item);
    });
  } else {
    photosSection.style.display = 'none';
  }

  // Text
  const textSection = document.getElementById('textSection');
  const memoryText  = document.getElementById('memoryText');
  if (data.text) { memoryText.textContent = data.text; textSection.style.display=''; }
  else           { textSection.style.display='none'; }

  // AI reset
  document.getElementById('aiResult').textContent = '';
  document.getElementById('aiResult').className   = 'ai-result';
  document.getElementById('aiBtn').disabled       = false;
  document.getElementById('aiBtn').textContent    = '✨ Erinnerung generieren';

  // Particles + open
  spawnParticles(theme.particles, theme.stripe);
  overlay.setAttribute('aria-hidden','false');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalContent.scrollTop = 0;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    overlay.classList.add('curtains-open');
    if (data.video) setTimeout(() => videoEl.play().catch(()=>{}), 950);
  }));
}

function closeModal() {
  overlay.classList.remove('curtains-open');
  document.getElementById('modalVideo').pause();
  setTimeout(() => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    document.getElementById('modalVideoSrc').src = '';
    clearParticles();
  }, 900);
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target===overlay) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key==='Escape') {
    if (document.getElementById('lightbox').classList.contains('active')) closeLightbox();
    else closeModal();
  }
});

/* ── AI Generation ────────────────────────────────── */
document.getElementById('aiBtn').addEventListener('click', async () => {
  const btn    = document.getElementById('aiBtn');
  const result = document.getElementById('aiResult');
  if (!currentData.ai_context) {
    result.textContent = 'Kein Kontext hinterlegt.';
    result.className   = 'ai-result error';
    return;
  }
  btn.disabled      = true;
  btn.textContent   = '✨ Schreibe...';
  result.textContent= '';
  result.className  = 'ai-result loading';

  const userPrompt = `Schreibe eine persönliche Reiseerinnerung für uns:\n\n${currentData.ai_context}\n\nOrt: ${currentData.location}`;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:350,
        system: AI_SYSTEM,
        messages:[{ role:'user', content:userPrompt }]
      })
    });
    const data = await response.json();
    if (data.content?.[0]?.text) {
      const generated = data.content[0].text;
      result.textContent = generated;
      result.className   = 'ai-result';
      // Populate text section too
      const memoryText  = document.getElementById('memoryText');
      const textSection = document.getElementById('textSection');
      memoryText.textContent   = generated;
      textSection.style.display= '';
    } else {
      throw new Error(data.error?.message || 'Unbekannter Fehler');
    }
  } catch(err) {
    result.textContent = `Fehler: ${err.message}`;
    result.className   = 'ai-result error';
  }
  btn.disabled    = false;
  btn.textContent = '✨ Neue Erinnerung';
});

/* ── Lightbox ─────────────────────────────────────── */
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let lightboxIndex = 0;

function openLightbox(i) {
  lightboxIndex = i;
  lightboxImg.src = currentPhotos[i];
  lightbox.setAttribute('aria-hidden','false');
  lightbox.classList.add('active');
}
function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden','true');
}
function lightboxStep(dir) {
  lightboxIndex = (lightboxIndex + dir + currentPhotos.length) % currentPhotos.length;
  lightboxImg.src = currentPhotos[lightboxIndex];
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click',  () => lightboxStep(-1));
document.getElementById('lightboxNext').addEventListener('click',  () => lightboxStep(+1));
lightbox.addEventListener('click', e => { if (e.target===lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key==='ArrowLeft')  lightboxStep(-1);
  if (e.key==='ArrowRight') lightboxStep(+1);
});
let touchStartX = null;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend',   e => {
  if (touchStartX===null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) lightboxStep(dx < 0 ? 1 : -1);
  touchStartX = null;
});

/* ── Init ─────────────────────────────────────────── */
(async () => {
  await loadData();
  buildCalendar();
})();
