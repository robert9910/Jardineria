/* ================================================
   PRO TAREAS — main.js v3 — ANIMACIONES 3D
   ================================================ */

const WA_NUMBER = "526121234567";

/* ===== UTILS ===== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* ===== CURSOR PERSONALIZADO ===== */
const cursorDot  = document.createElement("div");
const cursorRing = document.createElement("div");
cursorDot.className  = "cursor-dot";
cursorRing.className = "cursor-ring";
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mx = -100, my = -100;
let rx = -100, ry = -100;

document.addEventListener("mousemove", e => { mx = e.clientX; my = e.clientY; });

;(function tickCursor() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    cursorDot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`;
    cursorRing.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
    requestAnimationFrame(tickCursor);
})();

// Agrandar cursor sobre interactivos
document.addEventListener("mouseover", e => {
    if (e.target.closest("a, button, .service-card, .team-card, .testimonial")) {
        cursorRing.classList.add("cursor-hover");
    }
});
document.addEventListener("mouseout", e => {
    if (e.target.closest("a, button, .service-card, .team-card, .testimonial")) {
        cursorRing.classList.remove("cursor-hover");
    }
});

/* ===== PARTÍCULAS DE FONDO (CANVAS) ===== */
const canvas = document.createElement("canvas");
canvas.id = "particles-bg";
canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.45;";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
let W, H, particles = [];

function resizeCanvas() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.vx = (Math.random() - .5) * .4;
        this.vy = (Math.random() - .5) * .4;
        this.r  = Math.random() * 2 + .5;
        this.a  = Math.random() * .5 + .1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,165,233,${this.a})`;
        ctx.fill();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(14,165,233,${(1 - dist / 120) * .15})`;
                ctx.lineWidth = .5;
                ctx.stroke();
            }
        }
    }
}

;(function animParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animParticles);
})();

/* ===== HAMBURGER MENU ===== */
const hamburger = $(".hamburger");
const mobileNav = $(".mobile-nav");
if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
        mobileNav.classList.toggle("open");
        const spans = hamburger.querySelectorAll("span");
        const open  = mobileNav.classList.contains("open");
        spans[0].style.transform = open ? "rotate(45deg) translate(5px,5px)" : "";
        spans[1].style.opacity   = open ? "0" : "1";
        spans[2].style.transform = open ? "rotate(-45deg) translate(5px,-5px)" : "";
    });
    mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        hamburger.querySelectorAll("span").forEach(s => { s.style.transform=""; s.style.opacity="1"; });
    }));
}

/* ===== HEADER SCROLL ===== */
const header = $(".header");
window.addEventListener("scroll", () => {
    if (header) header.style.boxShadow = window.scrollY > 10 ? "0 2px 30px rgba(0,0,0,.1)" : "";
});

/* ===== CARRUSEL HERO (texto) ===== */
const carouselWrap = $(".carousel-wrap");
if (carouselWrap) {
    const cont  = carouselWrap.querySelector(".items");
    const items = cont.querySelectorAll(".item");
    let cur = 0;
    setInterval(() => {
        cur = (cur + 1) % items.length;
        cont.style.transform = `translateY(-${cur * 44}px)`;
    }, 2500);
}

/* ===== EFECTO 3D TILT EN CARDS ===== */
function addTilt(selector, depth = 20) {
    $$(selector).forEach(card => {
        card.style.transformStyle = "preserve-3d";
        card.style.transition     = "transform .1s ease, box-shadow .3s";

        card.addEventListener("mousemove", e => {
            const r   = card.getBoundingClientRect();
            const cx  = r.left + r.width  / 2;
            const cy  = r.top  + r.height / 2;
            const dx  = (e.clientX - cx) / (r.width  / 2);
            const dy  = (e.clientY - cy) / (r.height / 2);
            const rx_ = -dy * depth;
            const ry_ =  dx * depth;
            card.style.transform = `perspective(800px) rotateX(${rx_}deg) rotateY(${ry_}deg) translateZ(8px)`;
            card.style.boxShadow = `${-ry_}px ${rx_}px 40px rgba(14,165,233,.25)`;

            // Brillo interior siguiendo el mouse
            const shine = card.querySelector(".card-shine");
            if (shine) {
                const px = ((e.clientX - r.left) / r.width)  * 100;
                const py = ((e.clientY - r.top)  / r.height) * 100;
                shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.18) 0%, transparent 60%)`;
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
            card.style.boxShadow = "";
        });
    });
}
addTilt(".service-card", 15);
addTilt(".team-card",    12);
addTilt(".testimonial",  8);

// Inyectar capa de brillo en cada card
$$(".service-card, .team-card, .testimonial").forEach(card => {
    const shine = document.createElement("div");
    shine.className = "card-shine";
    shine.style.cssText = "position:absolute;inset:0;border-radius:inherit;pointer-events:none;transition:background .2s;z-index:1;";
    card.style.position = "relative";
    card.style.overflow = "hidden";
    card.appendChild(shine);
});

/* ===== BOTONES MAGNÉTICOS ===== */
$$(".btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const r   = btn.getBoundingClientRect();
        const dx  = e.clientX - (r.left + r.width  / 2);
        const dy  = e.clientY - (r.top  + r.height / 2);
        btn.style.transform = `translate(${dx * .25}px, ${dy * .25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
    });
});

/* ===== PARALLAX HERO ===== */
const heroBlob    = $(".hero-blob");
const studentImg  = $(".student");
const floatCards  = $$(".float-card");

window.addEventListener("mousemove", e => {
    const px = (e.clientX / window.innerWidth  - .5) * 2;
    const py = (e.clientY / window.innerHeight - .5) * 2;

    if (heroBlob)   heroBlob.style.transform   = `translate(${px * 20}px, ${py * 20}px)`;
    if (studentImg) studentImg.style.transform = `translate(${px * 10}px, ${py * 10}px) rotateY(${px * 5}deg)`;
    floatCards.forEach((fc, i) => {
        const f = i === 0 ? 1.4 : .8;
        fc.style.transform = `translate(${px * 14 * f}px, ${py * 14 * f}px)`;
    });
});

/* ===== SCROLL 3D — rotaciones al desplazar ===== */
const scrollObserverOptions = { threshold: 0.15, rootMargin: "0px 0px -60px 0px" };

// Cards con giro 3D de entrada
const cardEntryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            cardEntryObserver.unobserve(entry.target);
        }
    });
}, scrollObserverOptions);

$$(".service-card, .team-card, .float-card").forEach((el, i) => {
    el.style.transition = `opacity .7s ease ${i % 4 * 80}ms, transform .7s cubic-bezier(.34,1.56,.64,1) ${i % 4 * 80}ms`;
    el.classList.add("pre-reveal");
    cardEntryObserver.observe(el);
});

$$(".testimonial").forEach((el, i) => {
    el.style.transition = `opacity .6s ease ${i % 5 * 60}ms, transform .6s ease ${i % 5 * 60}ms`;
    el.classList.add("pre-reveal-slide");
    cardEntryObserver.observe(el);
});

// Texto hero y section headers — fade up
const textObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("text-revealed");
            textObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

$$(".section-header, .quote-info, .quote-form, .stats-bar .stat-item").forEach((el, i) => {
    el.style.transition = `opacity .8s ease ${i * 100}ms, transform .8s ease ${i * 100}ms`;
    el.classList.add("pre-text");
    textObserver.observe(el);
});

/* ===== STATS BAR CONTADOR ANIMADO ===== */
const statsBar = $(".stats-bar");
if (statsBar) {
    const io = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        $$(".stat-item .num").forEach(el => {
            const raw = el.dataset.value || el.textContent;
            const num = parseInt(raw.replace(/\D/g, ""), 10);
            const suf = raw.includes("+") ? "+" : (raw.includes("%") ? "%" : "");
            const dur = 1800, start = performance.now();
            const step = now => {
                const p = Math.min((now - start) / dur, 1);
                el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * num) + suf;
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        });
    }, { threshold: .4 });
    io.observe(statsBar);
}

/* ===== CARRUSEL TESTIMONIALES ===== */
window.addEventListener("DOMContentLoaded", () => {
    const track = $(".testimonials-track");
    if (!track) return;
    const GAP = 24, CLONES = 4;
    let cards = Array.from(track.children);
    for (let i = 0; i < CLONES; i++) track.appendChild(cards[i].cloneNode(true));
    cards = Array.from(track.children);
    let idx = 0;
    setInterval(() => {
        const w = cards[0].offsetWidth + GAP;
        idx++;
        track.style.transition = "transform .8s cubic-bezier(.4,0,.2,1)";
        track.style.transform  = `translateX(-${idx * w}px)`;
        if (idx >= cards.length - CLONES) {
            setTimeout(() => {
                track.style.transition = "none";
                idx = 0;
                track.style.transform  = "translateX(0)";
            }, 850);
        }
    }, 3800);
});

/* ===== HERO TEXT APARECE LETRA POR LETRA (H1) ===== */
window.addEventListener("DOMContentLoaded", () => {
    const h1 = $(".hero-text h1");
    if (!h1) return;
    h1.style.opacity = "1"; // ya visible, el CSS hace el resto
});

/* ===== FORMULARIO → WHATSAPP ===== */
const form = $(".quote-form");
if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const g = name => { const el = form.querySelector(`[name="${name}"]`); return el ? el.value.trim() : ""; };
        let msg = `¡Hola! Quiero cotizar un servicio en *ProTareas* 🎓\n\n`;
        msg += `👤 *Nombre:* ${g("nombre")}\n`;
        msg += `📱 *WhatsApp:* ${g("whatsapp")}\n`;
        msg += `🎓 *Carrera:* ${g("carrera")}\n`;
        msg += `📚 *Materia:* ${g("materia")}\n`;
        msg += `📝 *Descripción:* ${g("detalle")}`;
        if (g("fecha")) msg += `\n📅 *Fecha límite:* ${g("fecha")}`;
        if (g("hora"))  msg += ` a las ${g("hora")}`;
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    });
}

/* ===== GIRO 3D DEL LOGO EN HOVER ===== */
const logo = $(".logo");
if (logo) {
    logo.addEventListener("mouseenter", () => {
        logo.style.transition = "transform .4s cubic-bezier(.34,1.56,.64,1)";
        logo.style.transform  = "perspective(400px) rotateY(12deg) scale(1.05)";
    });
    logo.addEventListener("mouseleave", () => {
        logo.style.transform  = "";
    });
}

/* ===== TEXTO DEL HERO — STAGGER DE ENTRADA ===== */
window.addEventListener("DOMContentLoaded", () => {
    const staggerEls = $$(".hero-eyebrow, .hero-text h1, .carousel-wrap, .hero-cta, .hero-trust");
    staggerEls.forEach((el, i) => {
        el.style.opacity   = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = `opacity .7s ease ${i * 120}ms, transform .7s ease ${i * 120}ms`;
        setTimeout(() => {
            el.style.opacity   = "1";
            el.style.transform = "translateY(0)";
        }, 100 + i * 120);
    });

    // Imagen hero 3D de entrada
    const heroImg = $(".hero-image");
    if (heroImg) {
        heroImg.style.opacity   = "0";
        heroImg.style.transform = "perspective(800px) rotateY(25deg) translateX(60px)";
        heroImg.style.transition = "opacity 1s ease .4s, transform 1s cubic-bezier(.34,1.2,.64,1) .4s";
        setTimeout(() => {
            heroImg.style.opacity   = "1";
            heroImg.style.transform = "perspective(800px) rotateY(0deg) translateX(0)";
        }, 200);
    }
});

/* ===== EFECTO MORPHING EN BLOB DEL HERO ===== */
;(function morphBlob() {
    if (!heroBlob) return;
    let t = 0;
    function tick() {
        t += .005;
        const a = 50 + Math.sin(t)      * 8;
        const b = 60 + Math.sin(t + 1)  * 6;
        const c = 55 + Math.sin(t + 2)  * 10;
        const d = 45 + Math.sin(t + .5) * 7;
        heroBlob.style.borderRadius = `${a}% ${100-a}% ${b}% ${100-b}% / ${c}% ${d}% ${100-d}% ${100-c}%`;
        requestAnimationFrame(tick);
    }
    tick();
})();

/* ===== SCROLL PROGRESS BAR ===== */
const progressBar = document.createElement("div");
progressBar.style.cssText = "position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#0EA5E9,#38BDF8);z-index:9999;transition:width .1s;pointer-events:none;border-radius:0 2px 2px 0;";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = clamp(pct, 0, 100) + "%";
});

/* ===== PARALLAX SECCIONES AL SCROLL ===== */
const parallaxEls = [
    { el: $(".stats-bar"),     speed: .15 },
    { el: $(".services"),      speed: .1  },
    { el: $(".team-section"),  speed: .08 },
];

window.addEventListener("scroll", () => {
    const sy = window.scrollY;
    parallaxEls.forEach(({ el, speed }) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const offset = (rect.top + sy) - window.innerHeight / 2;
        el.style.backgroundPositionY = `${offset * speed}px`;
    });

    // Rotation parallax en iconos de service-card
    $$(".service-icon").forEach((icon, i) => {
        const rect  = icon.getBoundingClientRect();
        const pct   = 1 - rect.top / window.innerHeight;
        const angle = clamp(pct * 360, 0, 360);
        icon.style.transform = `rotate(${angle * .2 * (i % 2 === 0 ? 1 : -1)}deg)`;
    });
});
