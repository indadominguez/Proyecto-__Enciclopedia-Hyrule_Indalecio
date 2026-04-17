export function xmlToJSON(xmlString) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, "text/xml");

    const juegos = xml.getElementsByTagName("juego");

    const resultado = [];

    for (let i = 0; i < juegos.length; i++) {
        const juego = juegos[i];

        resultado.push({
            id: juego.getAttribute("id"),
            titulo: juego.getElementsByTagName("titulo")[0].textContent,
            desarrolladora: juego.getElementsByTagName("desarrolladora")[0].textContent,
            publicadora: juego.getElementsByTagName("publicadora")[0].textContent,
            plataforma: juego.getElementsByTagName("plataforma")[0].textContent,

            anio: Number(juego.getElementsByTagName("anio")[0].textContent),
            puntuacion: Number(juego.getElementsByTagName("puntuacion")[0].textContent)
        });
    }

    return resultado;
}