document.addEventListener('DOMContentLoaded', function () {
    const roles = ['Engineer', 'Analyst']; // Only animate the varying part
    const animatedRole = document.getElementById('animatedRole');
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeRole() {
        const currentRole = roles[currentRoleIndex];
        
        if (!isDeleting && currentCharIndex <= currentRole.length) {
            // Typing
            animatedRole.textContent = "Data " + currentRole.substring(0, currentCharIndex);
            currentCharIndex++;
            
            if (currentCharIndex > currentRole.length) {
                // Finished typing, pause before deleting
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    typeRole();
                }, 3000); // pause 3s to read
                return;
            }
        } else if (isDeleting && currentCharIndex >= 0) {
            // Deleting
            animatedRole.textContent = "Data " + currentRole.substring(0, currentCharIndex);
            currentCharIndex--;
            
            if (currentCharIndex < 0) {
                // Finished deleting, move to next role
                isDeleting = false;
                currentRoleIndex = (currentRoleIndex + 1) % roles.length;
                currentCharIndex = 0;
                setTimeout(() => {
                    typeRole();
                }, 800); // pause before next role
                return;
            }
        }
        
        if (!isPaused) {
            const speed = isDeleting ? 75 : 120;
            setTimeout(typeRole, speed);
        }
    }

    // Start the animation after a brief delay
    setTimeout(() => {
        typeRole();
    }, 1000);
});

// Education Expansion
function toggleEducation(educationId) {
    const coursework = document.getElementById(educationId + '-coursework');
    const icon = document.getElementById(educationId + '-icon');
    
    if (coursework.classList.contains('expanded')) {
        coursework.classList.remove('expanded');
        icon.textContent = '+';
        icon.classList.remove('rotated');
    } else {
        coursework.classList.add('expanded');
        icon.textContent = '×';
        icon.classList.add('rotated');
    }
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .experience-item, .education-item, .project-card, .skill-item, .cert-item').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations
observeElements();

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .section, .experience-item, .education-item, .project-card, .skill-item, .cert-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    /* Staggered animation for grids */
    .projects-grid .project-card,
    .skills-grid .skill-item,
    .certifications-grid .cert-item {
        transition-delay: calc(var(--index, 0) * 0.1s);
    }
`;
document.head.appendChild(style);

// Add index to grid items for staggered animation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.projects-grid .project-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
    });
    
    document.querySelectorAll('.skills-grid .skill-item').forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
    
    document.querySelectorAll('.certifications-grid .cert-item').forEach((item, index) => {
        item.style.setProperty('--index', index);
    });
});

// Add loading animation for profile image
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial styles
        profileImg.style.opacity = '0';
        profileImg.style.transform = 'scale(0.9)';
        profileImg.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
});

// Add hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 255, 136, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = 'none';
        });
    });
});

// Add click analytics (optional)
function trackClick(element, action) {
    // Add your analytics tracking here
    console.log(`Clicked: ${element} - ${action}`);
}

// Track button clicks
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn, .social-link, .project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const action = this.textContent.trim() || this.getAttribute('href') || 'Unknown';
            trackClick(this.className, action);
        });
    });
});

// Add keyboard navigation for education items
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('education-item')) {
            e.preventDefault();
            focusedElement.click();
        }
    }
});

// Make education items focusable
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.education-item').forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when toggled
        item.addEventListener('click', function() {
            const isExpanded = this.querySelector('.coursework').classList.contains('expanded');
            this.setAttribute('aria-expanded', isExpanded);
        });
    });
});

// Add smooth reveal animation for skills categories
document.addEventListener('DOMContentLoaded', function() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    skillCategories.forEach(category => {
        categoryObserver.observe(category);
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add scroll progress indicator (optional)
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #00ff88, #00e07a);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    const updateProgress = debounce(() => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, 10);
    
    window.addEventListener('scroll', updateProgress);
});