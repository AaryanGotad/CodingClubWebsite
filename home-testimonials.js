document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSection = document.querySelector('#section-content'); // Target the testimonials paragraph
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

    if (testimonials.length > 0) {
        const recentTestimonials = testimonials.slice(0, 1); // Get 3 most recent
        let testimonialsHTML = '';

        recentTestimonials.forEach(testimonial => {
            testimonialsHTML += `
                <div class="testimonial-card">
                    <p>"${testimonial.message}"</p>
                    <div class="stars">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</div>
                    <p><strong>— ${testimonial.name}, ${testimonial.role}</strong></p>
                </div>
                <a href="testimonials.html" target="_blank" style="color: #a9cce3; font-size: 15pt; font-style: normal; font-weight: light;">View All</a>
            `;
        });

        testimonialsSection.innerHTML = testimonialsHTML;
    } else {
        testimonialsSection.innerHTML = '<p>No testimonials yet. Be the first to share!</p>';
    }
});