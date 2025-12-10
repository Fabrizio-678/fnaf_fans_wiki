document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("transition-video");

  function playTransitionAndGo(href) {
    video.currentTime = 0;
    video.style.opacity = 1;
    video.play();
    video.onended = () => {
      window.location.href = href;
    };
  }

  // Enlaces del nav y dropdown
  document.querySelectorAll("a.nav-link, a.dropdown-item").forEach(link => {
    link.addEventListener("click", e => {

      // Ignorar toggles de Bootstrap
      if (link.hasAttribute("data-bs-toggle")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      e.preventDefault();
      playTransitionAndGo(href);
    });
  });

  // Logo (asegurarse de capturar el <a>)
  const logoLink = document.querySelector(".logo a");
  if (logoLink) {
    logoLink.addEventListener("click", e => {
      e.preventDefault();
      playTransitionAndGo("index.html");
    });
  }

  // Enlaces nav_galeria
  document.querySelectorAll(".nav_galeria a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      e.preventDefault();
      playTransitionAndGo(href);
    });
  });
});