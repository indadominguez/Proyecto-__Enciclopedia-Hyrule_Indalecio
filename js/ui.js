export function renderJuegos(juegos) {
    const contenedor = document.getElementById("contenedor-juegos");

    contenedor.innerHTML = "";

    for (let i = 0; i < juegos.length; i++) {
        const juego = juegos[i];

        contenedor.innerHTML += `
            <article class="tarjeta">
                <h2>${juego.titulo}</h2>

                <p><strong>ID:</strong> ${juego.id}</p>
                <p><strong>Desarrolladora:</strong> ${juego.desarrolladora}</p>
                <p><strong>Publicadora:</strong> ${juego.publicadora}</p>
                <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
                <p><strong>Año:</strong> ${juego.anio}</p>
                <p><strong>Puntuación:</strong> ${juego.puntuacion}</p>
            </article>
        `;
    }
}