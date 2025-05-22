export function moverCarrusel() {
    const wrappers = document.querySelectorAll('.carrusel-wrapper');

    wrappers.forEach(wrapper => {
        const carrusel = wrapper.querySelector('.carrusel');
        const btnIzq = wrapper.querySelector('.btn-izq');
        const btnDer = wrapper.querySelector('.btn-der');

        const actualizarVisibilidad = () => {
            btnIzq.classList.toggle('hidden', carrusel.scrollLeft === 0);
            const scrollMax = carrusel.scrollWidth - carrusel.clientWidth - 1;
            btnDer.classList.toggle('hidden', carrusel.scrollLeft >= scrollMax);
        };
        actualizarVisibilidad();

        [btnIzq, btnDer].forEach(boton => {
            boton.addEventListener('click', () => {
                const item = carrusel.querySelector('.item-carrusel');
                if (!item) return;
                const visibleCount = 4;
                const itemWidth = item.offsetWidth + parseInt(getComputedStyle(carrusel).gap || 0, 10);
                const direccion = boton.classList.contains('btn-izq') ? -1 : 1;
                setTimeout(actualizarVisibilidad, 400);
            });
        });

        carrusel.addEventListener('scroll', actualizarVisibilidad);
    });
}
