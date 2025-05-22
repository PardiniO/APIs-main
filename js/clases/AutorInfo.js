export class AutorInfo {
    constructor({ id, nombre, foto, biografia, generos, obras }) {
        this.id = id;
        this.nombre = nombre;
        this.foto = foto;
        this.biografia = biografia;
        this.generos = generos;
        this.obras = obras;
    }

    static async fromOpenLibrary(id) {
        try {
            const autorResponse = await fetch(`https://openlibrary.org/authors/${id}.json`);
            const autorData = await autorResponse.json();

            let foto = 'https://via.placeholder.com/150';
            if (autorData.photos && autorData.photos.length > 0) {
                foto = `https://covers.openlibrary.org/a/id/${autorData.photos[0]}-L.jpg`;
            }

            const biografia = autorData.bio
                ? (typeof autorData.bio === 'object' ? autorData.bio.value : autorData.bio)
                : 'No hay biografía disponible.';

            const generos = autorData.subjects ? autorData.subjects.join(', ') : 'N/D';

            const obrasResponse = await fetch(`https://openlibrary.org/authors/${id}/works.json`);
            const obrasData = await obrasResponse.json();
            const obras = obrasData.entries
                ? obrasData.entries.slice(0, 10).map(obra => obra.title)
                : [];

            return new AutorInfo({
                id,
                nombre: autorData.name || 'Autor desconocido',
                foto,
                biografia,
                generos,
                obras
            });
        } catch (error) {
            console.error('Error al obtener datos del autor:', error);
            return null;
        }
    }
}