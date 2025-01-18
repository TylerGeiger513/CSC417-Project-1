// Client-side script to strictly control the carousel animation and logic - content is laoded in pageLoader.js


document.addEventListener('DOMContentLoaded', () => {
  const carouselItems = document.querySelectorAll('.carousel-item');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentIndex = 0;

  const rotateCarousel = async (newIndex) => {
    const currentItem = carouselItems[currentIndex];

    await window.pageLoader.unloadContent(currentItem);

    currentIndex = newIndex;
    updateCarousel();
  };

  const updateCarousel = () => {
    carouselItems.forEach((item, index) => {
      item.classList.remove('active', 'left', 'right');

      if (index === currentIndex) {
        item.classList.add('active');
        window.pageLoader.fetchAndLoadContent(item).then(() => {
          const contentDiv = item.querySelector('.carousel-content');
          const children = contentDiv.querySelectorAll('.carousel-children');
          children.forEach((child) => {
            child.style.visibility = 'visible';
            child.style.opacity = '1';
            child.style.transform = 'scale(1)';
          });
        });
      } else {
        if (index === (currentIndex + 1) % carouselItems.length) {
          item.classList.add('right');
        } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
          item.classList.add('left');
        }
      }
    });

    navLinks.forEach((link, index) => {
      link.classList.toggle('active', index === currentIndex);
    });
  };

  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (index !== currentIndex) {
        rotateCarousel(index);
      }
    });
  });

  updateCarousel();
});
