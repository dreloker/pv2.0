  // efecto al cargar pag  
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });


 // salto "servicios" 
  document.querySelector(".ctaservicios").addEventListener("click", () => {
    document.querySelector(".intro-port").scrollIntoView({ behavior: "smooth" });
  });

   // salto "index" 
  document.querySelector(".saltoindex").addEventListener("click", () => {
    document.querySelector(".intro-index").scrollIntoView({ behavior: "smooth" });
  });


    document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".isologoheader svg");
    const saltoindex = document.querySelector(".saltoindex");
    const introPort = document.querySelector(".intro-port");

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            logo.style.opacity = "1";
            saltoindex.style.opacity = "1";
          } else {
            logo.style.opacity = "0";
            saltoindex.style.opacity = "0";
          }
        });
      },
      {
        threshold: 0.5 // cambia según cuánta parte de .intro-port debe estar visible
      }
    );

    if (introPort) {
      observer.observe(introPort);
    }
  });