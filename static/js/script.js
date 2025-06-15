document.addEventListener("mousemove", function(e) {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  const angle = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI);
  document.body.style.setProperty('--angle', `${angle}deg`);
});