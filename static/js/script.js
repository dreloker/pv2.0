let currentSection = 0; // 0: intro-index, 1: intro-port
let isScrolling = false;

// Función de parallax centralizada
function applyParallax(scrollY) {
  document.querySelectorAll("[data-speed]").forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    el.style.transform = `translateY(${scrollY * -speed}px)`;
  });
}

// Función personalizada de scroll animado
function scrollToElement(targetSelector, duration = 5000) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);

    window.scrollTo(0, run); // mueve la ventana
    applyParallax(run);      // sincroniza el parallax con el scroll animado

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      applyParallax(targetPosition); // asegura posición final
    }
  }

  function ease(t, b, c, d) {
    // easeInOutCubic
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }

  requestAnimationFrame(animation);
}

// Escucha scroll normal (barra, teclas, táctil) y aplica parallax
document.addEventListener("scroll", () => {
  applyParallax(window.scrollY);
});

// Evento de scroll con bloqueo (solo entre las 2 secciones)
window.addEventListener("wheel", function (e) {
  if (isScrolling) return;
  isScrolling = true;

  if (e.deltaY > 0 && currentSection === 0) {
    scrollToElement(".intro-port", 1500);
    currentSection = 1;
  } else if (e.deltaY < 0 && currentSection === 1) {
    scrollToElement(".intro-index", 1500);
    currentSection = 0;
  }

  // Bloqueo temporal para evitar disparos múltiples
  setTimeout(() => {
    isScrolling = false;
  }, 1600);
});
