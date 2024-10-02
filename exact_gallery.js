document.addEventListener('DOMContentLoaded', function () {
    const smallImages = document.querySelectorAll('.right-img');
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');
    document.body.appendChild(popupContainer);
  
    smallImages.forEach(function (img) {
      img.addEventListener('click', function () {
        const imgUrl = img.getAttribute('src');
        const imgAlt = img.getAttribute('alt');
  
        // Create the pop-up container and insert the clicked image
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
          <div class="popup-content">
            <img src="${imgUrl.replace('small', 'large')}" alt="${imgAlt}" style="max-height: 100vh; max-width: 100vw;">
            <button class="close-btn">&times;</button>
          </div>
        `; // Comment: Add the image and close button here
  
        popupContainer.innerHTML = '';
        popupContainer.appendChild(popup);
        popupContainer.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Disable scrolling on the body
  
        // Add event listener to the close button
        const closeBtn = popup.querySelector('.close-btn');
        closeBtn.addEventListener('click', function () {
          popupContainer.style.display = 'none';
          document.body.style.overflow = 'auto'; // Enable scrolling on the body
        });
      });
    });
  
    // Close the pop-up when clicking outside the image
    popupContainer.addEventListener('click', function (event) {
      if (event.target === popupContainer) {
        popupContainer.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling on the body
      }
    });
  });
  