// script.js

// Cargar libros desde localStorage o usar los de inicio si no hay nada
let libros = JSON.parse(localStorage.getItem("libros")) || [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        genero: "Realismo mágico",
        disponible: true
    },
    {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        genero: "Ficción",
        disponible: true
    }
];

// Guardar libros en localStorage
function guardarLibros() {
    localStorage.setItem("libros", JSON.stringify(libros));
}

// Simular lectura con callback
function leerLibros(callback) {
    setTimeout(() => {
        callback(libros);
    }, 500); // más rápido ahora
}

function consultarLibros() {
    leerLibros((data) => {
        const lista = document.getElementById("lista-libros");
        lista.innerHTML = "";
        data.forEach((libro) => {
            const li = document.createElement("li");
            li.textContent = `${libro.titulo} - ${libro.autor} (${libro.genero}) [${libro.disponible ? "Disponible" : "Prestado"}]`;
            lista.appendChild(li);
        });
    });
}

function agregarLibro(libro, callback) {
    setTimeout(() => {
        libros.push(libro);
        guardarLibros(); // ← guardar después de agregar
        callback();
    }, 500);
}

function agregarLibroHTML() {
    const titulo = document.getElementById("titulo").value.trim();
    const autor = document.getElementById("autor").value.trim();
    const genero = document.getElementById("genero").value.trim();

    if (titulo && autor && genero) {
        const nuevoLibro = { titulo, autor, genero, disponible: true };
        agregarLibro(nuevoLibro, () => {
            consultarLibros();
            alert("✅ Libro agregado");
            document.getElementById("titulo").value = "";
            document.getElementById("autor").value = "";
            document.getElementById("genero").value = "";
        });
    } else {
        alert("❌ Por favor llena todos los campos");
    }
}

function actualizarDisponibilidad(titulo, nuevoEstado, callback) {
    setTimeout(() => {
        const libro = libros.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());
        if (libro) {
            libro.disponible = nuevoEstado;
            guardarLibros(); // ← guardar después de actualizar
            callback();
        } else {
            alert("❌ Libro no encontrado");
        }
    }, 500);
}

function actualizarDisponibilidadHTML() {
    const titulo = document.getElementById("tituloActualizar").value.trim();
    const nuevoEstado = document.getElementById("nuevoEstado").value === "true";

    actualizarDisponibilidad(titulo, nuevoEstado, () => {
        consultarLibros();
        alert("🔁 Estado actualizado");
        document.getElementById("tituloActualizar").value = "";
    });
}

// Cargar libros automáticamente al abrir la página
window.onload = consultarLibros;

