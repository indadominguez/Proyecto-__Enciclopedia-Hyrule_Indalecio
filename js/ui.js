console.log("UI CARGADO");
import { buscarZelda } from "./api.js";

let ultimosResultados = []; // 👈 FALTABA ESTO

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

// ==========================
// GUARDAR HISTORIAL REAL
// ==========================
function guardarBusqueda(tipo, item) {
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    const idSeguro = generarIdSeguro(item);

    const nuevaBusqueda = {
        tipo,
        fecha: new Date().toLocaleString(),

        id: idSeguro,
        name: item.name,
        description: item.description,
        gender: item.gender,
        race: item.race
    };

    const existe = historial.some(h => h.id === idSeguro);

    if (!existe) {
        historial.unshift(nuevaBusqueda);
        localStorage.setItem("historial", JSON.stringify(historial));
    }
}

// ==========================
// RENDER RESULTADOS
// ==========================
function renderResultados(data) {
    const contenedor = document.getElementById("results");
    if (!contenedor) return;

    const items = data.data || [];

    ultimosResultados = items; // 👈 IMPORTANTE

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

                <button class="btn-save" data-index="${i}">
                    Guardar
                </button>
            </article>
        `;
    }

    activarGuardado(); // 👈 FALTABA
}

// ==========================
// BUSCADOR
// ==========================
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

            if (termino === "") {
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

// ==========================
// BOTÓN GUARDAR
// ==========================
function activarGuardado() {
    const botones = document.querySelectorAll(".btn-save");

    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = e.currentTarget.dataset.index;
            const item = ultimosResultados[index];

            const selector = document.getElementById("tipoBusqueda");
            const tipo = selector.value;

            guardarBusqueda(tipo, item);
        });
    });
}

// ==========================
// HISTORIAL
// ==========================

function mostrarHistorial() {
    const contenedor = document.getElementById("contenedor-tipo");
    if (!contenedor) return;

    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    contenedor.innerHTML = "";

    if (historial.length === 0) {
        contenedor.innerHTML = "<li>No hay búsquedas guardadas</li>";
        return;
    }

    let html = "";

    historial.forEach((busqueda) => {
        html += `
            <li class="historial-item">
                <article>
                    <div class="historial-info">
                        <h3>${busqueda.name}</h3>
                        <p>${busqueda.tipo}</p>
                        <small>${busqueda.fecha}</small>

                        <p>${busqueda.description ?? ""}</p>
                        <p>${busqueda.race ?? "Unknown"} | ${busqueda.gender ?? "Unknown"}</p>

                        <button class="btn-delete" data-id="${busqueda.id}">
                            ✖
                        </button>
                    </div>
                </article>
            </li>
        `;
    });

    contenedor.innerHTML = html;

    activarBotonesEliminar();
}


function activarBotonesEliminar() {
    const botones = document.querySelectorAll(".btn-delete");

    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.currentTarget.dataset.id;

            let historial = JSON.parse(localStorage.getItem("historial")) || [];

            console.log("BORRANDO ID:", id);
            console.log("HISTORIAL:", historial);

            historial = historial.filter(item => item.id !== id);

            localStorage.setItem("historial", JSON.stringify(historial));

            mostrarHistorial();
        });
    });
}

function generarIdSeguro(item) {
    return item.id ?? `${item.name}-${item.description?.slice(0,20)}`;
}


// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    iniciarBuscador();
    mostrarHistorial();
});