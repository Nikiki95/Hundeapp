/* ═══════════════════════════════════════════════════
   APRIL CALENDAR – Pilot + April doors
   ═══════════════════════════════════════════════════ */

const CALENDAR_YEAR  = 2026;
const CALENDAR_MONTH = 4;

const THEMES = {
  pilot:          { cssClass:'theme-pilot',         icon:'🚪', particles:'stars',    stripe:'#d6a64a', season:0 },
  wald:           { cssClass:'theme-wald',          icon:'🌲', particles:'firefly',  stripe:'#4caf50', season:1 },
  nuernberg:      { cssClass:'theme-nuernberg',     icon:'🏰', particles:'dust',     stripe:'#d4813a', season:1 },
  zug:            { cssClass:'theme-zug',           icon:'🌙', particles:'stars',    stripe:'#7b9fd4', season:1 },
  cluj:           { cssClass:'theme-cluj',          icon:'🦇', particles:'petals',   stripe:'#a070c8', season:1 },
  bukarest:       { cssClass:'theme-bukarest',      icon:'🌹', particles:'petals',   stripe:'#c07080', season:1 },
  budapest:       { cssClass:'theme-budapest',      icon:'♨️', particles:'steam',    stripe:'#3dada8', season:1 },
  stockholm:      { cssClass:'theme-stockholm',     icon:'❄️', particles:'snow',     stripe:'#90b8d8', season:1 },
  lissabon:       { cssClass:'theme-lissabon',      icon:'🌊', particles:'tiles',    stripe:'#e8943a', season:1 },
  camino:         { cssClass:'theme-camino',        icon:'🌾', particles:'dust',     stripe:'#d4a830', season:1 },
  azoren:         { cssClass:'theme-azoren',        icon:'🌋', particles:'mist',     stripe:'#2e9e88', season:1 },

  madeira:        { cssClass:'theme-madeira',       icon:'🌺', particles:'petals',   stripe:'#5aaa40', season:2 },
  bordeaux:       { cssClass:'theme-bordeaux',      icon:'🍷', particles:'dust',     stripe:'#b84060', season:2 },
  istanbul:       { cssClass:'theme-istanbul',      icon:'🕌', particles:'dust',     stripe:'#c89830', season:2 },
  aegypten:       { cssClass:'theme-aegypten',      icon:'🐪', particles:'dust',     stripe:'#d4903a', season:2 },
  schnorcheln:    { cssClass:'theme-schnorcheln',   icon:'🐠', particles:'bubbles',  stripe:'#1a9fce', season:2 },
  malediven:      { cssClass:'theme-malediven',     icon:'🚫', particles:'mist',     stripe:'#3098b8', season:2 },
  bahamas:        { cssClass:'theme-bahamas',       icon:'🐚', particles:'bubbles',  stripe:'#20b8a8', season:2 },
  korallenriff:   { cssClass:'theme-korallenriff',  icon:'🐙', particles:'bubbles',  stripe:'#0870b8', season:2 },
  atlantik:       { cssClass:'theme-atlantik',      icon:'⛵', particles:'stars',    stripe:'#5080b0', season:2 },
  s2finale:       { cssClass:'theme-s2finale',      icon:'🌅', particles:'stars',    stripe:'#8050c0', season:2 },

  westkueste:     { cssClass:'theme-westkueste',    icon:'🌅', particles:'dust',     stripe:'#e87030', season:3 },
  costarica:      { cssClass:'theme-costarica',     icon:'🦜', particles:'firefly',  stripe:'#38c840', season:3 },
  amazonas:       { cssClass:'theme-amazonas',      icon:'🐆', particles:'firefly',  stripe:'#289828', season:3 },
  galapagos:      { cssClass:'theme-galapagos',     icon:'🐢', particles:'bubbles',  stripe:'#209880', season:3 },
  chile:          { cssClass:'theme-chile',         icon:'🏔️', particles:'stars',    stripe:'#7858c0', season:3 },
  buenosaires:    { cssClass:'theme-buenosaires',   icon:'💃', particles:'petals',   stripe:'#c83050', season:3 },
  patagonien:     { cssClass:'theme-patagonien',    icon:'🦅', particles:'mist',     stripe:'#6898c0', season:3 },
  konfrontation:  { cssClass:'theme-konfrontation', icon:'🌑', particles:'stars',    stripe:'#9050a0', season:3 },
  erwachen:       { cssClass:'theme-erwachen',      icon:'🌅', particles:'firefly',  stripe:'#b8c840', season:3 },
  heimweg:        { cssClass:'theme-heimweg',       icon:'🐾', particles:'firefly',  stripe:'#c89838', season:3 },
};

const SEASON_LABELS = {
  0: { label:'', color:'#d6a64a' },
  1: { label:'', color:'#4a8c5a' },
  2: { label:'', color:'#3a7ea8' },
  3: { label:'', color:'#a84040' },
};


const today      = new Date();
const todayDay   = today.getDate();
const todayMonth = today.getMonth() + 1;
const todayYear  = today.getFullYear();
const WEEKDAYS   = ['So','Mo','Di','Mi','Do','Fr','Sa'];

let calendarEntries = [];
let calendarMap     = {};
let currentEntry    = null;
let currentPhotos   = [];
let photosPendingReveal = false;

function compareDate(month, day) {
  if (todayYear > CALENDAR_YEAR) return 1;
  if (todayYear < CALENDAR_YEAR) return -1;
  if (todayMonth > month) return 1;
  if (todayMonth < month) return -1;
  if (todayDay > day) return 1;
  if (todayDay < day) return -1;
  return 0;
}

function isUnlocked(entry) {
  // Testmodus: Das Pilot-Türchen ist bereits ab dem 30. März sichtbar,
  // damit du den Ablauf einen Tag vorher prüfen kannst.
  if (entry.key === 'pilot' && compareDate(3, 30) >= 0) return true;
  return compareDate(entry.unlockMonth, entry.unlockDay) >= 0;
}

function isToday(entry) {
  return todayYear === CALENDAR_YEAR &&
         todayMonth === entry.unlockMonth &&
         todayDay === entry.unlockDay;
}

function getWeekday(entry) {
  return WEEKDAYS[new Date(CALENDAR_YEAR, entry.unlockMonth - 1, entry.unlockDay).getDay()];
}

function normalizeEntry(raw) {
  const isPilot     = raw.key === 'pilot';
  const numericDay  = Number.isInteger(raw.day) ? raw.day : null;
  const key         = raw.key || (isPilot ? 'pilot' : String(numericDay));
  const assetFolder = raw.assetFolder || (isPilot ? 'assets/pilot' : `assets/day-${String(numericDay).padStart(2, '0')}`);
  const unlockMonth = raw.unlock_month || (isPilot ? 3 : CALENDAR_MONTH);
  const unlockDay   = raw.unlock_day || (isPilot ? 31 : numericDay);

  return {
    ...raw,
    key,
    assetFolder,
    unlockMonth,
    unlockDay,
    cardLabel: raw.cardLabel || (isPilot ? 'Pilot' : String(numericDay)),
    cardSubLabel: raw.cardSubLabel || (isPilot ? '31 · März' : `${getWeekday({ unlockMonth, unlockDay })} · April`),
  };
}

async function loadData() {
  try {
    const res  = await fetch('data/april.json');
    const json = await res.json();
    const entries = [];
    if (json.pilot) entries.push(normalizeEntry(json.pilot));
    (json.days || []).forEach(d => entries.push(normalizeEntry(d)));
    calendarEntries = entries;
    calendarMap = Object.fromEntries(entries.map(entry => [entry.key, entry]));
  } catch(e) {
    console.warn('april.json nicht gefunden:', e);
  }
}

async function assetExists(path) {
  try {
    const response = await fetch(path, { method:'HEAD', cache:'no-store' });
    return response.ok;
  } catch {
    return false;
  }
}

async function detectVideo(assetFolder) {
  const candidates = ['video.mp4', 'video.webm', 'video.mov'];
  for (const file of candidates) {
    const path = `${assetFolder}/${file}`;
    if (await assetExists(path)) return path;
  }
  return '';
}

async function detectThumbnail(assetFolder) {
  const candidates = ['thumb.jpg', 'thumb.jpeg', 'thumb.png', 'thumb.webp'];
  for (const file of candidates) {
    const path = `${assetFolder}/${file}`;
    if (await assetExists(path)) return path;
  }
  return '';
}

async function detectPhotos(assetFolder) {
  const photos = [];
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  for (let i = 1; i <= 40; i++) {
    let found = '';
    for (const ext of exts) {
      const path = `${assetFolder}/photos/${i}.${ext}`;
      if (await assetExists(path)) {
        found = path;
        break;
      }
    }
    if (found) photos.push(found);
  }
  return photos;
}

async function enrichEntry(entry) {
  if (!entry) return entry;

  const hasManualThumbnail = Boolean(entry.thumbnail);
  const hasManualVideo     = Boolean(entry.video);
  const hasManualPhotos    = Array.isArray(entry.photos) && entry.photos.length > 0;

  if (!hasManualThumbnail) entry.thumbnail = await detectThumbnail(entry.assetFolder);
  if (!hasManualVideo)     entry.video     = await detectVideo(entry.assetFolder);
  if (!hasManualPhotos)    entry.photos    = await detectPhotos(entry.assetFolder);

  return entry;
}

function buildCalendar() {
  const grid = document.getElementById('calendarGrid');
  grid.innerHTML = '';
  let lastSeason = null;

  calendarEntries.forEach(entry => {
    const season   = entry.season ?? 1;
    const theme    = THEMES[entry.theme] || THEMES.wald;
    const unlocked = isUnlocked(entry);
    const itToday  = isToday(entry);

    if (season !== lastSeason && SEASON_LABELS[season]) {
      const s = SEASON_LABELS[season];
      if (s.label) {
        const div = document.createElement('div');
        div.className = 'season-divider';
        div.innerHTML = `
          <div class="season-divider-line" style="background:${s.color}"></div>
          <div class="season-divider-text" style="color:${s.color};border:1px solid ${s.color}20;background:${s.color}10">${s.label}</div>
          <div class="season-divider-line" style="background:${s.color}"></div>
        `;
        grid.appendChild(div);
      }
      lastSeason = season;
    }

    const card = document.createElement('div');
    card.className = 'day-card ' + (unlocked ? 'unlocked' : 'locked') + ` s${season}-card`;
    if (entry.key === 'pilot') card.classList.add('pilot-card');
    if (itToday) card.classList.add('today');
    card.style.animationDelay = `${grid.children.length * 0.04}s`;

    if (unlocked) {
      const thumb = entry.thumbnail
        ? `<img class="card-thumbnail" src="${entry.thumbnail}" alt="${entry.location || ''}" loading="lazy">`
        : '';
      const isLabel = entry.key === 'pilot' ? ' is-label' : '';
      card.innerHTML = `
        ${itToday ? '<div class="today-badge">Heute</div>' : ''}
        <div class="card-theme-stripe" style="background:${theme.stripe}"></div>
        <div class="card-inner">
          <div>
            <div class="card-day-number${isLabel}">${entry.cardLabel}</div>
            <div class="card-day-sub">${entry.cardSubLabel}</div>
          </div>
          ${thumb}
          ${entry.location ? `<div class="card-location">${entry.location}</div>` : ''}
        </div>
      `;
      card.addEventListener('click', () => openModal(entry.key));
    } else {
      const lockedLabel = entry.key === 'pilot' ? 'Pilot' : entry.cardLabel;
      const labelClass  = entry.key === 'pilot' ? ' locked-label' : '';
      card.innerHTML = `
        <div class="card-inner">
          <div class="lock-icon">🔒</div>
          <div class="locked-day-number${labelClass}">${lockedLabel}</div>
        </div>
      `;
    }

    grid.appendChild(card);
  });
}

function clearParticles() {
  document.getElementById('modalParticles').innerHTML = '';
}

function spawnParticles(type, accent) {
  const container = document.getElementById('modalParticles');
  clearParticles();
  const configs = {
    firefly: { n:18, size:[3,6],    colors:['#c8ff80','#a0e860','#80c840'],                 dur:[8,16],  drift:[-30,30]  },
    dust:    { n:25, size:[1,3],    colors:['#e0c080','#c0a060','#a08040'],                 dur:[12,20], drift:[-20,50]  },
    stars:   { n:30, size:[1,2],    colors:['#c0d8ff','#e0ecff','#ffffff'],                 dur:[6,12],  drift:[-10,10]  },
    petals:  { n:15, size:[4,8],    colors:[accent,'#ffc0d0','#ffaacc'],                    dur:[10,18], drift:[-60,60]  },
    steam:   { n:12, size:[8,18],   colors:['rgba(200,240,240,.3)','rgba(150,220,220,.2)'], dur:[8,14],  drift:[-40,40]  },
    snow:    { n:35, size:[2,4],    colors:['#e8f4ff','#fff','#d0e8ff'],                    dur:[7,14],  drift:[-25,25]  },
    tiles:   { n:20, size:[2,4],    colors:['#4080c0','#6098d0','#80b0e0'],                 dur:[10,16], drift:[-30,30]  },
    mist:    { n:8,  size:[20,50],  colors:['rgba(80,200,180,.15)','rgba(60,160,140,.12)'], dur:[14,22], drift:[-20,20]  },
    bubbles: { n:22, size:[3,8],    colors:['rgba(80,200,255,.5)','rgba(60,180,240,.4)'],   dur:[5,10],  drift:[-15,15]  },
  };
  const cfg = configs[type] || configs.dust;
  for (let i = 0; i < cfg.n; i++) {
    const el  = document.createElement('div');
    el.className = 'particle';
    const sz  = cfg.size[0] + Math.random() * (cfg.size[1] - cfg.size[0]);
    const col = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
    const dur = cfg.dur[0]  + Math.random() * (cfg.dur[1] - cfg.dur[0]);
    const del = Math.random() * dur;
    const dr  = cfg.drift[0] + Math.random() * (cfg.drift[1] - cfg.drift[0]);
    el.style.cssText = `
      width:${sz}px;height:${sz}px;background:${col};left:${Math.random() * 100}%;
      --drift:${dr}px;animation-duration:${dur}s;animation-delay:-${del}s;
      border-radius:${type === 'tiles' ? '2px' : '50%'};
      filter:${type === 'firefly' ? `blur(.5px) drop-shadow(0 0 3px ${col})` : 'blur(.5px)'};
    `;
    container.appendChild(el);
  }
}

const overlay      = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');
const modalClose   = document.getElementById('modalClose');

function revealAfterVideo() {
  if (!photosPendingReveal) return;

  const photosSection = document.getElementById('photosSection');
  const textSection   = document.getElementById('textSection');
  const upliftSection = document.getElementById('upliftSection');

  photosPendingReveal = false;
  photosSection.style.display = currentPhotos.length ? '' : 'none';

  const target = currentPhotos.length
    ? photosSection
    : (textSection.style.display !== 'none' ? textSection : (upliftSection.style.display !== 'none' ? upliftSection : null));

  if (target) {
    target.scrollIntoView({ behavior:'smooth', block:'start' });
  }
}

async function openModal(key) {
  const entry  = await enrichEntry(calendarMap[key]);
  const theme  = THEMES[entry.theme] || THEMES.wald;
  const season = entry.season ?? 1;
  currentEntry = entry;
  currentPhotos = entry.photos || [];

  modalContent.className = 'modal-content ' + theme.cssClass;

  const sLabel = SEASON_LABELS[season];
  const seasonBadge = document.getElementById('modalSeasonBadge');
  seasonBadge.textContent = sLabel ? sLabel.label : '';
  seasonBadge.style.color = sLabel ? sLabel.color : '';
  seasonBadge.style.display = sLabel && sLabel.label ? '' : 'none';
  document.getElementById('modalEpisode').textContent  = entry.subtitle || '';
  document.getElementById('modalLocation').textContent = entry.location || '';
  document.getElementById('dividerIcon').textContent   = theme.icon;

  const videoSection = document.getElementById('videoSection');
  const videoEl      = document.getElementById('modalVideo');
  const videoSrc     = document.getElementById('modalVideoSrc');
  const videoHint    = document.getElementById('videoHint');

  videoEl.onended = () => revealAfterVideo();

  if (entry.video) {
    videoSrc.src = entry.video;
    videoEl.load();
    videoSection.style.display = '';
    videoHint.textContent = currentPhotos.length
      ? '▼ Nach dem Clip öffnen sich die Fotos automatisch'
      : '▼ Danach geht es weiter';
  } else {
    videoSection.style.display = 'none';
  }

  const photosGrid    = document.getElementById('photosGrid');
  const photosSection = document.getElementById('photosSection');
  photosGrid.innerHTML = '';

  if (currentPhotos.length) {
    currentPhotos.forEach((src, i) => {
      const item = document.createElement('div');
      item.className = 'photo-item';
      item.innerHTML = `<img src="${src}" alt="Foto ${i + 1}" loading="lazy">`;
      item.addEventListener('click', () => openLightbox(i));
      photosGrid.appendChild(item);
    });
  }

  photosPendingReveal = Boolean(entry.video && currentPhotos.length);
  if (photosPendingReveal) {
    photosSection.style.display = 'none';
  } else {
    photosSection.style.display = currentPhotos.length ? '' : 'none';
  }

  const textSection = document.getElementById('textSection');
  const memoryText  = document.getElementById('memoryText');
  if (entry.text) {
    memoryText.textContent = entry.text;
    textSection.style.display = '';
  } else {
    textSection.style.display = 'none';
  }

  const upliftSection = document.getElementById('upliftSection');
  const upliftText    = document.getElementById('upliftText');
  if (entry.uplift) {
    upliftText.textContent = entry.uplift;
    upliftSection.style.display = '';
  } else {
    upliftSection.style.display = 'none';
  }

  spawnParticles(theme.particles, theme.stripe);
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalContent.scrollTop = 0;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    overlay.classList.add('curtains-open');
    if (entry.video) setTimeout(() => videoEl.play().catch(() => {}), 950);
  }));
}

function closeModal() {
  overlay.classList.remove('curtains-open');
  document.getElementById('modalVideo').pause();
  photosPendingReveal = false;
  setTimeout(() => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.getElementById('modalVideoSrc').src = '';
    clearParticles();
  }, 900);
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('lightbox').classList.contains('active')) closeLightbox();
    else closeModal();
  }
});


const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let lightboxIndex = 0;

function openLightbox(i) {
  lightboxIndex = i;
  lightboxImg.src = currentPhotos[i];
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.classList.add('active');
}
function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
}
function lightboxStep(dir) {
  lightboxIndex = (lightboxIndex + dir + currentPhotos.length) % currentPhotos.length;
  lightboxImg.src = currentPhotos[lightboxIndex];
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click',  () => lightboxStep(-1));
document.getElementById('lightboxNext').addEventListener('click',  () => lightboxStep(+1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowLeft')  lightboxStep(-1);
  if (e.key === 'ArrowRight') lightboxStep(+1);
});
let touchStartX = null;
lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend',   e => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) lightboxStep(dx < 0 ? 1 : -1);
  touchStartX = null;
});

(async () => {
  await loadData();
  for (const entry of calendarEntries) {
    if (!entry.thumbnail) {
      entry.thumbnail = await detectThumbnail(entry.assetFolder);
    }
  }
  buildCalendar();
})();
