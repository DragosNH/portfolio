// Card flip variable
let cards = document.querySelectorAll('.card');
// Hover icons variables
const iconContainers = document.querySelectorAll(".icon-container");

// Flip Card function
[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});

// Hover functions
iconContainers.forEach(container => {
  const popup = container.querySelector('.popup');

  container.addEventListener('mouseover', () => {
    popup.style.display = 'block';
  });

  container.addEventListener('mouseout', () => {
    popup.style.display = 'none';
  });
});