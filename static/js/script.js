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




const imagenes = [
  "ameliasintro.png",
  "artistry-intro.png",
  "digital-intro.png",
  "g7-introx-intro.png",
  "jerarquia-intro.png",
  "manualdemarca-intro.png",
  "muuble-intro.png",
  "Powerflux-intro.png",
  "synoptics-intro.png",
  "tradicional-intro.png",
  "tradicional2-intro.png",
  "vastgoed-intro.png",
  "vector-intro.png",
];

const historialReciente = []; // imágenes mostradas recientemente
const maxHistorial = 3;       // no repetir las últimas 3 imágenes

function obtenerImagenAleatoria(excluir = []) {
  const noUsables = [...historialReciente, ...excluir];
  const disponibles = imagenes.filter(img => !noUsables.includes(img));
  
  if (disponibles.length === 0) {
    // Si se acabaron las opciones, liberar las más antiguas
    historialReciente.splice(0, 1);
    return obtenerImagenAleatoria(excluir);
  }

  const seleccion = disponibles[Math.floor(Math.random() * disponibles.length)];
  historialReciente.push(seleccion);

  // mantener tamaño del historial
  if (historialReciente.length > maxHistorial) {
    historialReciente.shift();
  }

  return seleccion;
}

function crearSliderInicial(slider, clase) {
  const img = obtenerImagenAleatoria();
  slider.innerHTML = `<img class="arriba" src="/static/img/${img}" alt="${clase} inicial">`;
  slider.style.transform = "translateY(0%)";
}

function iniciarCarrusel(slider, clase) {
  setInterval(() => {
    const imgArriba = slider.querySelector(".arriba");
    const nombreActual = imgArriba.getAttribute("src").split("/").pop();
    const nuevaImg = obtenerImagenAleatoria([nombreActual]);

    const imgNueva = document.createElement("img");
    imgNueva.src = `/static/img/${nuevaImg}`;
    imgNueva.alt = `Nueva ${clase}`;
    imgNueva.classList.add("abajo");

    slider.appendChild(imgNueva);
    slider.style.transition = "transform 1s ease-in-out";
    slider.style.transform = "translateY(-50%)";

    setTimeout(() => {
      const antiguaArriba = slider.querySelector(".arriba");
      if (antiguaArriba) antiguaArriba.remove();
      imgNueva.classList.remove("abajo");
      imgNueva.classList.add("arriba");

      slider.style.transition = "none";
      slider.style.transform = "translateY(0%)";
    }, 1000);
  }, 6000);
}

const izqSlider = document.querySelector(".img-slider.izq");
const derSlider = document.querySelector(".img-slider.der");

crearSliderInicial(izqSlider, "izq");
crearSliderInicial(derSlider, "der");

iniciarCarrusel(izqSlider, "izq");
setTimeout(() => iniciarCarrusel(derSlider, "der"), 2000); // desfase