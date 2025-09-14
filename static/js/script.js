const imgintro = document.querySelector('.imgintro');
if (!imgintro) throw new Error('.imgintro no encontrado en el DOM');

// parámetros para tilt
const maxTilt = 10;
const lerp = 0.12;
const baseScale = 0.72;

// estados tilt
let targetRX = 0, targetRY = 0;
let currentRX = 0, currentRY = 0;

// estados máscara (inician en centro)
let targetMX = 50, targetMY = 50;
let currentMX = 50, currentMY = 50;

// --- efecto inclinación (solo dentro del div) ---
imgintro.addEventListener('mousemove', (e) => {
  const rect = imgintro.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const px = (x / rect.width - 0.5) * 2;
  const py = (y / rect.height - 0.5) * 2;

  targetRY = px * maxTilt;
  targetRX = -py * maxTilt;
});

imgintro.addEventListener('mouseleave', () => {
  targetRX = 0;
  targetRY = 0;
});

// --- efecto máscara (siempre sigue el mouse en el documento) ---
document.addEventListener('mousemove', (e) => {
  targetMX = (e.clientX / window.innerWidth) * 100;
  targetMY = (e.clientY / window.innerHeight) * 100;
});

// --- animación única ---
function animate() {
  // tilt (suavizado)
  currentRX += (targetRX - currentRX) * lerp;
  currentRY += (targetRY - currentRY) * lerp;

  // máscara (suavizado)
  currentMX += (targetMX - currentMX) * lerp;
  currentMY += (targetMY - currentMY) * lerp;

  // aplicar transform de inclinación
  imgintro.style.transform =
    `perspective(700px) rotateX(${currentRX.toFixed(2)}deg) rotateY(${currentRY.toFixed(2)}deg) scale(${baseScale})`;

  // aplicar variables de máscara
  imgintro.style.setProperty('--x', currentMX + '%');
  imgintro.style.setProperty('--y', currentMY + '%');

  requestAnimationFrame(animate);
}
animate();
