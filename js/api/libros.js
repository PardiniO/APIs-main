import { LibroInfo } from "../clases/LibroInfo.js";
import { LibroCard } from "../clases/LibroCard.js";
import { LibroDetalle } from "../clases/LibroDetalle.js";

export async function buscarLibros(query, pagina = 1, resultadosPorPagina = 10, filtros = {}) {
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
        
        let libros = (data.items || []).map(LibroInfo.fromGoogleBooks);
        
        if (filtros.autor) {
            libros = libros.filter(libro => {
                const autor = Array.isArray(libro.autore) ? libro.autore.join(', ') : (libro.autor || '');
                return autor.toLowerCase().includes(query.toLowerCase());            
            });
        }
        if (filtros.titulo) {
            libros = libros.filter(libro => libro.titulo && libro.titulo.toLowerCase().includes(query.toLowerCase()));
        }
        if (filtros.isbn) {
            libros = libros.filter(libro => libro.infoExtra.isbn && libro.infoExtra.isbn.includes(query));
        }
        if (filtros.genero) {
            libros = libros.filter(libro => libro.infoExtra.genero && libro.infoExtra.genero.toLowerCase().includes(query.toLowerCase()));
        }
        
        if (filtros.ordenar === 'fecha') {
            libros.sort((a, b) => (b.infoExtra.anio || '').localeCompare(a.infoExtra.anio || ''));
        } else if (filtros.ordenar === 'valoracion') {
            libros.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (filtros.ordenar === 'alfabetico') {
            libros.sort((a, b) => a.titulo.localeCompare(b.titulo));
        }

        contador.textContent = `Resultados encontrados: ${data.length}`;
    
        contenedor.innerHTML = '';
        libros.slice(0, resultadosPorPagina).forEach(libro => {
            const card = new LibroCard(libro, (libro) => LibroDetalle.mostrar(libro));
            contenedor.appendChild(card.render());
        });

        const contenedorFiltros = document.getElementById('resultados-libros');
        contenedorFiltros.innerHTML = '';
        libros.slice(0, resultadosPorPagina).forEach(libroRow => {
            const card = new LibroCard(libroRow, (libro) => LibroDetalle.mostrar(libro));
            contenedorFiltros.appendChild(card.render());
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
    
    paginacionDiv.innerHTML = '';
    const totalPaginas = Math.ceil(totalItems / resultadosPorPagina);

    if (pagina > 1) {
        const btnPrev = document.createElement('button');
        btnPrev.textContent = 'Anterior';
        btnPrev.addEventListener('click', () => buscarLibros(query, pagina - 1, resultadosPorPagina, filtros));
        paginacionDiv.appendChild(btnPrev);
    }

    let start = Math.max(1, pagina - 2);
    let end = Math.min(totalPaginas, pagina + 2);

    if (pagina <= 3) {
        end = Math.min(5, totalPaginas);
    }
    if (pagina >= totalPaginas - 2) {
        start = Math.max(1, totalPaginas - 4);
    }

    if (start > 1) {
        const btnFirst = document.createElement('button');
        btnFirst.textContent = '1';
        btnFirst.addEventListener('click', () => buscarLibros(query, 1, resultadosPorPagina, filtros));
        paginacionDiv.appendChild(btnFirst);
        if (start > 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            paginacionDiv.appendChild(dots);
        }        
    }

    for (let i = start; i <= end; i++) {
        const btnPage = document.createElement('button');
        btnPage.textContent = i;
        if (i === pagina) {
            btnPage.classList.add('active');
            btnPage.disabled = true;
        }
        btnPage.addEventListener('click', () => buscarLibros(query, i, resultadosPorPagina, filtros));
        paginacionDiv.appendChild(btnPage);
    }
    
    if (end < totalPaginas) {
        if (end < totalPaginas - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            paginacionDiv.appendChild(dots);
        }
        const btnLast = document.createElement('button');
        btnLast.textContent = totalPaginas;
        btnLast.addEventListener('click', () => buscarLibros(query, totalPaginas, resultadosPorPagina, filtros));
        paginacionDiv.appendChild(btnLast);
    }

    if (pagina < totalPaginas) {
        const btnNext = document.createElement('button');
        btnNext.textContent = 'Siguiente';
        btnNext.addEventListener('click', () => buscarLibros(query, pagina + 1, resultadosPorPagina, filtros));
        paginacionDiv.appendChild(btnNext);
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