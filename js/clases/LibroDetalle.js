export class LibroDetalle {
    constructor(datos) {
        this.datos = datos;
    }
    static mostrar(libro) {
        document.querySelectorAll('main > section').forEach((sec) => sec.style.display = 'none');
        const detalle = document.querySelector('.detalle-libro');
        if (!detalle) return;
        detalle.style.display = 'block';

        document.getElementById('portada-libro').src = this.datos.imagen || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==';
        document.getElementById('titulo-libro').textContent = this.datos.titulo || 'Sin título';
        document.getElementById('autor-libro').textContent = this.datos.autor || 'Autor desconocido';
        document.getElementById('rating-libro').textContent = this.datos.rating ?? 'N/A';
        document.getElementById('genero-libro').textContent = this.datos.genero || 'N/D';
        document.getElementById('paginas-libro').textContent = this.datos.paginas || 'N/D';
        document.getElementById('sinopsis-libro').textContent = this.datos.sinopsis || 'Sin sinopsis disponible';
        document.getElementById('formato-libro').textContent = this.datos.formato || 'N/D';
        document.getElementById('fecha-publicacion').textContent = this.datos.fechaPublicacion || 'N/D';
        document.getElementById('isbn-libro').textContent = this.datos.isbn || 'No disponible';
        document.getElementById('idioma-libro').textContent = this.datos.idioma || 'N/D';

        document.getElementById('btn-mas-info').onclick = () => {
            const masInfo = document.getElementById('mas-info-libro');
            masInfo.style.display = masInfo.style.display === 'none' ? 'block' : 'none';
        };
        console.log('Mostrando detalles del libro:', libro);
    }
}