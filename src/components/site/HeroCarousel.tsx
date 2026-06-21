import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const SLIDE_INTERVAL_MS = 5_000;
const TRIAL_URL = "https://cerneops.com.br/planos/trial#trial-signup-modal";

const slides = [
  { src: "/site-hero/Hero5.jpg", alt: "Teste o Core CerneOps no plano Trial" },
  { src: "/site-hero/Hero1.jpg", alt: "CerneOps Core para operacoes com agentes de IA" },
  { src: "/site-hero/Hero2.jpg", alt: "Automacao operacional CerneOps para empresas" },
  { src: "/site-hero/Hero3.jpg", alt: "Agentes de IA CerneOps para organizar processos" },
  { src: "/site-hero/Hero4.jpg", alt: "Plataforma CerneOps para gestao inteligente" },
];

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [manualStep, setManualStep] = useState(0);

  const slideCount = slides.length;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setIsReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || isReducedMotion || slideCount <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused, isReducedMotion, manualStep, slideCount]);

  useEffect(() => {
    const nextSlide = slides[(activeIndex + 1) % slideCount];
    const image = new Image();
    image.src = nextSlide.src;
  }, [activeIndex, slideCount]);

  function goToPrevious() {
    setActiveIndex((current) => (current - 1 + slideCount) % slideCount);
    setManualStep((current) => current + 1);
  }

  function goToNext() {
    setActiveIndex((current) => (current + 1) % slideCount);
    setManualStep((current) => current + 1);
  }

  function goToSlide(index: number) {
    setActiveIndex(index);
    setManualStep((current) => current + 1);
  }

  return (
    <section
      aria-label="Destaques CerneOps"
      className="relative overflow-hidden bg-hero pt-24 sm:pt-28 lg:pt-32 pb-8"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial-circuit)" }}
      />

      <div
        className="relative mx-auto max-w-7xl px-4 sm:px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface/40 shadow-2xl shadow-ember/10 backdrop-blur">
          <a
            href={TRIAL_URL}
            aria-label="Conhecer o Trial CerneOps"
            className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <div className="relative aspect-[16/9] w-full">
              <img
                key={activeSlide.src}
                src={activeSlide.src}
                alt={activeSlide.alt}
                loading="eager"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover ${
                  isReducedMotion ? "" : "animate-in fade-in duration-700"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-70" />
            </div>
          </a>

          <button
            type="button"
            aria-label="Imagem anterior"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition hover:border-ember hover:text-ember focus:outline-none focus-visible:ring-2 focus-visible:ring-ember sm:left-5"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Proxima imagem"
            onClick={goToNext}
            className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition hover:border-ember hover:text-ember focus:outline-none focus-visible:ring-2 focus-visible:ring-ember sm:right-5"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full border border-border bg-background/60 px-2 py-1 backdrop-blur">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`Ir para destaque ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => goToSlide(index)}
                className="flex h-7 w-7 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                <span
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-6 bg-ember"
                      : "w-2 bg-foreground/40 hover:bg-foreground/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
