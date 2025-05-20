import { buscarLibros, crearPaginacion, cargarLibrosTop, cargarLibrosPublicos } from "./api/libros.js";
import { moverCarrusel } from "./ui/carrusel.js";
import { cargarAutores } from "./api/autores.js";
import { detalleAutor } from "./ui/detalleAutor.js";

document.addEventListener('DOMContentLoaded', () => {
    try {
        cargarLibrosTop();
        cargarLibrosPublicos();
        moverCarrusel();
        cargarAutores();
        detalleAutor();
    } catch (error) {
        console.error('Error al cargar la página:', error);
        msjError('Error al cargar la página. Por favor, inténtelo de nuevo más tarde.');
    }

    const inputBusqueda = document.getElementById('busqueda');
    const iconoBusqueda = document.getElementById('icono-busqueda');
    const btnCerrarBusqueda = document.getElementById('cerrar-busqueda');
    const menuOpciones = document.getElementById('menu');

    function manejarBusqueda() {
        const query = inputBusqueda.value.trim();
        if (query) {
            buscarLibros(query);
          }
    }

    if (iconoBusqueda) {
        iconoBusqueda.addEventListener('click', manejarBusqueda);
    }
    
    if (inputBusqueda) {
        inputBusqueda.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                manejarBusqueda();
            }
        });

        let debounceTimeout;
        inputBusqueda.addEventListener('input', () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(manejarBusqueda, 300);
        })
    }

    if (btnCerrarBusqueda) {
        btnCerrarBusqueda.addEventListener('click', () => {
            const seccionResultados = document.querySelector('.busqueda-contenedor');
            if (seccionResultados) seccionResultados.style.display = 'none';

            document.querySelectorAll('main > section:not(.busqueda-contenedor)').forEach((sec) => {
                sec.style.display = 'block';
            });

            const contenedor = document.getElementById('resultados-libros');
            const contador = document.getElementById('cantidad-resultados');
            if (contenedor) contenedor.innerHTML = '';
            if (contador) contador.innerHTML = '';
        });
    }

    if (menuOpciones) {
        menuOpciones.setAttribute('role', 'button');
        menuOpciones.setAttribute('aria-label', 'Abrir menú');
        menuOpciones.addEventListener('click', () => {
            const nav = document.getElementById('menu-nav');
            if (nav) {
                const abierto = nav.style.display === 'inline';
                nav.style.display = abierto ? 'none' : 'inline';
                menuOpciones.setAttribute('aria-expanded', !abierto);
            }
        });
    }

    function msjError(mensaje) {
        let contenedor = document.getElementById('resultados-libros');
        if (!contenedor) {
            contenedor = document.createElement('div');
            contenedor.id = 'resultados-libros';
            const main = document.querySelector('main');
            if (main) {
                main.appendChild(contenedor);
            } else {
                document.body.appendChild(contenedor);
            }
        }
        contenedor.innerHTML = `<p style="color: red; font-weight: bold;">${mensaje}</p>`;
    }
});
