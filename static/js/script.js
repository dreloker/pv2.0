  // efecto al cargar pag  
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });


 // salto "servicios" 
  document.querySelector(".ctaservicios").addEventListener("click", () => {
    document.querySelector(".intro-port").scrollIntoView({ behavior: "smooth" });
  });

  