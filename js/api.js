const BASE_URL = "https://zelda.fanapis.com/api";

export async function buscarZelda(tipo, termino) {
    const clave = `${tipo}-${termino.toLowerCase()}`;

    const cache = localStorage.getItem(clave);
    if (cache) {
        return JSON.parse(cache);
    }

    try {
        const respuesta = await fetch(`${BASE_URL}/${tipo}`);
        const data = await respuesta.json();

        const items = (data.data || []).filter(item =>
            item.name.toLowerCase().includes(termino.toLowerCase())
        );

        const resultado = { data: items };

        localStorage.setItem(clave, JSON.stringify(resultado));

        return resultado;

    } catch (error) {
        throw new Error("Error de red");
    }
}