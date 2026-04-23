console.log("🔥 JUEGOS.JS CARGADO");
import { xmlToJSON } from "./transform.js";
import { renderJuegos } from "./ui.js";

async function cargarJuegos() {
    const contenedor = document.getElementById("contenedor-juegos");
    if (!contenedor) return;

    try {
        const respuesta = await fetch("./data/juegos.xml");
        console.log("STATUS FETCH:", respuesta.status);
        const xmlString = await respuesta.text();

        const juegos = xmlToJSON(xmlString);

        renderJuegos(juegos);

    } catch {
        contenedor.innerHTML = "<p>Error cargando juegos</p>";
    }
}

document.addEventListener("DOMContentLoaded", cargarJuegos);