// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function handleSubmit() {
  var submitButton = document.getElementById('submit');
  var loadingIcon = document.getElementById('loading-icon');
  var dimmedOverlay = document.getElementById('dimmed-overlay');
  var form = document.getElementById('student-form');

  // Check if all required fields are filled out
  var isFormValid = form.checkValidity();
  if (!isFormValid) {
    // If the form is not valid, show a modal with an error message
    modal.style.display = 'block';
    return; // Exit the function if the form is not valid
  }

  // If the form is valid, continue with form submission
  submitButton.disabled = true;
  loadingIcon.classList.remove('hidden');
  dimmedOverlay.style.display = 'block';

  // Simulate asynchronous operation (e.g., form submission)
  setTimeout(function () {
    submitButton.disabled = false;
    loadingIcon.classList.add('hidden');
    dimmedOverlay.style.display = 'none';
    showSubmissionMessage();
    form.reset();
  }, 3000); // Adjust the time delay as needed
}

function showSubmissionMessage() {
  var submissionPopup = document.getElementById('submission-popup');
  submissionPopup.style.display = 'block';
  setTimeout(function () {
    submissionPopup.style.display = 'none';
  }, 4000); // Adjust the time delay for the popup
}
