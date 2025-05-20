import { LibroInfo } from "../clases/LibroInfo.js";
import { LibroCard } from "../clases/LibroCard.js";
import { LibroDetalle } from "../clases/LibroDetalle.js";

export async function buscarLibros(query, pagina = 1, resultadosPorPagina = 10) {
    if (!query || !query.trim()) return;

    const startIndex = (pagina - 1) * resultadosPorPagina;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${resultadosPorPagina}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const contenedor = document.getElementById('resultados-libros');
        const contador = document.getElementById('cantidad-resultados');
        const paginacionDiv = document.getElementById('paginacion');

        if (!contenedor || !contador || !paginacionDiv) return;
        contenedor.innerHTML = '';
        contador.innerHTML = '';
        paginacionDiv.innerHTML = '';

        if (!data.items || !Array.isArray(data.items)) {
            contenedor.innerHTML = '<p>No se encontraron resultados</p>'
            return;
        }

        contador.textContent = `Resultados encontrados: ${data.totalItems}`;

        data.items?.forEach(libroRow => {
            const libro = LibroInfo.fromGoogleBooks(libroRow);
            const card = new LibroCard(libro, (libro) => console.log(libro));
            contenedor.appendChild(card.render());
        });

        crearPaginacion(data.totalItems, pagina, resultadosPorPagina, query);
    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('resultados-libros');
        if (contenedor) contenedor.innerHTML = '<p>Error al cargar los resultados. Intenta de nuevo más tarde.</p>';
    }
}

export function crearPaginacion(totalItems, pagina, resultadosPorPagina, query) {
    const paginacionDiv = document.getElementById('paginacion');
    if (!paginacionDiv) return;

    const totalPaginas = Math.ceil(totalItems / resultadosPorPagina);

    if (pagina > 1) {
        const btnPrev = document.createElement('button');
        btnPrev.textContent = 'Anterior';
        btnPrev.addEventListener('click', () => buscarLibros(query, pagina - 1));
        paginacionDiv.appendChild(btnPrev);
    }
    
    if (pagina > totalPaginas) {
        const btnNext = document.createElement('button');
        btnNext.textContent = 'Siguiente';
        btnNext.addEventListener('click', () => buscarConFiltros(query, pagNext));
        paginacion.appendChild(btnNext);
    }
}

export async function cargarLibrosTop() {
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=best%20books`);
        const data = await response.json();
        console.log(data);
        const carrusel = document.getElementById('carrusel-destacado');
        if (!carrusel) return;
        carrusel.innerHTML = '';
        
        data.items.slice(0, 10).forEach(libroRow => {
            const libro = LibroInfo.fromGoogleBooks(libroRow);
            const card = new LibroCard(libro, (libro) => LibroDetalle.mostrar(libro));
            console.log(card);
            carrusel.appendChild(card.render()); 
        });
        console.log(data.items);
    } catch (error) {
        console.error('Error fetching data:', error);
        const carrusel = document.getElementById('carrusel-destacado');
        if (carrusel) carrusel.innerHTML = '<p>Error al cargar los libros destacados. Intenta de nuevo más tarde.</p>';
    }
}

export async function cargarLibrosPublicos() {
    try {
        const response = await fetch('https://gutendex.com/books/?languages=es');
        const data = await response.json();
        console.log(data);
        const carrusel = document.getElementById('carrusel-gutendex');
        if (!carrusel) return;
        carrusel.innerHTML = '';
        
        data.results.slice(0, 10).forEach(libroRaw => {
            const libro = LibroInfo.fromGutendex(libroRaw);
            const card = new LibroCard(libro, (libro) => LibroDetalle.mostrar(libro));
            console.log(card);
            carrusel.appendChild(card.render());
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        const contenedor = document.getElementById('carrusel-gutendex');
        if (contenedor) contenedor.innerHTML = '<p>Error al cargar los libros públicos. Intenta de nuevo más tarde.</p>';
    }
}