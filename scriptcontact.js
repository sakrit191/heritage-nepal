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

// Membership Modal
const membershipModal = document.getElementById('membership-modal');
const membershipButton = document.getElementById('membership-button');
const closeMembership = membershipModal.querySelector('.close');

membershipButton.onclick = function() {
    membershipModal.style.display = 'flex';
}

closeMembership.onclick = function() {
    membershipModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == membershipModal) {
        membershipModal.style.display = 'none';
    }
}

// Message Modal
const messageModal = document.getElementById('message-modal');
const messageButton = document.getElementById('message-button');
const closeMessage = messageModal.querySelector('.close');

messageButton.onclick = function() {
    messageModal.style.display = 'flex';
}

closeMessage.onclick = function() {
    messageModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == messageModal) {
        messageModal.style.display = 'none';
    }
}

// Facebook Messenger Chat Plugin
window.fbAsyncInit = function() {
    FB.init({
        xfbml            : true,
        version          : 'v10.0'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Form Validation
const contactForm = document.getElementById('contact-form');
const sendButton = document.getElementById('send-button');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all the fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Add form submission logic here (e.g., send data to server)
    alert('Message sent successfully!');
    contactForm.reset();
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}
