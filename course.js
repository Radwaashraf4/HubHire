// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Reviews Slider =====
const track = document.getElementById('reviewsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

let currentIndex = 0;
let cardsPerView = 3;
let totalCards = document.querySelectorAll('.review-card').length;

// Calculate cards per view based on screen width
function getCardsPerView() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

cardsPerView = getCardsPerView();

// Create dots
function createDots() {
  const totalDots = Math.ceil(totalCards / cardsPerView);
  dotsContainer.innerHTML = '';
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Update dots
function updateDots() {
  const dots = document.querySelectorAll('.dot');
  const totalDots = Math.ceil(totalCards / cardsPerView);
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

// Go to slide
function goToSlide(index) {
  const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  const cardWidth = document.querySelector('.review-card').offsetWidth + 30;
  track.style.transform = `translateX(-${currentIndex * (cardWidth * cardsPerView)}px)`;
  updateDots();
}

// Next slide
function nextSlide() {
  const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
  if (currentIndex < maxIndex) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(0);
  }
}

// Previous slide
function prevSlide() {
  if (currentIndex > 0) {
    goToSlide(currentIndex - 1);
  } else {
    const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;
    goToSlide(maxIndex);
  }
}

// Event listeners
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Auto-slide
let autoSlide = setInterval(nextSlide, 5000);

// Pause on hover
const slider = document.querySelector('.reviews-slider');
if (slider) {
  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
  });
}

// Touch drag functionality
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  track.classList.add('active');
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  clearInterval(autoSlide);
});

track.addEventListener('mouseleave', () => {
  isDown = false;
  track.classList.remove('active');
  autoSlide = setInterval(nextSlide, 5000);
});

track.addEventListener('mouseup', () => {
  isDown = false;
  track.classList.remove('active');
  autoSlide = setInterval(nextSlide, 5000);
});

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

// Touch events
track.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  clearInterval(autoSlide);
});

track.addEventListener('touchend', () => {
  isDown = false;
  autoSlide = setInterval(nextSlide, 5000);
});

track.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

// ===== Initialize =====
window.addEventListener('load', () => {
  cardsPerView = getCardsPerView();
  createDots();
  goToSlide(0);
});

window.addEventListener('resize', () => {
  cardsPerView = getCardsPerView();
  createDots();
  goToSlide(0);
});

// ===== Scroll Animations =====
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
};

animateOnScroll();

// ===== Newsletter Form =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
      alert(`Thank you for subscribing with ${email}! You'll receive course updates soon.`);
      this.querySelector('input[type="email"]').value = '';
    }
  });
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('📚 HubHire Course Page Loaded Successfully!');