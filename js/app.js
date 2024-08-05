const navbarToggle = document.getElementById('navbar-toggle');
const navLinksContainer = document.getElementById('nav-links');

// Toggle the visibility of the navigation links container
navbarToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Close the menu when a link is clicked (useful on mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {

    let modalShown = localStorage.getItem('newsletterModalShown') === 'true';

    // Check if modal has been shown
    if (!modalShown) {
        window.addEventListener('scroll', checkScroll);
    }

    const todoSection = document.querySelector('#todo');
    const modal = document.querySelector('#newsletter-modal');
    const header = document.querySelector('#modal-header');
    const paragraph = document.querySelector('#modal-p');
    const newsletterSubmit = document.querySelector('#newsletter-submit');
    const closeBtn = modal.querySelector('.close-btn');

    // Function to check if the user has scrolled to or past the "to-do" section
    function checkScroll() {
        const todoSectionTop = todoSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (todoSectionTop <= windowHeight && !modalShown) {
            modal.showModal(); // Show the dialog modal
            modalShown = true; // Ensure the modal only shows once
            localStorage.setItem('newsletterModalShown', 'true');
        }
    }

    // Event listener for scrolling
    window.addEventListener('scroll', checkScroll);

    // Event listener for closing the modal
    closeBtn.addEventListener('click', function () {
        modal.close();
    });

    // Change modal content upon form submission
    document.querySelector('#newsletter-form').addEventListener('submit', function (e) {
        e.preventDefault();

        header.innerText = "Thank You!";
        paragraph.innerText = "'Thanks for subscribing to our newsletter. You'll now receive the latest updates and exclusive content.'";
        newsletterSubmit.disabled = true;
    });

    const thanksDialog = document.getElementById('thank-you-dialog');
    const closeDialogBtn = document.getElementById('close-dialog-btn');
    const thanksCloseBtn = thanksDialog.querySelector('.close-btn');

    // Close the modal when the close button or close-modal-btn is clicked
    closeDialogBtn.addEventListener('click', function() {
        thanksDialog.close();
    });

    thanksCloseBtn.addEventListener('click', function() {
        thanksDialog.close();
    });

    // Event listener for the footer newsletter form. Triggers when the form is submitted
    document.getElementById('newsletter-signup').addEventListener('submit', function(e) {
        e.preventDefault(); // stops default behaviour for form submission. The page was reloading without it
        thanksDialog.showModal(); // Show the thank-you dialog pop up to provide feedback to the user.
    });
});