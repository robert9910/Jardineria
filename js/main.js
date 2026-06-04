/* ================================================
   PRO TAREAS — main.js v2
   ================================================ */

/* ---------- NÚMERO DE WHATSAPP ----------
   Cambia este número por el tuyo (con código de país, sin + ni espacios)
   Ejemplo México: 526121234567
*/
const WA_NUMBER = "526121234567"; // ← CAMBIA ESTE NÚMERO

/* ===== HAMBURGER MENU ===== */
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");

if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
        mobileNav.classList.toggle("open");
        // Animar las líneas del hamburger
        const spans = hamburger.querySelectorAll("span");
        const isOpen = mobileNav.classList.contains("open");
        spans[0].style.transform = isOpen ? "rotate(45deg) translate(5px, 5px)" : "";
        spans[1].style.opacity  = isOpen ? "0" : "1";
        spans[2].style.transform = isOpen ? "rotate(-45deg) translate(5px, -5px)" : "";
    });

    // Cerrar al hacer click en un link
    mobileNav.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
            mobileNav.classList.remove("open");
            hamburger.querySelectorAll("span").forEach(s => {
                s.style.transform = "";
                s.style.opacity = "1";
            });
        });
    });
}

/* ===== CARRUSEL DE SERVICIOS (HERO) ===== */
const carouselWrap = document.querySelector(".carousel-wrap");

if (carouselWrap) {
    const itemsContainer = carouselWrap.querySelector(".items");
    const items = itemsContainer.querySelectorAll(".item");
    const total = items.length;
    let current = 0;
    const ITEM_H = 44;

    setInterval(() => {
        current = (current + 1) % total;
        itemsContainer.style.transform = `translateY(-${current * ITEM_H}px)`;
    }, 2500);
}

/* ===== CARRUSEL DE TESTIMONIALES ===== */
window.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".testimonials-track");
    if (!track) return;

    const GAP = 24;
    const CLONE_COUNT = 4;
    let cards = Array.from(track.children);

    for (let i = 0; i < CLONE_COUNT; i++) {
        track.appendChild(cards[i].cloneNode(true));
    }

    cards = Array.from(track.children);
    let idx = 0;

    setInterval(() => {
        const cardWidth = cards[0].offsetWidth + GAP;
        idx++;
        track.style.transition = "transform 0.8s cubic-bezier(.4,0,.2,1)";
        track.style.transform = `translateX(-${idx * cardWidth}px)`;

        if (idx >= cards.length - CLONE_COUNT) {
            setTimeout(() => {
                track.style.transition = "none";
                idx = 0;
                track.style.transform = "translateX(0px)";
            }, 850);
        }
    }, 3800);
});

/* ===== HEADER: sombra al hacer scroll ===== */
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if (header) {
        header.style.boxShadow = window.scrollY > 10
            ? "0 2px 20px rgba(0,0,0,.08)"
            : "";
    }
});

/* ===== CONTADOR ANIMADO EN STATS BAR ===== */
function animateCount(el, target, suffix = "") {
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

const statsBar = document.querySelector(".stats-bar");
if (statsBar) {
    const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            io.disconnect();
            document.querySelectorAll(".stat-item .num").forEach(el => {
                const raw = el.dataset.value || el.textContent;
                const num = parseInt(raw.replace(/\D/g, ""), 10);
                const suffix = raw.includes("+") ? "+" : (raw.includes("%") ? "%" : "");
                animateCount(el, num, suffix);
            });
        }
    }, { threshold: 0.4 });
    io.observe(statsBar);
}

/* ===== FORMULARIO → WHATSAPP ===== */
const form = document.querySelector(".quote-form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre    = form.querySelector('input[name="nombre"]').value.trim();
        const whatsapp  = form.querySelector('input[name="whatsapp"]').value.trim();
        const carrera   = form.querySelector('input[name="carrera"]').value.trim();
        const materia   = form.querySelector('input[name="materia"]').value.trim();
        const detalle   = form.querySelector('textarea[name="detalle"]').value.trim();
        const fecha     = form.querySelector('input[name="fecha"]').value;
        const hora      = form.querySelector('input[name="hora"]').value;

        let msg = `¡Hola! Quiero cotizar un servicio en *Pro Tareas* 🎓\n\n`;
        msg += `👤 *Nombre:* ${nombre}\n`;
        msg += `📱 *WhatsApp:* ${whatsapp}\n`;
        msg += `🎓 *Carrera:* ${carrera}\n`;
        msg += `📚 *Materia:* ${materia}\n`;
        msg += `📝 *Descripción:* ${detalle}`;
        if (fecha) msg += `\n📅 *Fecha límite:* ${fecha}`;
        if (hora)  msg += ` a las ${hora}`;

        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank");
    });
}

/* ===== REVEAL ON SCROLL ===== */
const revealEls = document.querySelectorAll(
    ".service-card, .team-card, .testimonial, .quote-form, .quote-info"
);

const revealIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

revealEls.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
    revealIO.observe(el);
});
