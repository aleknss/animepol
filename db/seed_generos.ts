import { db } from "@/lib/db";
import { generos } from "./schema";

async function insertarGenerosBase() {
  console.log("⏳ Insertando géneros de anime en la base de datos...");

  const listaGeneros = [
    { nombre: "Shonen" },
    { nombre: "Seinen" },
    { nombre: "Shojo" },
    { nombre: "Josei" },
    { nombre: "Isekai" },
    { nombre: "Mecha" },
    { nombre: "Cyberpunk" },
    { nombre: "Slice of Life" },
    { nombre: "Fantasía" },
    { nombre: "Sci-Fi (Ciencia Ficción)" },
    { nombre: "Acción" },
    { nombre: "Aventura" },
    { nombre: "Drama" },
    { nombre: "Comedia" },
    { nombre: "Romance" },
    { nombre: "Misterio" },
    { nombre: "Terror / Horror" },
    { nombre: "Deportes (Spokon)" },
    { nombre: "Magia" },
    { nombre: "Psicológico" },
  ];

  try {
    // Insertamos todos de golpe
    const resultado = await db
      .insert(generos)
      .values(listaGeneros)
      .onConflictDoNothing({ target: generos.nombre }) // Si ya existe el nombre, lo ignora
      .returning(); // Nos devuelve los datos que SÍ se insertaron

    console.log(`✅ ¡Éxito! Se insertaron ${resultado.length} géneros nuevos.`);
  } catch (error) {
    console.error("❌ Error insertando los géneros:", error);
  }
  process.exit(0);
}

// Ejecutamos la función
insertarGenerosBase();
