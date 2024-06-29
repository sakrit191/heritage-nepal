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

// Package Modal Functionality
const packageModal = document.getElementById('package-modal');
const closeBtn = packageModal.querySelector('.close');
const packageTitle = document.getElementById('package-title');
const packageDescription = document.getElementById('package-description');
const pricingOptions = document.getElementById('pricing-options');

const packages = {
    ghandruk: {
        title: "Ghandruk Tour",
        description: "Explore the beautiful Ghandruk village, known for its stunning views of the Annapurna range and rich Gurung culture.",
        prices: [
            "3 Days, 2 Nights - $150",
            "4 Days, 3 Nights - $200",
            "5 Days, 4 Nights - $250"
        ]
    },
    'chitwan-lumbini': {
        title: "Chitwan-Lumbini Tour",
        description: "Experience the wildlife of Chitwan National Park and the serene pilgrimage site of Lumbini, the birthplace of Lord Buddha.",
        prices: [
            "4 Days, 3 Nights - $300",
            "5 Days, 4 Nights - $350",
            "6 Days, 5 Nights - $400"
        ]
    },
    'india-tour': {
        title: "India Tour: Punjab, Delhi, Rajasthan",
        description: "Discover the vibrant culture and historical landmarks of Punjab, Delhi, and Rajasthan on this comprehensive tour of India.",
        prices: [
            "7 Days, 6 Nights - $700",
            "10 Days, 9 Nights - $1000",
            "14 Days, 13 Nights - $1300"
        ]
    },
    'bombay-goa-chennai': {
        title: "Bombay-Goa-Chennai Tour",
        description: "Enjoy the bustling city life of Bombay, the beaches of Goa, and the cultural heritage of Chennai on this diverse tour.",
        prices: [
            "7 Days, 6 Nights - $600",
            "10 Days, 9 Nights - $850",
            "14 Days, 13 Nights - $1200"
        ]
    }
};

document.querySelectorAll('.package').forEach(packageEl => {
    packageEl.addEventListener('click', () => {
        const packageKey = packageEl.dataset.package;
        const packageData = packages[packageKey];

        packageTitle.textContent = packageData.title;
        packageDescription.textContent = packageData.description;
        pricingOptions.innerHTML = packageData.prices.map(price => `<li>${price}</li>`).join('');

        packageModal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    packageModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == packageModal) {
        packageModal.style.display = 'none';
    }
});
