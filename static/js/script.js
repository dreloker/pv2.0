const imgintro = document.querySelector('.imgintro');

// posición actual de la máscara
let currentX = 100, currentY = 100;
// posición objetivo (cursor real)
let targetX = 50, targetY = 50;
// factor de suavizado (0.05 = muy lento, 0.2 = más rápido)
const lerpFactor = 0.03;

// actualizar posición objetivo en cada movimiento del mouse
document.addEventListener('mousemove', e => {
  targetX = (e.clientX / window.innerWidth) * 100;
  targetY = (e.clientY / window.innerHeight) * 100;
});

// animación continua
function animate() {
  // interpolación lineal hacia la posición objetivo
  currentX += (targetX - currentX) * lerpFactor;
  currentY += (targetY - currentY) * lerpFactor;

  // actualizar variables CSS
  imgintro.style.setProperty('--x', currentX + '%');
  imgintro.style.setProperty('--y', currentY + '%');

  requestAnimationFrame(animate);
}
animate();