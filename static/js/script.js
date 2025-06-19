  // efecto al cargar pag  
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });


 // salto "servicios" 
  document.querySelector(".saltoservicios").addEventListener("click", () => {
    document.querySelector(".intro-port").scrollIntoView({ behavior: "smooth" });
  });

  