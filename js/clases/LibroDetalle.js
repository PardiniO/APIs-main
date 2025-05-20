export class LibroDetalle {
    static mostrar(libro) {
        document.querySelectorAll('main > section').forEach((sec) => sec.style.display = 'none');
        const detalle = document.querySelector('.detalle-libro');
        if (!detalle) return;
        detalle.style.display = 'block';

        document.getElementById('portada-libro').src = libro.imagen || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==';
        document.getElementById('titulo-libro').textContent = libro.titulo || 'Sin título';
        document.getElementById('autor-libro').textContent = libro.autor || 'Autor desconocido';
        document.getElementById('rating-libro').textContent = libro.rating ?? 'N/A';
        document.getElementById('genero-libro').textContent = libro.infoExtra?.genero || 'N/D';
        document.getElementById('paginas-libro').textContent = libro.infoExtra?.paginas || 'N/D';
        document.getElementById('sinopsis-libro').textContent = libro.sinopsis || 'Sin sinopsis disponible';
        document.getElementById('formato-libro').textContent = libro.infoExtra?.formato || 'N/D';
        document.getElementById('fecha-publicacion').textContent = libro.infoExtra?.anio || 'N/D';
        document.getElementById('isbn-libro').textContent = libro.infoExtra?.isbn || 'No disponible';
        document.getElementById('idioma-libro').textContent = libro.infoExtra?.idioma || 'N/D';

        const masInfo = document.getElementById('mas-info-libro');
        if (masInfo) masInfo.style.display = 'none';

        document.getElementById('btn-mas-info').onclick = () => {
            masInfo.style.display = masInfo.style.display === 'none' ? 'block' : 'none';
        };
        console.log('Mostrando detalles del libro:', libro);
    }
}