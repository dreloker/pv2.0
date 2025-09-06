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


  //brillo carta
  
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.ventanaimgcard');
  const maxDeg = 14;

  cards.forEach(card => {
    let raf = null, targetRx = 0, targetRy = 0, curRx = 0, curRy = 0;

    function animate() {
      curRx += (targetRx - curRx) * 0.12;
      curRy += (targetRy - curRy) * 0.12;
      card.style.transform = `rotateX(${curRx}deg) rotateY(${curRy}deg)`;
      if (Math.abs(curRx - targetRx) > 0.01 || Math.abs(curRy - targetRy) > 0.01) {
        raf = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(raf); raf = null;
      }
    }

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width) - 0.5;
      const py = (y / r.height) - 0.5;
      targetRy = px * (maxDeg * 2);
      targetRx = -py * (maxDeg * 2);

      card.style.setProperty('--gx', `${(x / r.width) * 100}%`);
      card.style.setProperty('--gy', `${(y / r.height) * 100}%`);

      if (!raf) raf = requestAnimationFrame(animate);
    });

    card.addEventListener('mouseleave', () => {
      targetRx = 0; targetRy = 0;
      if (!raf) raf = requestAnimationFrame(animate);
    });
  });
});
