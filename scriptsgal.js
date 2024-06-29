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
            const boundingRect = element.getBoundingClientRect();
            const screenWidth = window.innerWidth;

            if (element.classList.contains('title')) {
                element.classList.add('animate__slideInDown');
            } else if (boundingRect.left < screenWidth / 2 && boundingRect.right > screenWidth / 2) {
                element.classList.add('animate__flipInX');
            } else if (boundingRect.left < screenWidth / 2) {
                element.classList.add('animate__slideInLeft');
            } else {
                element.classList.add('animate__slideInRight');
            }

            observer.unobserve(element); // Stop observing once the animation is triggered
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

const elementsToAnimate = document.querySelectorAll('.animate__animated');
elementsToAnimate.forEach(element => {
    observer.observe(element);
});

// Membership modal
const membershipModal = document.getElementById('membership-modal');
const membershipButton = document.getElementById('membership-button');
const closeMembership = document.querySelector('.close');

membershipButton.onclick = function() {
    membershipModal.style.display = 'block';
}

closeMembership.onclick = function() {
    membershipModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == membershipModal) {
        membershipModal.style.display = 'none';
    }
}

// Form step handling
const nextButton = document.getElementById('next-button');
const formStep1 = document.getElementById('form-step-1');
const formStep2 = document.getElementById('form-step-2');

nextButton.onclick = function() {
    // Validate form fields in step 1
    const fields = ['fname', 'lname', 'email', 'phone', 'address', 'dob', 'occupation', 'interests'];
    let valid = true;

    fields.forEach(field => {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.style.border = '1px solid red';
            valid = false;
        } else {
            element.style.border = '1px solid #ccc';
        }
    });

    if (valid) {
        formStep1.style.display = 'none';
        formStep2.style.display = 'block';
    } else {
        alert('Please fill in all the required fields.');
    }
}

// Form submission
document.getElementById('membership-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log('Form submitted:', data);

    if (data['payment-method'] === 'esewa') {
        // Redirect to eSewa payment gateway
        const esewaUrl = `https://esewa.com.np/epay/main?amt=100&pid=1234567890&scd=EPAYTEST&su=https://yourwebsite.com/success&fu=https://yourwebsite.com/failure&esewaacc=9869421158`;
        window.location.href = esewaUrl;
    } else {
        alert('Payment through Visa or MasterCard is not implemented in this example.');
    }

    membershipModal.style.display = 'none';
});

// Image Popup Modal
const galleryPhotos = document.querySelectorAll('.gallery-photo');
const imagePopup = document.getElementById('image-popup');
const popupImage = document.getElementById('popup-image');
const closePopup = document.querySelector('.close-popup');

galleryPhotos.forEach(photo => {
    photo.addEventListener('click', function() {
        imagePopup.style.display = 'flex';
        popupImage.src = this.src;
    });
});

closePopup.addEventListener('click', function() {
    imagePopup.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == imagePopup) {
        imagePopup.style.display = 'none';
    }
});
