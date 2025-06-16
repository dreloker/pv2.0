document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  document.querySelectorAll("[data-speed]").forEach(el => {
    const speed = parseFloat(el.dataset.speed);
    el.style.transform = `translateY(${scrollY * -speed}px)`;
  });
});