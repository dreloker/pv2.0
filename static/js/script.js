let currentAngle = -45;
let targetAngle = -45;

document.addEventListener("mousemove", function(e) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  targetAngle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
});

function animate() {
  // Lerp: suaviza la transición entre currentAngle y targetAngle
  currentAngle += (targetAngle - currentAngle) * 0.03;

  // Aplica el valor interpolado como variable CSS
  document.querySelector('main').style.setProperty('--angle', `${currentAngle}deg`);

  requestAnimationFrame(animate);
}

animate(); // Inicia el loop de animación