import mongoose from "mongoose";
import dotenv from "dotenv";

import Game from "../models/Game.js";
import Review from "../models/Review.js";

dotenv.config();

const seedData = async () => {
  try {
    // Conexión a MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas");

    // Limpiar colecciones
    await Game.deleteMany({});
    await Review.deleteMany({});
    console.log("🧹 Colecciones limpias");

    // Insertar juegos
    const games = await Game.insertMany([
      {
        titulo: "Elden Ring",
        genero: "RPG",
        plataforma: "PC",
        añoLanzamiento: 2022,
        desarrollador: "FromSoftware",
        imagenPortada: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
        descripcion: "Un RPG de mundo abierto desafiante y épico.",
        completado: false,
      },
      {
        titulo: "The Legend of Zelda: Breath of the Wild",
        genero: "Aventura",
        plataforma: "Nintendo Switch",
        añoLanzamiento: 2017,
        desarrollador: "Nintendo",
        imagenPortada: "https://cdn.cloudflare.steamstatic.com/zelda/header.jpg",
        descripcion: "Explora Hyrule en una aventura sin límites.",
        completado: true,
      },
      {
        titulo: "Halo Infinite",
        genero: "Shooter",
        plataforma: "Xbox",
        añoLanzamiento: 2021,
        desarrollador: "343 Industries",
        imagenPortada: "https://cdn.cloudflare.steamstatic.com/halo/header.jpg",
        descripcion: "La nueva era del Jefe Maestro.",
        completado: false,
      }
    ]);

    console.log("🎮 Juegos insertados");

    // Insertar reseñas
    await Review.insertMany([
      {
        juegoId: games[0]._id,
        puntuacion: 5,
        textoReseña: "Uno de los mejores RPG que he jugado.",
        horasJugadas: 60,
        dificultad: "Difícil",
        recomendaria: true,
      },
      {
        juegoId: games[1]._id,
        puntuacion: 4,
        textoReseña: "Hermoso y desafiante, aunque algo repetitivo.",
        horasJugadas: 100,
        dificultad: "Normal",
        recomendaria: true,
      },
      {
        juegoId: games[2]._id,
        puntuacion: 3,
        textoReseña: "Buen multijugador, pero la campaña floja.",
        horasJugadas: 20,
        dificultad: "Fácil",
        recomendaria: false,
      }
    ]);

    console.log("⭐ Reseñas insertadas");

    process.exit();
  } catch (error) {
    console.error("❌ Error en el seed:", error);
    process.exit(1);
  }
};

seedData();
