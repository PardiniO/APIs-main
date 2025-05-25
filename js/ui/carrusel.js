export function moverCarrusel() {
    const wrappers = document.querySelectorAll('.carrusel-wrapper');

    wrappers.forEach(wrapper => {
        const carrusel = wrapper.querySelector('.carrusel');
        const btnIzq = wrapper.querySelector('.btn-izq');
        const btnDer = wrapper.querySelector('.btn-der');

        if (!carrusel || !btnIzq || !btnDer) return;

        const getItemWidth = () => {
            const item = carrusel.querySelector('.item-carrusel');
            if (!item) return 0;
            const style = getComputedStyle(carrusel);
            const gap = parseInt(style.gap || 0, 10);
            return item.offsetWidth + gap;
        }

        const visibleCount = 4;
        
        btnIzq.addEventListener('click', () => {
            const scrollAmount = getItemWidth() * visibleCount;
            carrusel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        btnDer.addEventListener('click', () => {
            const scrollAmount = getItemWidth() * visibleCount;
            carrusel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    });
}
