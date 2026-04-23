import { buscarZelda } from "./api.js";


export function renderJuegos(juegos) {
    const contenedor = document.getElementById("contenedor-juegos");
    if (!contenedor) return;

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


function renderResultados(data) {
    const contenedor = document.getElementById("results");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (!data.data || data.data.length === 0) {
        contenedor.innerHTML = "<p>No hay resultados</p>";
        return;
    }

    for (let i = 0; i < data.data.length; i++) {
        const item = data.data[i];

        contenedor.innerHTML += `
            <article class="tarjeta">
                <h2>${item.name}</h2>
                <p>${item.description || "Sin descripción"}</p>
            </article>
        `;
    }
}


function iniciarBuscador() {
    const input = document.getElementById("entradaBusqueda");
    const selector = document.getElementById("tipoBusqueda");

    if (!input || !selector) return;

    let timeout;

    input.addEventListener("input", () => {
        clearTimeout(timeout);

        timeout = setTimeout(async () => {
            const termino = input.value.trim();
            const tipo = selector.value;
            const contenedor = document.getElementById("results");

            if (termino.length < 3) {
                if (contenedor) contenedor.innerHTML = "";
                return;
            }

            if (contenedor) contenedor.innerHTML = "Cargando...";

            try {
                const data = await buscarZelda(tipo, termino);
                renderResultados(data);
            } catch {
                if (contenedor) contenedor.innerHTML = "Error de red";
            }

        }, 500);
    });
}

document.addEventListener("DOMContentLoaded", iniciarBuscador);