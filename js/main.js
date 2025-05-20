import { buscarLibros, crearPaginacion, cargarLibrosTop, cargarLibrosPublicos } from "./api/libros.js";
import { moverCarrusel } from "./ui/carrusel.js";
import { cargarAutores } from "./api/autores.js";
import { detalleAutor } from "./ui/detalleAutor.js";

function menu() {
    const menuBtn = document.getElementById('menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.classList.toggle('activo');
        });
        document.addEventListener('click', () => {
            menuBtn.classList.remove('activo');
        });
    }

    const toggle = document.getElementById('generos-menu-toggle');
    const submenu = document.getElementById('generos-submenu');
    if (toggle && submenu) {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
        });
        document.addEventListener('click', () => {
            submenu.style.display = 'none';
        });
        submenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        cargarLibrosTop();
        cargarLibrosPublicos();
        moverCarrusel();
        cargarAutores();
        detalleAutor();
        menu();
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
            const seccionResultados = document.querySelector('.busqueda-contenedor');
            if (seccionResultados) seccionResultados.style.display = 'flex';
            document.querySelectorAll('main > section:not(.busqueda-contenedor)').forEach((sec) => {
                sec.style.display = 'none';
            });
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

    const btnInicio = document.querySelector('#menu-btn span:first-child');
    if (btnInicio) {
        btnInicio.addEventListener('click', (e) => {
            e.stopPropagation();

            document.querySelectorAll('main > section').forEach((sec) => sec.style.display = 'none');
            const carrusel = document.querySelector('.carrusel-seccion');
            const autores = document.querySelector('.autores-seccion');
            const generos = document.querySelector('.generos');
            if (carrusel) carrusel.style.display = 'block';
            if (autores) autores.style.display = 'block';
            if (generos) generos.style.display = 'block';
        })
    }
});
