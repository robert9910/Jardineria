/* ═══════════════════════════════════════
   PROTAREAS — chatbot.js (sin API, gratis)
   Sistema de respuestas por palabras clave
   ═══════════════════════════════════════ */

const WA_CHAT = "526121234567";

/* ════════════════════════════════════════
   BASE DE CONOCIMIENTO
════════════════════════════════════════ */
const KB = [
  {
    keys: ["hola","buenos días","buenas tardes","buenas noches","hey","hi","buenas","saludos","qué tal"],
    answers: [
      "¡Hola! 👋 ¿En qué te puedo ayudar hoy?",
      "¡Qué tal! 😊 Estoy aquí para resolver tus dudas sobre ProTareas.",
      "¡Hola! Cuéntame, ¿qué necesitas? 🎓"
    ]
  },
  {
    keys: ["precio","costo","cuánto","cuanto","cobran","cobras","tarifa","pago","vale","cuestan","barato","caro"],
    answers: [
      "Los precios varían según la materia, nivel y urgencia 📊. Para darte una cotización exacta, ¡mándanos los detalles por WhatsApp o llena el formulario de la página!",
      "No tenemos precios fijos porque cada trabajo es diferente 🎯. Cuéntanos qué necesitas y te damos una cotización rápida y justa.",
      "Los precios son accesibles para estudiantes y dependen de la complejidad del trabajo. ¡Pide tu cotización sin compromiso! 💬"
    ],
    showWA: true
  },
  {
    keys: ["tarea","tareas","ejercicio","ejercicios","actividad","actividades","trabajo escolar","deber","deberes"],
    answers: [
      "Hacemos tareas de todas las materias 📚 con calidad profesional, citaciones correctas y entrega puntual. ¿De qué materia necesitas ayuda?",
      "¡Claro que sí! Realizamos tareas universitarias y de preparatoria en cualquier materia. Mándanos los detalles y te cotizamos rápido 🚀"
    ]
  },
  {
    keys: ["examen","exámenes","quiz","quizzes","prueba","pruebas","test","parcial","final","evaluacion","evaluación"],
    answers: [
      "Resolvemos exámenes y quizzes con altos porcentajes de acierto 📝✅. ¿Cuándo es tu examen? Cuéntanos más.",
      "¡Sí! Apoyamos con exámenes, parciales y finales. Tenemos especialistas en distintas áreas para garantizar buenos resultados. 💪"
    ]
  },
  {
    keys: ["proyecto","proyectos","investigación","investigacion","reporte","reportes","ensayo","ensayos","tesis","informe"],
    answers: [
      "Desarrollamos proyectos académicos completos 📊 — bien estructurados, con sus referencias y listos para presentar.",
      "Desde proyectos de investigación hasta tesis, ¡te ayudamos en todo! Nuestro equipo entrega trabajos de calidad profesional. 🎓"
    ]
  },
  {
    keys: ["clase","clases","asesoría","asesoria","asesorías","asesorias","tutoría","tutoria","clase online","clases online","asesor"],
    answers: [
      "¡Sí ofrecemos clases y asesorías en línea! 💻 Personalizadas según tu materia y ritmo de aprendizaje.",
      "Tenemos asesorías en vivo para dominar cualquier materia. ¿En qué tema necesitas refuerzo? 📖"
    ]
  },
  {
    keys: ["materia","materias","área","area","qué hacen","que hacen","que ofrecen","qué ofrecen","servicios","servicio"],
    answers: [
      "Cubrimos una gran variedad de materias 🎓:\n\n📚 Finanzas, Negocios, Administración\n🔬 Cálculo, Física, Química, Ingeniería\n🧠 Psicología, Desarrollo Humano\n💻 Programación, Bases de Datos, Sistemas\n📖 Historia, Español, Inglés, Francés\n\n¿En cuál necesitas ayuda?",
    ]
  },
  {
    keys: ["quién","quien","equipo","integrantes","especialista","especialistas","asesores","roberto","alejandro","alberto"],
    answers: [
      "Nuestro equipo son 4 especialistas reales 👥:\n\n🟣 **Alejandro** — Finanzas, Negocios, Idiomas\n🔵 **Alberto** — Cálculo, Física, Química, Ing.\n🟢 **Especialista** — Psicología, Ensayos, Tesis\n🟡 **Roberto** — Programación, Sistemas, BD\n\nCada tarea va al experto adecuado para tu materia."
    ]
  },
  {
    keys: ["confiable","confiar","seguro","segura","garantía","garantia","confidencial","privado","privacidad","discreción","discrecion"],
    answers: [
      "¡Absolutamente! 🔒 Tu información es 100% confidencial. Nunca compartimos datos de nuestros alumnos con nadie.",
      "Llevamos más de 200 alumnos satisfechos con calificación promedio de ⭐⭐⭐⭐⭐. Tu privacidad y confianza son nuestra prioridad."
    ]
  },
  {
    keys: ["tiempo","plazo","cuándo","cuando","rápido","rapido","urgente","urgencia","inmediato","hoy","mañana","fecha"],
    answers: [
      "⚡ Respondemos cotizaciones en minutos. Los plazos de entrega dependen del trabajo, pero siempre cumplimos lo acordado.",
      "Si es urgente, ¡dinos! Tenemos capacidad para trabajos de entrega rápida. Escríbenos por WhatsApp para acordar tiempos. 🚀"
    ],
    showWA: true
  },
  {
    keys: ["cómo funciona","como funciona","proceso","pasos","qué hago","que hago","cómo empiezo","como empiezo","empezar"],
    answers: [
      "El proceso es muy simple ✅:\n\n1️⃣ Nos cuentas qué necesitas\n2️⃣ Te enviamos cotización en minutos\n3️⃣ Confirmas y acordamos detalles\n4️⃣ Entregamos en el tiempo acordado\n\n¡Así de fácil! ¿Empezamos?",
    ],
    showWA: true
  },
  {
    keys: ["pago","pagar","transferencia","paypal","efectivo","depósito","deposito","tarjeta","forma de pago","métodos de pago","metodos"],
    answers: [
      "Aceptamos varias formas de pago 💳 — transferencia, depósito, efectivo y más. Te lo confirmamos al momento de cotizar.",
      "Los métodos de pago los coordinamos directamente por WhatsApp al momento de agendar tu servicio. 📲"
    ],
    showWA: true
  },
  {
    keys: ["contacto","contactar","whatsapp","wa","número","numero","teléfono","telefono","hablar","escribir","mensaje"],
    answers: [
      "¡Escríbenos por WhatsApp y te respondemos al instante! 📲 Haz clic en el botón de abajo 👇",
    ],
    showWA: true
  },
  {
    keys: ["gracias","muchas gracias","thank you","thanks","perfecto","excelente","genial","súper","super","ok","okay","entendido","listo"],
    answers: [
      "¡De nada! 😊 Si tienes más dudas, aquí estoy.",
      "¡Con gusto! 🙌 ¿Necesitas algo más?",
      "¡Para eso estamos! No dudes en preguntar lo que necesites. ✨"
    ]
  },
  {
    keys: ["adios","adiós","bye","hasta luego","chao","chau","nos vemos","hasta pronto"],
    answers: [
      "¡Hasta luego! 👋 Cuando necesites ayuda académica, aquí estamos.",
      "¡Que te vaya bien! 🎓 Recuerda que en ProTareas siempre estamos disponibles."
    ]
  }
];

/* Respuesta por defecto */
const DEFAULT_ANSWERS = [
  "Hmm, no estoy seguro de entender tu pregunta 🤔. ¿Puedes ser más específico? Puedo ayudarte con precios, materias, el equipo o cómo funciona el servicio.",
  "No tengo esa información exacta, pero puedes preguntarle directamente a nuestro equipo por WhatsApp 📲. ¡Responden muy rápido!",
  "Esa pregunta es mejor resolverla con nuestro equipo directamente 💬. ¿Te conecto con WhatsApp?"
];

/* ════════════════════════════════════════
   LÓGICA DE MATCHING
════════════════════════════════════════ */
function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function getBestMatch(input) {
  const norm = normalize(input);
  const words = norm.split(/\s+/).filter(w => w.length > 2);

  let bestScore = 0;
  let bestEntry = null;

  for (const entry of KB) {
    let score = 0;
    for (const key of entry.keys) {
      const normKey = normalize(key);
      // Coincidencia exacta de frase
      if (norm.includes(normKey)) score += normKey.split(' ').length * 2;
      // Coincidencia de palabras individuales
      for (const w of words) {
        if (normKey.includes(w) && w.length > 3) score += 1;
      }
    }
    if (score > bestScore) { bestScore = score; bestEntry = entry; }
  }

  return bestScore >= 1 ? bestEntry : null;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getResponse(input) {
  const match = getBestMatch(input);
  if (match) {
    return { text: pickRandom(match.answers), showWA: !!match.showWA };
  }
  return { text: pickRandom(DEFAULT_ANSWERS), showWA: true };
}

/* ════════════════════════════════════════
   DOM & UI
════════════════════════════════════════ */
const bubble    = document.getElementById('chatBubble');
const chatbox   = document.getElementById('chatbox');
const messages  = document.getElementById('chatMessages');
const inputEl   = document.getElementById('chatInput');
const sendBtn   = document.getElementById('chatSend');
const closeBtn  = document.getElementById('chatboxClose');
const notif     = bubble?.querySelector('.chat-notif');
const openIcon  = bubble?.querySelector('.open-icon');
const closeIcon = bubble?.querySelector('.close-icon');

if (!bubble || !chatbox) { console.warn('Chatbot: elementos no encontrados'); }

function toggleChat(open) {
  chatbox.classList.toggle('open', open);
  if (notif)     notif.style.display    = open ? 'none' : '';
  if (openIcon)  openIcon.style.display  = open ? 'none' : '';
  if (closeIcon) closeIcon.style.display = open ? '' : 'none';
  if (open) { inputEl?.focus(); scrollBottom(); }
}

bubble?.addEventListener('click', () => toggleChat(!chatbox.classList.contains('open')));
closeBtn?.addEventListener('click', () => toggleChat(false));

/* Quick replies */
document.getElementById('quickReplies')?.querySelectorAll('.qr-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('quickReplies').style.display = 'none';
    handleUserMsg(btn.dataset.msg);
  });
});

sendBtn?.addEventListener('click', handleSend);
inputEl?.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
});

function handleSend() {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = '';
  document.getElementById('quickReplies').style.display = 'none';
  handleUserMsg(text);
}

function handleUserMsg(text) {
  addMsg('user', text);

  // Simular que está escribiendo (400-900ms)
  const delay = 400 + Math.random() * 500;
  const typing = addTyping();

  setTimeout(() => {
    typing.remove();
    const { text: reply, showWA } = getResponse(text);
    addMsg('bot', reply);
    if (showWA) addWAButton();
  }, delay);
}

/* ── Helpers UI ── */
function addMsg(role, text) {
  const wrap = document.createElement('div');
  wrap.className = `msg ${role}`;

  const bbl = document.createElement('div');
  bbl.className = 'msg-bubble';
  bbl.innerHTML = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  const time = document.createElement('div');
  time.className = 'msg-time';
  time.textContent = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });

  wrap.appendChild(bbl);
  wrap.appendChild(time);
  messages.appendChild(wrap);
  scrollBottom();
  return wrap;
}

function addTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.innerHTML = `<div class="msg-bubble typing-bubble"><span></span><span></span><span></span></div>`;
  messages.appendChild(wrap);
  scrollBottom();
  return wrap;
}

function addWAButton() {
  if (messages.querySelector('.wa-cta-btn')) return;
  const btn = document.createElement('a');
  btn.className = 'wa-cta-btn';
  btn.href = `https://wa.me/${WA_CHAT}?text=${encodeURIComponent('¡Hola! Vengo desde la web de ProTareas y quiero cotizar un servicio 🎓')}`;
  btn.target = '_blank';
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg> Cotizar por WhatsApp`;
  messages.appendChild(btn);
  scrollBottom();
}

function scrollBottom() {
  setTimeout(() => { messages.scrollTop = messages.scrollHeight; }, 60);
}
