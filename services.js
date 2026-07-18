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

// ===== Number Animation =====
const animateNumbers = () => {
  const numbers = document.querySelectorAll('.stat-number');
  
  numbers.forEach(number => {
    const target = parseInt(number.dataset.target);
    let current = 0;
    const increment = Math.ceil(target / 60);
    const suffix = target >= 1000 ? '+' : '%