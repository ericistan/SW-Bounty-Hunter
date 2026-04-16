// ── Carousel ───────────────────────────────────────────────
const carouselTrack = document.querySelector(".carousel-track");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const carouselIndicator = document.querySelector(".carousel-indicator");
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let currentSlide = 0;

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  carouselIndicator.textContent = `${currentSlide + 1} / ${totalSlides}`;
}

carouselPrev.addEventListener("click", () => {
  currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
  updateCarousel();
});

carouselNext.addEventListener("click", () => {
  currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
  updateCarousel();
});
