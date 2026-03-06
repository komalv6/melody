/* ═══════════════════════════════════════════
   MELODY — Shared State & Utilities
═══════════════════════════════════════════ */

const TRACKS = [
  { title:"Cherry Blossom Waltz",  artist:"Dreamy Keys",     genre:"Lo-fi",    emoji:"🌸", color:"#FFE4F0", dur:204, durStr:"3:24", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title:"Bubble Pop Fantasy",    artist:"Starlight Studio", genre:"Pop",      emoji:"🫧", color:"#E4F0FF", dur:178, durStr:"2:58", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title:"Lavender Dreams",       artist:"Moonpetal",        genre:"Ambient",  emoji:"🌙", color:"#EDE4FF", dur:252, durStr:"4:12", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title:"Sunshine Parade",       artist:"Happy Tunes Co.", genre:"Indie",    emoji:"☀️", color:"#FFF9D0", dur:187, durStr:"3:07", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title:"Mint Chocolate Beats",  artist:"Studio Pastel",   genre:"Chillhop", emoji:"🍃", color:"#D8F5EC", dur:225, durStr:"3:45", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title:"Strawberry Fizz",       artist:"Bubblegum Vibes", genre:"Dance",    emoji:"🍓", color:"#FFE0E0", dur:165, durStr:"2:45", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title:"Cotton Candy Sky",      artist:"Pastel Cloud",    genre:"Dream-pop",emoji:"🌈", color:"#FFF0E8", dur:213, durStr:"3:33", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title:"Peach Blossom Jazz",    artist:"Velvet Keys",     genre:"Jazz",     emoji:"🍑", color:"#FFE8D0", dur:241, durStr:"4:01", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title:"Starlight Serenade",    artist:"Luna Rose",       genre:"Indie-pop",emoji:"⭐", color:"#F0F0FF", dur:198, durStr:"3:18", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title:"Raindrop Café",         artist:"Cozy Sounds",     genre:"Lo-fi",    emoji:"☔", color:"#E8F4FF", dur:234, durStr:"3:54", src:"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3"},
];

const QUIZ_QUESTIONS = [
  { q:"Which emoji represents Lo-fi vibes?",         opts:["🎸","🌸","🏆","🎹"], ans:1, song:0 },
  { q:"Who made 'Bubble Pop Fantasy'?",              opts:["Moonpetal","Pastel Cloud","Starlight Studio","Velvet Keys"], ans:2, song:1 },
  { q:"What genre is 'Lavender Dreams'?",            opts:["Jazz","Dance","Ambient","Pop"], ans:2, song:2 },
  { q:"Which song is by 'Happy Tunes Co.'?",         opts:["Sunshine Parade","Strawberry Fizz","Raindrop Café","Starlight Serenade"], ans:0, song:3 },
  { q:"'Mint Chocolate Beats' is what genre?",       opts:["Indie","Chillhop","Jazz","Ambient"], ans:1, song:4 },
  { q:"Which artist made 'Strawberry Fizz'?",        opts:["Cozy Sounds","Luna Rose","Studio Pastel","Bubblegum Vibes"], ans:3, song:5 },
  { q:"What emoji is 'Cotton Candy Sky'?",           opts:["🍑","🌈","☀️","⭐"], ans:1, song:6 },
  { q:"'Peach Blossom Jazz' runtime is?",            opts:["3:24","2:45","4:01","3:33"], ans:2, song:7 },
  { q:"Who made 'Starlight Serenade'?",              opts:["Luna Rose","Dreamy Keys","Moonpetal","Cozy Sounds"], ans:0, song:8 },
  { q:"'Raindrop Café' is by?",                      opts:["Velvet Keys","Pastel Cloud","Luna Rose","Cozy Sounds"], ans:3, song:9 },
  { q:"How long is 'Cherry Blossom Waltz'?",         opts:["2:58","4:12","3:24","3:07"], ans:2, song:0 },
  { q:"Which genre is 'Bubble Pop Fantasy'?",        opts:["Pop","Lo-fi","Dream-pop","Indie"], ans:0, song:1 },
];

/* ── State helpers ── */
function getState() {
  try { return JSON.parse(localStorage.getItem('melodyState') || '{}'); } catch { return {}; }
}
function setState(patch) {
  const s = getState();
  Object.assign(s, patch);
  localStorage.setItem('melodyState', JSON.stringify(s));
}
function getS(key, fallback) {
  const v = getState()[key];
  return v !== undefined ? v : fallback;
}

/* Default state */
function initState() {
  const defaults = {
    curIdx: 0, playing: false, progress: 0, volume: 70,
    shuffle: false, autoplay: true, repeat: false,
    points: 0, combo: 0, maxCombo: 0, songsPlayed: 0, artTaps: 0,
    minutesListened: 0, shuffleUses: 0,
    streakDays: 0, lastStreakDate: null, streakHistory: [],
    earnedBadges: [], playHistory: [], likedSongs: [],
    avatarIdx: 0, quizScore: 0, quizTotal: 0,
    hiscores: [
      { name:"🌸 Blossom", score:842 },
      { name:"🦋 Flutter",  score:631 },
      { name:"⭐ Starry",   score:420 },
    ],
  };
  const s = getState();
  const merged = Object.assign({}, defaults, s);
  localStorage.setItem('melodyState', JSON.stringify(merged));
  return merged;
}

/* ── Cursor setup ── */
function setupCursor() {
  if ('ontouchstart' in window) return;
  const dot = document.createElement('div');
  dot.className = 'cur-dot'; dot.id = 'curDot';
  const ring = document.createElement('div');
  ring.className = 'cur-ring'; ring.id = 'curRing';
  document.body.append(dot, ring);
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    dot.style.left=mx+'px'; dot.style.top=my+'px';
  });
  (function a(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(a);})();
  document.addEventListener('mouseover', e => {
    if (e.target.closest('button,a,.card-btn,.track-item,.note-btn,.opt-btn')) {
      dot.classList.add('pop'); ring.classList.add('pop');
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('button,a,.card-btn,.track-item,.note-btn,.opt-btn')) {
      dot.classList.remove('pop'); ring.classList.remove('pop');
    }
  });
}

/* ── Mini player bar ── */
function buildMiniBar(activePage) {
  const s = initState();
  const t = TRACKS[s.curIdx] || TRACKS[0];
  const pages = [
    { id:'home',     href:'index.html',    icon:'🏠', label:'Home'     },
    { id:'player',   href:'player.html',   icon:'🎵', label:'Player'   },
    { id:'playlist', href:'playlist.html', icon:'🎶', label:'Playlist' },
    { id:'picks',    href:'picks.html',    icon:'🔥', label:'Top Picks'},
    { id:'streak',   href:'streak.html',   icon:'📅', label:'Streak'   },
    { id:'quiz',     href:'quiz.html',     icon:'🎯', label:'Quiz'     },
    { id:'profile',  href:'profile.html',  icon:'🌸', label:'Profile'  },
  ];
  document.body.insertAdjacentHTML('afterbegin', `
    <div class="mini-bar" id="miniBar">
      <div class="mini-art ${s.playing?'playing':''}" id="miniArt" style="background:${t.color}">${t.emoji}</div>
      <div class="mini-info">
        <div class="mini-title" id="miniTitle">${t.title}</div>
        <div class="mini-artist" id="miniArtist">${t.artist}</div>
        <div class="mini-prog-wrap"><div class="mini-prog-fill" id="miniProg" style="width:${s.progress}%"></div></div>
      </div>
      <div class="mini-controls">
        <button class="mini-btn" onclick="miniPrev()">⏮</button>
        <button class="mini-play" id="miniPlay" onclick="miniToggle()">${s.playing?'⏸':'▶'}</button>
        <button class="mini-btn" onclick="miniNext()">⏭</button>
      </div>
    </div>
  `);

  // Bottom nav
  const navHTML = pages.map(p => `
    <a href="${p.href}" class="nav-btn${activePage===p.id?' active':''}" onclick="playClick()">
      <span class="ni">${p.icon}</span>${p.label}
    </a>
  `).join('');
  document.body.insertAdjacentHTML('beforeend', `
    <nav class="bottom-nav">${navHTML}</nav>
    <div class="toast" id="globalToast"></div>
  `);
}

/* ── Mini player controls ── */
let simInterval = null, simTime = 0;
function miniToggle() {
  const s = getState();
  if (s.playing) { stopSim(); setState({playing:false}); updateMiniUI(); }
  else { startSim(); }
}
function miniPrev() {
  stopSim();
  const s = getState();
  const idx = (s.curIdx - 1 + TRACKS.length) % TRACKS.length;
  setState({ curIdx: idx, progress: 0, playing: false });
  updateMiniUI();
}
function miniNext() {
  stopSim();
  const s = getState();
  const idx = (s.curIdx + 1) % TRACKS.length;
  setState({ curIdx: idx, progress: 0, playing: false });
  updateMiniUI();
}
function startSim() {
  const s = getState();
  simTime = Math.floor((s.progress / 100) * TRACKS[s.curIdx].dur);
  setState({ playing: true });
  updateMiniUI();
  clearInterval(simInterval);
  simInterval = setInterval(() => {
    const st = getState();
    simTime++;
    const pct = (simTime / TRACKS[st.curIdx].dur) * 100;
    setState({ progress: pct, minutesListened: (st.minutesListened||0) + 1/60 });
    const progEl = document.getElementById('miniProg');
    if (progEl) progEl.style.width = pct + '%';
    if (pct >= 100) {
      stopSim();
      if (st.autoplay) {
        const next = (st.curIdx + 1) % TRACKS.length;
        setState({ curIdx: next, progress: 0, playing: false });
        updateMiniUI();
        startSim();
      }
    }
  }, 1000);
}
function stopSim() {
  clearInterval(simInterval);
}
function updateMiniUI() {
  const s = getState();
  const t = TRACKS[s.curIdx];
  const miniArt = document.getElementById('miniArt');
  const miniTitle = document.getElementById('miniTitle');
  const miniArtist = document.getElementById('miniArtist');
  const miniPlay = document.getElementById('miniPlay');
  const miniProg = document.getElementById('miniProg');
  if (miniArt) { miniArt.textContent = t.emoji; miniArt.style.background = t.color; miniArt.classList.toggle('playing', s.playing); }
  if (miniTitle) miniTitle.textContent = t.title;
  if (miniArtist) miniArtist.textContent = t.artist;
  if (miniPlay) miniPlay.textContent = s.playing ? '⏸' : '▶';
  if (miniProg) miniProg.style.width = s.progress + '%';
}

/* ── Toast ── */
let _toastTimer;
function showToast(msg) {
  const t = document.getElementById('globalToast');
  if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ── Floater ── */
const FLOATS = ['✨','💖','🌸','⭐','💫','🌟','🎊','🍀','🦋','🎈'];
function spawnFloat(e, emoji) {
  const em = emoji || FLOATS[Math.floor(Math.random()*FLOATS.length)];
  const f = document.createElement('div');
  f.className = 'floater'; f.textContent = em;
  const x = (e?.clientX||window.innerWidth/2) - 12;
  const y = (e?.clientY||window.innerHeight/2) - 12;
  f.style.cssText = `left:${x}px;top:${y}px`;
  document.body.appendChild(f);
  setTimeout(() => f.remove(), 1200);
}

/* ── Random click floaters ── */
function playClick() {}
document.addEventListener('click', e => { if (Math.random()<.22) spawnFloat(e); });

/* ── Points ── */
function addPoints(n, msg) {
  const s = getState();
  setState({ points: (s.points||0) + n });
  if (msg) showToast(msg);
  checkBadges();
}

/* ── Streak check ── */
function checkDailyStreak() {
  const s = getState();
  const today = new Date().toDateString();
  if (s.lastStreakDate !== today) {
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
    const wasYesterday = s.lastStreakDate === yesterday.toDateString();
    const newStreak = wasYesterday ? (s.streakDays||0) + 1 : 1;
    const hist = (s.streakHistory||[]).slice(-29);
    hist.push({ date: today, active: true });
    setState({ streakDays: newStreak, lastStreakDate: today, streakHistory: hist });
    if (newStreak > 1) addPoints(newStreak * 5, `🔥 ${newStreak}-day streak! +${newStreak*5} pts`);
  }
}

/* ── Badges ── */
const ALL_BADGES = [
  { id:'first_play', icon:'▶️', name:'First Note',   desc:'Play your first song'         },
  { id:'combo5',     icon:'🔥', name:'Hot Streak',   desc:'5-tap combo in game'          },
  { id:'art10',      icon:'🎨', name:'Art Lover',    desc:'Tap album art 10 times'       },
  { id:'full_list',  icon:'📋', name:'Full Journey', desc:'Play all 10 songs'            },
  { id:'night_owl',  icon:'🦉', name:'Night Owl',    desc:'Listen after 10pm'            },
  { id:'vibe500',    icon:'💎', name:'Vibe Gem',     desc:'Collect 500 vibes'            },
  { id:'combo15',    icon:'🌟', name:'Combo Master', desc:'15-tap combo in game'         },
  { id:'song5',      icon:'🎶', name:'Jukebox',      desc:'Play 5 different songs'       },
  { id:'shuffle3',   icon:'🔀', name:'Shuffler',     desc:'Use shuffle 3 times'          },
  { id:'quiz_ace',   icon:'🎯', name:'Quiz Ace',     desc:'Get 10 quiz answers right'    },
  { id:'streak7',    icon:'🗓️', name:'Week Warrior', desc:'7-day listening streak'       },
  { id:'liked5',     icon:'❤️', name:'Music Lover',  desc:'Like 5 songs'                 },
];
function checkBadges() {
  const s = getState();
  const earned = new Set(s.earnedBadges || []);
  const earn = (id) => {
    if (earned.has(id)) return;
    earned.add(id);
    setState({ earnedBadges: [...earned] });
    const b = ALL_BADGES.find(x=>x.id===id);
    if (b) { showToast(`🏅 Badge: ${b.name}!`); addPoints(30); }
  };
  if ((s.songsPlayed||0)>=1)       earn('first_play');
  if ((s.maxCombo||0)>=5)          earn('combo5');
  if ((s.artTaps||0)>=10)          earn('art10');
  const hist = s.playHistory||[];
  if (new Set(hist).size>=10)      earn('full_list');
  const h = new Date().getHours();
  if (h>=22||h<4)                  earn('night_owl');
  if ((s.points||0)>=500)          earn('vibe500');
  if ((s.maxCombo||0)>=15)         earn('combo15');
  if ((s.songsPlayed||0)>=5)       earn('song5');
  if ((s.shuffleUses||0)>=3)       earn('shuffle3');
  if ((s.quizScore||0)>=10)        earn('quiz_ace');
  if ((s.streakDays||0)>=7)        earn('streak7');
  if ((s.likedSongs||[]).length>=5) earn('liked5');
}

/* ── Level system ── */
const LEVELS = [
  { name:'🌱 Sprout',    xp:0    },
  { name:'🌸 Bloom',     xp:50   },
  { name:'🌟 Star',      xp:150  },
  { name:'🦋 Flutter',   xp:350  },
  { name:'🎀 Dreamer',   xp:700  },
  { name:'💫 Nova',      xp:1200 },
  { name:'🌙 Celestial', xp:2000 },
];
function getLevel(pts) {
  let lvl = 0;
  for (let i=LEVELS.length-1; i>=0; i--) { if (pts>=LEVELS[i].xp){ lvl=i; break; } }
  return { level:lvl+1, name:LEVELS[lvl].name, cur:LEVELS[lvl].xp, next:LEVELS[Math.min(lvl+1,LEVELS.length-1)].xp };
}

/* ── Avatars ── */
const AVATARS = ['🎀','🦋','🌸','⭐','🌙','🎵','🌈','💖','🍓','🌺','🎭','🎪'];

/* ── Format seconds ── */
function fmtTime(s) {
  const m = Math.floor(s/60), sec = Math.floor(s%60);
  return m+':'+(sec<10?'0':'')+sec;
}
