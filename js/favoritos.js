console.log("FAVORITOS CARGADO");

import { db } from "./firebase.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

// ==========================
// CARGAR FAVORITOS
// ==========================
async function cargarFavoritos() {
    const contenedor = document.getElementById("listaFavoritos");
    if (!contenedor) return;

    contenedor.innerHTML = "<p>Cargando favoritos...</p>";

    try {
        const snapshot = await getDocs(collection(db, "favoritos"));

        if (snapshot.empty) {
            contenedor.innerHTML = `
                <p class="mensaje-vacio">
                    No tienes favoritos todavía
                </p>
            `;
            return;
        }

        let html = "";

        snapshot.forEach((doc) => {
            const data = doc.data();

            html += `
                <article class="tarjeta-favorito">
                    <h3>${data.name ?? "Sin nombre"}</h3>
                    <p>${data.description ?? "Sin descripción"}</p>
                    <p><small>${data.date ?? ""}</small></p>
                </article>
            `;
        });

        contenedor.innerHTML = html;

    } catch (error) {
        console.error("Error cargando favoritos:", error);

        contenedor.innerHTML = `
            <p>Error al cargar favoritos</p>
        `;
    }
}

// ==========================
// AÑADIR FAVORITO
// ==========================
export async function añadirFavorito(item) {
    try {
        if (!item || !item.name) {
            console.warn("Item inválido:", item);
            return;
        }

        const favorito = {
            name: item.name,
            description: item.description ?? "Sin descripción",
            gender: item.gender ?? "Unknown",
            race: item.race ?? "Unknown",
            date: new Date().toLocaleString()
        };

        const docRef = await addDoc(collection(db, "favoritos"), favorito);

        console.log("Favorito añadido ✔ ID:", docRef.id);

        // Recargar lista automáticamente
        cargarFavoritos();

    } catch (error) {
        console.error("Error al añadir favorito:", error);
    }
}

// ==========================
// INIT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    cargarFavoritos();
});