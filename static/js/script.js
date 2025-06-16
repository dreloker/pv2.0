const circulos = document.querySelectorAll('.circulo');

circulos.forEach((circulo, index) => {
  let angle = 0;
  let animationFrameId = null;

  const velocidades = [15, 12, 9, 6, 3];
  const velocidad = velocidades[index] || 2;

  function rotate() {
    angle = (angle + velocidad) % 360;
    circulo.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    animationFrameId = requestAnimationFrame(rotate);
  }

  circulo.addEventListener('mouseenter', () => {
    if (animationFrameId === null) {
      rotate();
    }
  });

  circulo.addEventListener('mouseleave', () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  });
});