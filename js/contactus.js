document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  const messagePopup = document.getElementById('messagePopup');

  contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
    
      const name = document.querySelector('input[name="name"]').value;
      const email = document.querySelector('input[name="email"]').value;
      const phone = document.querySelector('input[name="phone"]').value;
      const message = document.querySelector('textarea[name="message"]').value;

      // Basic form validation
      if (name === '' || email === '' || message === '') {
          alert('Please fill out all required fields.');
          return; // Exit the function if validation fails
      }

      setTimeout(() => {
          messagePopup.style.display = 'block';

          setTimeout(() => {
              messagePopup.style.display = 'none';
          }, 3000);
          contactForm.reset(); 
      }, 1000);
  });

  const inputs = document.querySelectorAll(".input");

  function focusFunc() {
      let parent = this.parentNode;
      parent.classList.add("focus");
  }

  function blurFunc() {
      let parent = this.parentNode;
      if (this.value == "") {
          parent.classList.remove("focus");
      }
  }

  inputs.forEach((input) => {
      input.addEventListener("focus", focusFunc);
      input.addEventListener("blur", blurFunc);
  });
});
