// Date and Time Update
function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-GB', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric'
    });
    dateTimeElement.textContent = formattedDateTime;
}

setInterval(updateDateTime, 1000);
updateDateTime();

// Intersection Observer for animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3 // 30% of the element is visible
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            element.classList.add('animate__animated', 'animate__fadeIn');
            observer.unobserve(element); // Stop observing once the animation is triggered
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

const elementsToAnimate = document.querySelectorAll('.animate__animated');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});
