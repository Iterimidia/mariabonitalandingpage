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

const heroEl = document.querySelector<HTMLElement>("#inicio");
const footerEl = document.querySelector<HTMLElement>("#contato");
const mobileCtaBar = document.querySelector<HTMLElement>("#mobile-cta-bar");

if (heroEl && footerEl && mobileCtaBar) {
  let pastHero = false;
  let inFooter = false;

  const updateBarVisibility = () => {
    mobileCtaBar.classList.toggle("is-visible", pastHero && !inFooter);
  };

  const heroObserver = new IntersectionObserver(
    ([entry]) => {
      pastHero = !entry.isIntersecting;
      updateBarVisibility();
    },
    { threshold: 0 },
  );
  heroObserver.observe(heroEl);

  const footerObserver = new IntersectionObserver(
    ([entry]) => {
      inFooter = entry.isIntersecting;
      updateBarVisibility();
    },
    { threshold: 0.1 },
  );
  footerObserver.observe(footerEl);
}

const ourSpaceSection = document.querySelector<HTMLElement>("#nosso-espaco");
const ourSpaceVideo = document.querySelector<HTMLVideoElement>(".our-space-video");

if (ourSpaceSection && ourSpaceVideo) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const videoObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        const pendingSources = ourSpaceVideo.querySelectorAll<HTMLSourceElement>(
          "source[data-src]",
        );
        if (pendingSources.length > 0) {
          pendingSources.forEach((source) => {
            source.src = source.dataset.src ?? "";
            source.removeAttribute("data-src");
          });
          ourSpaceVideo.load();
        }
        if (!prefersReducedMotion) {
          ourSpaceVideo.play().catch(() => {});
        }
      } else if (ourSpaceVideo.currentSrc) {
        ourSpaceVideo.pause();
      }
    },
    { threshold: 0.5 },
  );
  videoObserver.observe(ourSpaceSection);
}
