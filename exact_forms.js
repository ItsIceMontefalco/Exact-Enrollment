document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the application type from localStorage
    var applicationType = localStorage.getItem('applicationType');
  
    // Set the hidden input field value to the application type
    if (applicationType) {
        document.getElementById('application-type').value = applicationType;
    } else {
        console.error('No application type set. Redirecting back to the selection page.');
        window.location.href = 'exact_enroll_now.html'; // Redirect if no type is set
    }
  
    // Get modal and close button elements
    var modal = document.getElementById('myModal');
    var closeButton = document.querySelector('.modal .close');
  
    // Show modal function
    function showModal() {
        if (modal) {
            modal.style.display = 'block';
        }
    }
  
    // Hide modal function
    function hideModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }
  
    // Close modal when the user clicks on <span> (x)
    if (closeButton) {
        closeButton.onclick = function() {
            hideModal();
        }
    }
  
    // Close modal when clicking outside of modal
    window.onclick = function(event) {
        if (event.target == modal) {
            hideModal();
        }
    }
  });
  
  function handleSubmit() {
    var submitButton = document.getElementById('submit');
    var loadingIcon = document.getElementById('loading-icon');
    var dimmedOverlay = document.getElementById('dimmed-overlay');
    var form = document.getElementById('student-form');
    var submissionPopup = document.getElementById('submission-popup');
    var modal = document.getElementById('myModal');
  
    // Check if all required elements exist
    if (!submitButton || !loadingIcon || !dimmedOverlay || !form || !submissionPopup || !modal) {
        console.error('Required elements are missing from the DOM.');
        return false; // Prevent form submission
    }
  
    // Check if all required fields are filled out
    var isFormValid = form.checkValidity();
    if (!isFormValid) {
        // If the form is not valid, show a modal with an error message
        modal.style.display = 'block'; // Show the modal
        return false; // Prevent form submission
    }
  
    // Show loading icon and dimmed overlay
    loadingIcon.style.display = 'block';
    dimmedOverlay.style.display = 'block';
  
    // Disable the submit button
    submitButton.disabled = true;
  
    // Create a FormData object from the form
    var formData = new FormData(form);
  
    // Send form data using Fetch API
    fetch('process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Hide loading icon and dimmed overlay
        loadingIcon.style.display = 'none';
        dimmedOverlay.style.display = 'none';
        
        // Show the popup message
        showSubmissionMessage();
        
        // Reset the form after submission
        form.reset(); 
        
        // Ensure the modal is displayed after form reset
        showModal(); 
    })
    .catch(error => {
        console.error('Error:', error);
        // Hide loading icon and dimmed overlay
        loadingIcon.style.display = 'none';
        dimmedOverlay.style.display = 'none';
        
        // Re-enable the submit button
        submitButton.disabled = false;
  
        // Optional: Show an error message to the user
        alert('There was an error submitting the form. Please try again.');
    });
  
    return false; // Prevent actual form submission to show popup
  }
  
  function showSubmissionMessage() {
    var submissionPopup = document.getElementById('submission-popup');
    if (submissionPopup) {
        submissionPopup.style.display = 'block';  // Show the popup
        setTimeout(function () {
            submissionPopup.style.display = 'none'; // Hide the popup after 2 seconds
        }, 2000); // Adjust the time delay for the popup
    }
  }
  