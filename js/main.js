/* ═══════════════════════════════════════
   PROTAREAS v4 — main.js PREMIUM
   ═══════════════════════════════════════ */

const WA_NUMBER = "526462587803"; // ← Cambia por tu número

/* ── UTILS ── */
const $  = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/* ════════════════════════
   CURSOR MAGNÉTICO
════════════════════════ */
const dot  = $('.cur-dot');
const ring = $('.cur-ring');
let mx = -200, my = -200, rx = -200, ry = -200;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

;(function cursorTick() {
  rx = lerp(rx, mx, 0.10);
  ry = lerp(ry, my, 0.10);
  dot.style.transform  = `translate(${mx-4}px,${my-4}px)`;
  ring.style.transform = `translate(${rx-18}px,${ry-18}px)`;
  requestAnimationFrame(cursorTick);
})();

document.addEventListener('mouseover', e => {
  if (e.target.closest('a,button,.bento-card,.team-card,.tcard,.glass-card')) ring.classList.add('big');
});
document.addEventListener('mouseout', e => {
  if (e.target.closest('a,button,.bento-card,.team-card,.tcard,.glass-card')) ring.classList.remove('big');
});

/* ════════════════════════
   PROGRESS BAR
════════════════════════ */
const progressBar = $('.progress-bar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  progressBar.style.width = clamp(pct, 0, 100) + '%';
}, { passive: true });

/* ════════════════════════
   HEADER
════════════════════════ */
const header = $('#header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ════════════════════════
   HAMBURGER
════════════════════════ */
const ham     = $('.hamburger');
const overlay = $('#mobileOverlay');
if (ham && overlay) {
  ham.addEventListener('click', () => {
    const open = overlay.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    spans[0].style.transform = open ? 'rotate(45deg) translate(6px,6px)' : '';
    spans[1].style.transform = open ? 'rotate(-45deg) translate(6px,-6px)' : '';
  });
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    overlay.classList.remove('open');
    ham.querySelectorAll('span').forEach(s => { s.style.transform = ''; });
  }));
}

/* ════════════════════════
   TICKER DEL HERO
════════════════════════ */
const ticker = $('.ticker-items');
if (ticker) {
  const spans = ticker.querySelectorAll('span');
  let cur = 0;
  setInterval(() => {
    cur = (cur + 1) % spans.length;
    ticker.style.transform = `translateY(-${cur * 38}px)`;
  }, 2600);
}

/* ════════════════════════
   ORB PARALLAX (HERO)
════════════════════════ */
const orbs = $$('.orb');
const orbit = $('#studentOrbit');
const gcCards = $$('.glass-card');

window.addEventListener('mousemove', e => {
  const px = (e.clientX / window.innerWidth  - .5) * 2;
  const py = (e.clientY / window.innerHeight - .5) * 2;

  orbs.forEach((o, i) => {
    const d = (i + 1) * 12;
    o.style.transform = `translate(${px*d}px,${py*d}px)`;
  });

  if (orbit) {
    orbit.style.transform = `perspective(800px) rotateY(${px*6}deg) rotateX(${-py*4}deg)`;
  }

  gcCards.forEach((c, i) => {
    const depth = parseFloat(c.dataset.depth || 1);
    const tx = px * 16 * depth;
    const ty = py * 16 * depth;
    c.style.transform = c.classList.contains('gc-3')
      ? `translate(${tx}px,calc(-50% + ${ty}px))`
      : `translate(${tx}px,${ty}px)`;
  });
}, { passive: true });

/* ════════════════════════
   TILT 3D EN CARDS
════════════════════════ */
function initTilt(selector, intensity = 18) {
  $$(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) / (r.width  / 2);
      const dy  = (e.clientY - cy) / (r.height / 2);
      card.style.transform = `perspective(900px) rotateX(${-dy*intensity}deg) rotateY(${dx*intensity}deg) translateZ(6px)`;

      // Shine dinámico
      const shine = card.querySelector('.bento-shine,.card-s');
      if (shine) {
        const px = ((e.clientX - r.left) / r.width)  * 100;
        const py = ((e.clientY - r.top)  / r.height) * 100;
        shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.1) 0%, transparent 55%)`;
        shine.style.opacity = '1';
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const shine = card.querySelector('.bento-shine,.card-s');
      if (shine) shine.style.opacity = '0';
    });
  });
}

initTilt('.bento-card', 12);
initTilt('.team-card',  10);
initTilt('.tcard',       6);

/* ════════════════════════
   BOTONES MAGNÉTICOS
════════════════════════ */
$$('.magnetic, .btn-submit').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width  / 2)) * .28;
    const dy = (e.clientY - (r.top  + r.height / 2)) * .28;
    btn.style.transform = `translate(${dx}px,${dy}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ════════════════════════
   SCROLL REVEAL (IntersectionObserver)
════════════════════════ */
const ioReveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    ioReveal.unobserve(e.target);
  });
}, { threshold: .12, rootMargin: '0px 0px -60px 0px' });

// Delay stagger en cards
$$('.reveal-card').forEach((el, i) => {
  const d = parseInt(el.dataset.delay || 0);
  el.style.transitionDelay = d + 'ms';
  ioReveal.observe(el);
});

// Reveal text elements
$$('.reveal-up').forEach((el, i) => {
  ioReveal.observe(el);
});

/* ════════════════════════
   STATS — CONTADOR ANIMADO
════════════════════════ */
const statsSection = $('.stats-section');
if (statsSection) {
  const ioStats = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    ioStats.disconnect();
    $$('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const dur = 1800, t0 = performance.now();
      const tick = now => {
        const p = clamp((now - t0) / dur, 0, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .5 });
  ioStats.observe(statsSection);
}

/* ════════════════════════
   HERO STAGGER DE ENTRADA
════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  const els = [
    '.hero-badge', '.hero-h1 .line:nth-child(1)',
    '.hero-h1 .line:nth-child(2)', '.hero-h1 .line:nth-child(3)',
    '.ticker-wrap', '.hero-sub', '.hero-actions', '.social-proof'
  ];
  els.forEach((sel, i) => {
    const el = $(sel);
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity .7s ease ${120 + i*90}ms, transform .7s cubic-bezier(.22,1,.36,1) ${120 + i*90}ms`;
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 80 + i * 90);
  });

  // Imagen hero entra con rotación 3D
  const heroVis = $('.hero-visual');
  if (heroVis) {
    heroVis.style.opacity   = '0';
    heroVis.style.transform = 'perspective(900px) rotateY(30deg) translateX(60px)';
    heroVis.style.transition = 'opacity 1.1s ease .5s, transform 1.1s cubic-bezier(.22,1,.36,1) .5s';
    setTimeout(() => {
      heroVis.style.opacity   = '1';
      heroVis.style.transform = 'perspective(900px) rotateY(0deg) translateX(0)';
    }, 200);
  }
});

/* ════════════════════════
   PARALLAX SUTIL EN SCROLL
════════════════════════ */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;

  // Orbs se mueven levemente con el scroll
  orbs.forEach((o, i) => {
    const speed = (i + 1) * .04;
    o.style.transform = `translateY(${sy * speed}px)`;
  });

  // Scroll reveal de iconos en bento
  $$('.bento-icon-big').forEach((icon, i) => {
    const rect = icon.getBoundingClientRect();
    const pct  = 1 - rect.top / window.innerHeight;
    if (pct > 0 && pct < 1.5) {
      icon.style.transform = `rotate(${pct * 20 * (i % 2 ? 1 : -1)}deg) scale(${1 + pct * .04})`;
    }
  });
}, { passive: true });

/* ════════════════════════
   BLOB MORPH (ORBIT)
════════════════════════ */
;(function morphOrbit() {
  const sc = $('.student-circle');
  if (!sc) return;
  let t = 0;
  const tick = () => {
    t += .004;
    const a = 50 + Math.sin(t)     * 4;
    const b = 50 + Math.sin(t+1.5) * 4;
    sc.style.borderRadius = `${a}% ${100-a}% ${b}% ${100-b}% / ${50+Math.sin(t+.5)*3}% ${50+Math.sin(t+2)*3}% ${50-Math.sin(t)*3}% ${50-Math.sin(t+1)*3}%`;
    requestAnimationFrame(tick);
  };
  tick();
})();

/* ════════════════════════
   FORMULARIO → WHATSAPP
════════════════════════ */
const form = $('#quoteForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const g = name => { const el = form.querySelector(`[name="${name}"]`); return el ? el.value.trim() : ''; };
    let msg = `¡Hola! Quiero cotizar con *ProTareas* 🎓\n\n`;
    msg += `👤 *Nombre:* ${g('nombre')} ${g('apellidos')}\n`;
    msg += `📱 *WhatsApp:* ${g('whatsapp')}\n`;
    msg += `🎓 *Carrera:* ${g('carrera')}\n`;
    msg += `📚 *Materia:* ${g('materia')}\n`;
    msg += `📝 *Descripción:* ${g('detalle')}`;
    if (g('fecha')) msg += `\n📅 *Fecha límite:* ${g('fecha')}`;
    if (g('hora'))  msg += ` a las ${g('hora')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  // Animación del botón submit
  const submitBtn = form.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitBtn.style.transform = 'scale(.97)';
      setTimeout(() => { submitBtn.style.transform = ''; }, 150);
    });
  }
}

/* ════════════════════════
   CANVAS PARTÍCULAS
════════════════════════ */
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.5;';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');
let W, H, pts = [];

const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
resize();
window.addEventListener('resize', resize, { passive: true });

class Pt {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - .5) * .35;
    this.vy = (Math.random() - .5) * .35;
    this.r  = Math.random() * 1.5 + .5;
    this.a  = Math.random() * .4 + .1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(14,165,233,${this.a})`;
    ctx.fill();
  }
}

for (let i = 0; i < 70; i++) pts.push(new Pt());

;(function animPts() {
  ctx.clearRect(0, 0, W, H);
  pts.forEach(p => { p.update(); p.draw(); });
  // Líneas de conexión
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
      const d  = Math.hypot(dx, dy);
      if (d < 110) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = `rgba(14,165,233,${(1 - d/110) * .12})`;
        ctx.lineWidth = .5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animPts);
})();
