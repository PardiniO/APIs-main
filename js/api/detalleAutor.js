import { AutorInfo } from "../clases/AutorInfo.js";

export async function detalleAutor() {
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get('id');
    if (!id) return;
    
    const autor = await AutorInfo.fromOpenLibrary(id);
    if (!autor) return;

    document.getElementById('nombre-autor').textContent = autorData.name || 'Autor Desconocido';
    document.getElementById('foto-autor').src = autor.foto || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==';
    document.getElementById('bio-autor').textContent = autor.biografia || 'Biografía no disponible';
    document.getElementById('genero-autor').textContent = autor.generos || 'N/D';
    document.getElementById('obras-autor').textContent = autor.obras.length > 0 ? 'Obras' : 'No hay obras disponibles';

    const listaObras = document.getElementById('lista-obras');
    if (listaObras) {
        listaObras.innerHTML = '';
        autor.obras.forEach(titulo => {
            const li = document.createElement('li');
            li.textContent = titulo;
            listaObras.appendChild(li);
        });
    }
}