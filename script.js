// Custom Cursor - Optimized
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const cursorDistX = mouseX - cursorX;
    const cursorDistY = mouseY - cursorY;
    
    cursorX += cursorDistX * 0.3;
    cursorY += cursorDistY * 0.3;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    const followerDistX = mouseX - followerX;
    const followerDistY = mouseY - followerY;
    
    followerX += followerDistX * 0.15;
    followerY += followerDistY * 0.15;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

const interactiveElements = document.querySelectorAll('a, button, .service-card, .review-card, .contact-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

if (window.matchMedia("(max-width: 768px)").matches) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Drag-to-scroll for reviews
const reviewsContainer = document.querySelector('.reviews-container');
let isDown = false;
let startX;
let scrollLeft;

reviewsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    reviewsContainer.style.cursor = 'grabbing';
    startX = e.pageX - reviewsContainer.offsetLeft;
    scrollLeft = reviewsContainer.scrollLeft;
});

reviewsContainer.addEventListener('mouseleave', () => {
    isDown = false;
    reviewsContainer.style.cursor = 'grab';
});

reviewsContainer.addEventListener('mouseup', () => {
    isDown = false;
    reviewsContainer.style.cursor = 'grab';
});

reviewsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - reviewsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    reviewsContainer.scrollLeft = scrollLeft - walk;
});
