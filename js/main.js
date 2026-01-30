const carousels = document.querySelectorAll(".carousel");
let index = 0;
const total = carousels[0].querySelectorAll(".item").length;

setInterval(() => {
    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll(".item");
        items[index].classList.remove("active");
    });

    index = (index + 1) % total;

    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll(".item");
        items[index].classList.add("active");
    });

}, 2500);



window.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".testimonials-track");
    if (!track) return;

    let cards = Array.from(track.children);
    const gap = 30; // debe coincidir con el CSS
    const cloneCount = 3;

    // Clonar las primeras tarjetas
    for (let i = 0; i < cloneCount; i++) {
        track.appendChild(cards[i].cloneNode(true));
    }

    cards = Array.from(track.children);

    let index = 0;

    setInterval(() => {
        const cardWidth = cards[0].offsetWidth + gap;
        index++;

        track.style.transition = "transform 0.8s cubic-bezier(.4,0,.2,1)";
        track.style.transform = `translateX(-${index * cardWidth}px)`;

        // Reinicio invisible
        if (index >= cards.length - cloneCount) {
            setTimeout(() => {
                track.style.transition = "none";
                index = 0;
                track.style.transform = "translateX(0px)";
            }, 850);
        }

    }, 4000);

});


const form = document.querySelector(".contact-form");

const formObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            form.style.opacity = 1;
            form.style.transform = "translateY(0)";
        }
    });
},{ threshold:0.3 });

formObserver.observe(form);
