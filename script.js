document.addEventListener('DOMContentLoaded', function() {
    // Sample testimonials data - you can replace this with real data
    const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [
        {
            name: "Alex Johnson",
            role: "Club Member",
            message: "The coding club helped me improve my skills tremendously. The workshops and hackathons are incredibly valuable!",
            rating: 5
        },
        {
            name: "Sarah Miller",
            role: "Web Developer",
            message: "As a mentor, I've seen so many students grow through this club. It's a wonderful community for learning.",
            rating: 4
        },
        {
            name: "Raj Patel",
            role: "Alumni",
            message: "The connections I made in the coding club helped me land my first job in tech. Highly recommend joining!",
            rating: 5
        }
    ];

    function saveTestimonials() {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }

    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialForm = document.getElementById('testimonial-form');
    const stars = document.querySelectorAll('.stars i');
    const ratingInput = document.getElementById('rating');

    // Display testimonials
    function displayTestimonials() {
        testimonialsContainer.innerHTML = '';
        
        testimonials.forEach(testimonial => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            
            let starsHtml = '';
            for (let i = 0; i < 5; i++) {
                if (i < testimonial.rating) {
                    starsHtml += '<i class="fas fa-star"></i>';
                } else {
                    starsHtml += '<i class="far fa-star"></i>';
                }
            }
            
            testimonialCard.innerHTML = `
                <p class="testimonial-text">${testimonial.message}</p>
                <div class="stars">${starsHtml}</div>
                <div class="testimonial-author">
                    <div class="author-info">
                        <p class="author-name">${testimonial.name}</p>
                        <p class="author-role">${testimonial.role}</p>
                    </div>
                </div>
                
            `;
            
            testimonialsContainer.appendChild(testimonialCard);
        });
    }

    // Star rating functionality
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-rating')) <= rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });

    // Form submission
    testimonialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const role = document.getElementById('role').value || 'Club Member';
        const message = document.getElementById('message').value;
        const rating = parseInt(ratingInput.value) || 0;
        
        if (name && message) {
            testimonials.unshift({
                name,
                role,
                message,
                rating
            });
            
            saveTestimonials();
            console.log('Saved testimonials:', testimonials); // Debug line
            displayTestimonials();
            testimonialForm.reset();
            
            // Reset stars
            stars.forEach(star => {
                star.classList.remove('fas');
                star.classList.add('far');
            });
            ratingInput.value = 0;
            
            // In a real app, you would save to a database here
            alert('Thank you for your testimonial!');
        }
    });

    // Initial display
    displayTestimonials();

    testimonials.splice(0, 1);
});