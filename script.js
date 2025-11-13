document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("transition-video");

  document.querySelectorAll("a.nav-link, a.dropdown-item").forEach(link => {
    link.addEventListener("click", e => {
      if (link.hasAttribute("data-bs-toggle")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      e.preventDefault();

      video.currentTime = 0;
      video.style.opacity = 1;
      video.play();

      video.onended = () => {
        window.location.href = href;
      };
    });
  });
});

document.querySelector(".logo")?.addEventListener("click", e => {
  e.preventDefault();
  const video = document.getElementById("transition-video");
  video.currentTime = 0;
  video.style.opacity = 1;
  video.play();
  video.onended = () => {
    window.location.href = "index.html";
  };
});