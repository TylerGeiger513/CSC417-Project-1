
// Client-side script to fetch and load page content from server on the carousel pages

document.addEventListener('DOMContentLoaded', () => {
    const assignCarouselChildrenClass = (contentDiv) => {
        const levelZeroChildren = Array.from(contentDiv.children).filter(
            (child) => child.parentElement === contentDiv
        );
        levelZeroChildren.forEach((child) => {
            child.classList.add('carousel-children');
        });
    };

    // Fetch and load page content from server - this function is called when the nav link is clicked and carousel item is updated
    const fetchAndLoadContent = async (item) => {
        const contentDiv = item.querySelector('.carousel-content');
        const pageId = item.id;

        if (!contentDiv.innerHTML.trim()) {
            try {
                const response = await fetch(`/pages/${pageId}`);
                const html = await response.text();
                contentDiv.innerHTML = html;

                assignCarouselChildrenClass(contentDiv);

                const children = contentDiv.querySelectorAll('.carousel-children');
                children.forEach((child) => {
                    child.style.visibility = 'visible';
                    child.style.opacity = '1';
                    child.style.transform = 'scale(1)';
                    child.classList.add('pop-up');

                    child.addEventListener(
                        'transitionend',
                        () => {
                            child.classList.remove('pop-up');
                        },
                        { once: true }
                    );
                });

                const contentLoadedEvent = new CustomEvent('contentLoaded', {
                    detail: { currentItem: item },
                });
                document.dispatchEvent(contentLoadedEvent);
            } catch (error) {
                console.error(`Error loading page content for ${pageId}:`, error);
                contentDiv.innerHTML = '<p>Error loading content.</p>';
            }
        }
    };

    const unloadContent = async (item) => {
        const contentDiv = item.querySelector('.carousel-content');
        const children = contentDiv.querySelectorAll('.carousel-children');

        children.forEach((child) => {
            child.style.opacity = '0';
            child.style.visibility = 'hidden';
        });

        contentDiv.innerHTML = '';
    };

    window.pageLoader = { fetchAndLoadContent, unloadContent };
});
