export class LibroInfo {
    constructor({ imagen, titulo, autor, rating, sinopsis, enlace, esGutendex, infoExtra }) {
        this.imagen = imagen;
        this.titulo = titulo;
        this.autor = autor;
        this.rating = rating;
        this.sinopsis = sinopsis;
        this.enlace = enlace;
        this.esGutendex = esGutendex || false;
        this.infoExtra = infoExtra || {};
    }

    static fromGoogleBooks(libro) {
        const info = libro.volumeInfo || {};
        return new LibroInfo({
            imagen: info.imageLinks?.thumbnail || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==',
            titulo: info.title || 'Sin título',
            autor: info.authors?.join(', ') || 'Autor desconocido',
            rating: info.averageRating ?? 'N/A',
            sinopsis: info.description ?? 'Sin sinopsis disponible',
            enlace: '',
            esGutendex: false,
            infoExtra: {
                anio: info.publishedDate || 'N/D',
                isbn: info.industryIdentifiers?.[0]?.identifier || 'No disponible',
                genero: info.categories?.join(', ') || 'N/D',
                paginas: info.pageCount || 'N/D',
                formato: info.printType || 'N/D',
                idioma: info.language || 'N/D'
            }
        });
    }

    static fromGutendex(libro) {
        return new LibroInfo({
            imagen: libro.formats?.['image/jpeg'] || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlLW9mZi1pY29uIGx1Y2lkZS1pbWFnZS1vZmYiPjxsaW5lIHgxPSIyIiB4Mj0iMjIiIHkxPSIyIiB5Mj0iMjIiLz48cGF0aCBkPSJNMTAuNDEgMTAuNDFhMiAyIDAgMSAxLTIuODMtMi44MyIvPjxsaW5lIHgxPSIxMy41IiB4Mj0iNiIgeTE9IjEzLjUiIHkyPSIyMSIvPjxsaW5lIHgxPSIxOCIgeDI9IjIxIiB5MT0iMTIiIHkyPSIxNSIvPjxwYXRoIGQ9Ik0zLjU5IDMuNTlBMS45OSAxLjk5IDAgMCAwIDMgNXYxNGEyIDIgMCAwIDAgMiAyaDE0Yy41NSAwIDEuMDUyLS4yMiAxLjQxLS41OSIvPjxwYXRoIGQ9Ik0yMSAxNVY1YTIgMiAwIDAgMC0yLTJIOSIvPjwvc3ZnPg==',
            titulo: libro.title || 'Sin título',
            autor: libro.authors?.[0]?.name || 'Anónimo',
            rating: libro.rating ?? 'N/A',
            sinopsis: libro.subjects?.join(', ') ?? 'Sin sinopsis disponible',
            enlace: libro.formats?.['text/html'] || libro.formats?.['application/pdf'] || libro.formats?.['application/epub+zip'] || '#',
            esGutendex: true,
            infoExtra: {
                anio: libro.copyright_year || 'N/D',
                isbn: 'No disponible',
                genero: libro.subjects?.slice(0, 2).join(', ') || 'N/D',
                paginas: libro.pagination || 'N/D',
                formato: libro.formats ? Object.keys(libro.formats).join(', ') : 'N/D',
                idioma: libro.languages?.[0] || 'N/D'
            }
        });
    }
}