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
