document.addEventListener('DOMContentLoaded', function () {

  // Mobile Menu Toggle
  const mobileMenu = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Toggle the mobile navigation menu on click
  mobileMenu.addEventListener('click', function () {
      navLinks.classList.toggle('active');
      mobileMenu.classList.toggle('active');
  });

  // Newsletter Subscription Form Submission
  const newsletterForm = document.querySelector('.newsletter form');
  const newsletterInput = document.querySelector('.newsletter input');
  const newsletterButton = document.querySelector('.newsletter button');
  const newsletterMessage = document.createElement('p');
  newsletterMessage.style.color = '#ff6600';
  newsletterForm.appendChild(newsletterMessage);

  newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form from refreshing the page

      const email = newsletterInput.value.trim();

      // Basic email validation
      if (!email || !validateEmail(email)) {
          newsletterMessage.textContent = "Please enter a valid email address.";
          return;
      }

      // Disable button to prevent multiple submissions
      newsletterButton.disabled = true;
      newsletterButton.textContent = "Subscribing...";

      // AJAX request to send the email to the server
      fetch('subscribe.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `email=${encodeURIComponent(email)}`
      })
      .then(response => response.text())
      .then(data => {
          newsletterMessage.textContent = "Subscription successful! Thank you.";
          newsletterInput.value = ''; // Clear input
          newsletterButton.disabled = false;
          newsletterButton.textContent = "Subscribe";
      })
      .catch(error => {
          newsletterMessage.textContent = "There was an error, please try again later.";
          newsletterButton.disabled = false;
          newsletterButton.textContent = "Subscribe";
      });
  });

  // Contact Form Submission
  const contactForm = document.querySelector('.contact form');
  const contactMessage = document.createElement('p');
  contactMessage.style.color = '#ff6600';
  contactForm.appendChild(contactMessage);

  contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();

      if (!name || !email || !message || !validateEmail(email)) {
          contactMessage.textContent = "Please fill in all fields with valid data.";
          return;
      }

      // Disable submit button
      const submitButton = contactForm.querySelector('button');
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      // AJAX request to send contact message
      fetch('contact.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
      })
      .then(response => response.text())
      .then(data => {
          contactMessage.textContent = "Your message has been sent successfully.";
          contactForm.reset(); // Clear the form
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
      })
      .catch(error => {
          contactMessage.textContent = "There was an error, please try again later.";
          submitButton.disabled = false;
          submitButton.textContent = "Send Message";
      });
  });

  // Helper function to validate email format
  function validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(email);
  }

});
