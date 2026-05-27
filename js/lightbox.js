(function () {
    function initImageLightbox() {
        const images = document.querySelectorAll('img.expandable-image');
        if (!images.length) return;

        const overlay = document.createElement('div');
        overlay.className = 'image-lightbox';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `
            <button class="image-lightbox__close" type="button" aria-label="Fechar imagem ampliada">×</button>
            <figure>
                <img src="" alt="">
                <figcaption></figcaption>
            </figure>
        `;
        document.body.appendChild(overlay);

        const overlayImg = overlay.querySelector('img');
        const overlayCaption = overlay.querySelector('figcaption');
        const closeButton = overlay.querySelector('.image-lightbox__close');
        let lastFocused = null;

        function captionFor(image) {
            const figureCaption = image.closest('figure')?.querySelector('figcaption');
            return figureCaption ? figureCaption.textContent.trim() : (image.alt || 'Imagem ampliada');
        }

        function openLightbox(image) {
            lastFocused = document.activeElement;
            overlayImg.src = image.currentSrc || image.src;
            overlayImg.alt = image.alt || '';
            overlayCaption.textContent = captionFor(image);
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('lightbox-open');
            closeButton.focus();
        }

        function closeLightbox() {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('lightbox-open');
            overlayImg.src = '';
            if (lastFocused && typeof lastFocused.focus === 'function') {
                lastFocused.focus();
            }
        }

        images.forEach((image) => {
            image.setAttribute('tabindex', '0');
            image.setAttribute('role', 'button');
            image.setAttribute('title', 'Clique para ampliar');
            image.addEventListener('click', () => openLightbox(image));
            image.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openLightbox(image);
                }
            });
        });

        closeButton.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) closeLightbox();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && overlay.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initImageLightbox);
    } else {
        initImageLightbox();
    }
})();
