function setApplicationType(type) {
  // Store the type in localStorage
  localStorage.setItem('applicationType', type);
  // Redirect to the form page
  window.location.href = 'exact_forms.html';
}