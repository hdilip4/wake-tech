// JavaScript code for form validation
const form = document.getElementById('myForm');
const inputField = document.getElementById('inputField');

form.addEventListener('submit', function(event) {
	// Prevent form from submitting
	event.preventDefault();

      // Retrieve the input field value
      const inputValue = inputField.value;

      // Regular expression pattern for alphanumeric input
      const alphanumericPattern = /^[a-zA-Z0-9]+$/;

      // Check if the input value matches the pattern
      if (alphanumericPattern.test(inputValue)) {

        // Valid input: display confirmation and submit the form
        alert('Form submitted successfully! Your input is valid.');

      } else {

        // Invalid input: display error message
        alert('Error: Input must be alphanumeric (letters and numbers only, no spaces or special characters).');

      }
});
