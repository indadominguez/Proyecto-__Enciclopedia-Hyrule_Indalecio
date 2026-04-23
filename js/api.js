console.log("API CARGADA");

const BASE_URL = "https://zelda.fanapis.com/api";

export async function buscarZelda(tipo, termino) {
    const clave = `${tipo}-${termino.toLowerCase()}`;

    const cache = localStorage.getItem(clave);

    if (cache) {
        console.log("CACHE USADA:", clave);
        return JSON.parse(cache);
    }

    try {
        console.log("FETCH API:", clave);

        const respuesta = await fetch(`${BASE_URL}/${tipo}`);
        const data = await respuesta.json();

        const lista = data.data || [];

        const items = lista.filter(item => {
        const nombre = (item.name || "").toLowerCase();
        const descripcion = (item.description || "").toLowerCase();
        const terminoBuscado = termino.toLowerCase();

    return nombre.includes(terminoBuscado) || descripcion.includes(terminoBuscado);
});

        const resultado = { data: items };

        localStorage.setItem(clave, JSON.stringify(resultado));

        return resultado;

    } catch (error) {
        console.error(error);
        throw new Error("Error de red");
    }
}