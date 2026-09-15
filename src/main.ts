const navToggle = document.querySelector<HTMLButtonElement>("#nav-toggle");
const mainNav = document.querySelector<HTMLElement>("#main-nav");

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const yearEl = document.querySelector<HTMLSpanElement>("#year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Links marked with `data-placeholder-link` (WhatsApp, Instagram, Google
// reviews) still need real contact data from the client before launch.
document
  .querySelectorAll<HTMLAnchorElement>("[data-placeholder-link]")
  .forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      console.warn(
        `Link "${link.dataset.placeholderLink}" ainda não foi configurado com o dado real do cliente.`,
      );
    });
  });
