console.log("UI CARGADO");
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

    const items = data.data || [];

    contenedor.innerHTML = "";

    if (items.length === 0) {
        contenedor.innerHTML = "<p>No hay resultados</p>";
        return;
    }

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        contenedor.innerHTML += `
            <article class="tarjeta">
                <h2>${item.name ?? "Sin nombre"}</h2>
                <p>${item.description ?? "Sin descripción"}</p>
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

            if (!contenedor) return;

            if (termino.length < 3) {
                contenedor.innerHTML = "";
                return;
            }

            contenedor.innerHTML = "<p>Cargando...</p>";

            try {
                const data = await buscarZelda(tipo, termino);
                renderResultados(data);
            } catch (error) {
                contenedor.innerHTML = "<p>Error de red</p>";
            }

        }, 500);
    });
}

document.addEventListener("DOMContentLoaded", iniciarBuscador);