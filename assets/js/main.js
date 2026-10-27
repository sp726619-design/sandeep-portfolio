const PROJECTS = [
  {
    id: "ca-sir-10",
    title: "CA Sir Promo Reel",
    client: "CA Sir",
    category: "Reels",
    year: "2026",
    role: "Video Editor",
    duration: "00:25",
    tools: ["Premiere Pro"],
    cover: "assets/img/ca-sir-cover.svg",
    video: "assets/videos/CA Sir 10.mp4",
    brief: "Create a crisp, retention-focused promo reel for CA coaching designed for Instagram Reels and YouTube Shorts.",
    approach: "Hook-first edit with tight trims, rhythmic pacing and minimal text to keep attention high.",
    result: "Clean, scroll-stopping vertical edit built for maximum watch time.",
    featured: true
  },
  {
    id: "ravi-sir-16",
    title: "Ravi Sir Promo Reel 16",
    client: "Ravi Sir",
    category: "Reels",
    year: "2026",
    role: "Video Editor",
    duration: "00:22",
    tools: ["Premiere Pro"],
    cover: "assets/img/ravi-sir-16-cover.svg",
    video: "assets/videos/ravi sir 16.mp4",
    brief: "Promotional reel aimed at driving enquiries through short-form content.",
    approach: "Strong hook, beat-driven cuts and clean transitions tailored to vertical platforms.",
    result: "High-impact promo ready to post across Reels and Shorts.",
    featured: true
  },
  {
    id: "ravi-sir-3",
    title: "Ravi Sir Promo Reel",
    client: "Ravi Sir",
    category: "Reels",
    year: "2026",
    role: "Video Editor",
    duration: "00:21",
    tools: ["Premiere Pro"],
    cover: "assets/img/ravi-sir-3-cover.svg",
    video: "assets/videos/ravi sir3.mp4",
    brief: "Fast-paced promotional edit with focus on clean flow.",
    approach: "Tight pacing, rhythmic cuts and precise trims.",
    result: "Concise, engaging reel optimised for vertical viewing.",
    featured: false
  },
  {
    id: "ravi-sir-9",
    title: "Ravi Sir Promo Reel 9",
    client: "Ravi Sir",
    category: "Reels",
    year: "2026",
    role: "Video Editor",
    duration: "00:26",
    tools: ["Premiere Pro"],
    cover: "assets/img/ravi-sir-9-cover.svg",
    video: "assets/videos/ravi sir 9.MP4",
    brief: "Engaging promo reel tailored for Instagram with strong hook.",
    approach: "Hook-led structure with punchy cuts and natural rhythm.",
    result: "Client-ready vertical edit with solid retention focus.",
    featured: false
  }
];

const CATEGORIES = ["All", "Reels", "Ads", "Brand Film", "Long Form"];

function qs(sel, root) { return (root || document).querySelector(sel); }
function qsa(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
function esc(str) { return String(str || '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[s])); }

function initNav() {
  const header = qs('.header');
  const toggle = qs('.nav__toggle');
  const menu = qs('.mobile-menu');
  const close = qs('.mobile-menu__close');
  const links = qsa('.mobile-menu__link');

  const onScroll = () => {
    if (window.scrollY > 10) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle) toggle.addEventListener('click', () => menu.classList.add('is-open'));
  if (close) close.addEventListener('click', () => menu.classList.remove('is-open'));
  links.forEach(l => l.addEventListener('click', () => menu.classList.remove('is-open')));
}

function initReveals() {
  const els = qsa('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

function year() {
  const el = qs('[data-year]');
  if (el) el.textContent = String(new Date().getFullYear());
}

function renderMarquee() {
  const track = qs('.marquee__track');
  if (!track) return;
  const items = [
    'Video Editing', 'Short Form', 'Ads', 'Brand Films', 'Motion', 'Color', 'Sound Design', 'Reels', 'YouTube', 'Retention Focus'
  ];
  const html = items.map(i => `<div class="marquee__item"><span>${esc(i)}</span><span class="marquee__dot"></span></div>`).join('');
  track.innerHTML = html + html;
}

function workCardHTML(p, full) {
  return `
    <article class="work-card ${full ? 'work-card--full' : ''} reveal">
      <a href="project.html?id=${encodeURIComponent(p.id)}">
        <div class="work-card__media">
          <img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy">
          <div class="work-card__overlay"></div>
        </div>
        <div class="work-card__content">
          <div class="work-card__meta-group">
            <div class="work-card__tags">
              <span class="chip">${esc(p.category)}</span>
              <span class="chip">${esc(p.duration)}</span>
            </div>
            <div>
              <h3 class="work-card__title">${esc(p.title)}</h3>
              <p class="work-card__sub">${esc(p.client)} • ${esc(p.year)}</p>
            </div>
          </div>
          <div class="work-card__arrow">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25 12.75L12.75 5.25M12.75 5.25H6.75M12.75 5.25V11.25" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </a>
    </article>
  `;
}

function renderFeatured() {
  const grid = qs('#featuredGrid');
  if (!grid) return;
  const list = PROJECTS.filter(p => p.featured);
  grid.innerHTML = list.map((p, i) => workCardHTML(p, i === 0 && list.length > 1)).join('');
}

function renderWork() {
  const grid = qs('#workGrid');
  const filters = qs('#workFilters');
  if (!grid) return;
  function paint(active) {
    const list = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);
    grid.innerHTML = list.map(p => workCardHTML(p)).join('');
    initReveals();
  }
  if (filters) {
    filters.innerHTML = CATEGORIES.map((c, i) => `
      <button class="filter ${i === 0 ? 'is-active' : ''}" data-filter="${esc(c)}">
        <span>${esc(c)}</span>
        <span class="filter__count">${String(c === 'All' ? PROJECTS.length : PROJECTS.filter(p=>p.category===c).length).padStart(2,'0')}</span>
      </button>
    `).join('');
    qsa('.filter', filters).forEach(btn => btn.addEventListener('click', () => {
      qsa('.filter', filters).forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      paint(btn.dataset.filter);
    }));
  }
  paint('All');
}

function renderProject() {
  const root = qs('#projectRoot');
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const p = PROJECTS.find(x => x.id === id) || PROJECTS[0];
  if (!p) return;

  root.innerHTML = `
    <section class="project-hero">
      <div class="container project-hero__grid reveal">
        <div class="project-hero__content">
          <div class="hero__kicker">
            <span class="brand__dot"></span>
            <span>${esc(p.category)}</span>
          </div>
          <h1 class="page-hero__title" style="text-transform:none; letter-spacing:-0.06em;">${esc(p.title)}</h1>
          <p class="page-hero__lead">${esc(p.brief)}</p>
        </div>
        <div class="project-hero__meta">
          <div class="project-meta">
            <span class="project-meta__label">Client</span>
            <span>${esc(p.client)}</span>
          </div>
          <div class="project-meta">
            <span class="project-meta__label">Role</span>
            <span>${esc(p.role)}</span>
          </div>
          <div class="project-meta">
            <span class="project-meta__label">Year</span>
            <span>${esc(p.year)}</span>
          </div>
          <div class="project-meta">
            <span class="project-meta__label">Duration</span>
            <span>${esc(p.duration)}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="project-media">
      <div class="container reveal">
        <div class="project-media__frame">
          <video src="${esc(p.video)}" poster="${esc(p.cover)}" controls playsinline></video>
        </div>
      </div>
    </section>

    <section class="project-section">
      <div class="container project-section__grid">
        <h2 class="project-section__title reveal">Brief</h2>
        <div class="project-section__content reveal">
          <p>${esc(p.brief)}</p>
        </div>
      </div>
    </section>

    <section class="project-section" style="padding-top:0">
      <div class="container project-section__grid">
        <h2 class="project-section__title reveal">Approach</h2>
        <div class="project-section__content reveal">
          <p>${esc(p.approach)}</p>
        </div>
      </div>
    </section>

    <section class="project-section" style="padding-top:0">
      <div class="container project-section__grid">
        <h2 class="project-section__title reveal">Result</h2>
        <div class="project-section__content reveal">
          <p>${esc(p.result)}</p>
          <div class="work-card__tags" style="margin-top:10px">
            ${(p.tools||[]).map(t=>`<span class="chip">${esc(t)}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="next-project">
      <div class="container next-project__inner reveal">
        <div>
          <span class="next-project__label">Next Project</span>
          <h3 class="next-project__title">
            <a href="work.html">View all work</a>
          </h3>
        </div>
        <a class="btn btn--ghost" href="work.html">
          <span>Back to work</span>
          <span class="btn__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.333 8h9.334M9.333 4l4 4-4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </a>
      </div>
    </section>
  `;
  initReveals();
}

function boot() {
  initNav();
  renderMarquee();
  renderFeatured();
  renderWork();
  renderProject();
  year();
  initReveals();
}

document.addEventListener('DOMContentLoaded', boot);
