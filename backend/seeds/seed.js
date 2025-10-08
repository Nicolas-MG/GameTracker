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
        yearLanzamiento: 2022,
        desarrollador: "FromSoftware",
        imagenPortada: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
        descripcion: "Un RPG de mundo abierto desafiante y épico.",
        completado: false,
      },
      {
        titulo: "The Legend of Zelda: Breath of the Wild",
        genero: "Aventura",
        plataforma: "Nintendo Switch",
        yearLanzamiento: 2017,
        desarrollador: "Nintendo",
        imagenPortada: "https://media.vandal.net/i/640x360/5-2023/202351018164127_1.jpg",
        descripcion: "Explora Hyrule en una aventura sin límites.",
        completado: true,
      },
      {
        titulo: "Halo Infinite",
        genero: "Shooter",
        plataforma: "Xbox",
        yearLanzamiento: 2021,
        desarrollador: "343 Industries",
        imagenPortada: "https://wallpapers.com/images/hd/4k-master-chief-spartan-members-buzmpfqfcnxprrft.jpg",
        descripcion: "La nueva era del Jefe Maestro.",
        completado: false,
      },
      {
    titulo: "God of War Ragnarök",
    genero: "Aventura, Acción",
    plataforma: "PlayStation",
    yearLanzamiento: 2022,
    desarrollador: "Santa Monica Studio",
    imagenPortada: "https://assetsio.gnwcdn.com/god-war-ragnarok-2799417.png?width=690&quality=80&format=jpg&dpr=3&auto=webp",
    descripcion: "Una aventura épica basada en la mitología nórdica.",
    completado: true,
  },
  {
    titulo: "Minecraft",
    genero: "Supervivencia, Sandbox",
    plataforma: "PC",
    yearLanzamiento: 2011,
    desarrollador: "Mojang",
    imagenPortada: "https://img.redbull.com/images/c_crop,x_1015,y_0,h_1320,w_990/c_fill,w_450,h_600/q_auto,f_auto/redbullcom/2025/8/11/dcusojkfgapu4zxe3gtb/minecraft-paisaje",
    descripcion: "Crea y explora mundos infinitos.",
    completado: false,
  },
  {
    titulo: "The Witcher 3: Wild Hunt",
    genero: "RPG",
    plataforma: "PlayStation",
    yearLanzamiento: 2015,
    desarrollador: "CD Projekt Red",
    imagenPortada: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/ad9240e088f953a84aee814034c50a6a92bf4516/header.jpg?t=1758877408",
    descripcion: "Un RPG de mundo abierto con una historia profunda y envolvente.",
    completado: true,
  },
  {
    "titulo": "Red Dead Redemption 2",
    "genero": "Acción, Aventura",
    "plataforma": "Xbox",
    "yearLanzamiento": 2018,
    "desarrollador": "Rockstar Games",
    "imagenPortada": "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    "descripcion": "Un western épico con una historia envolvente y mundo abierto detallado.",
    "completado": true
  },
  {
    "titulo": "Cyberpunk 2077",
    "genero": "RPG, Mundo Abierto",
    "plataforma": "PC",
    "yearLanzamiento": 2020,
    "desarrollador": "CD Projekt Red",
    "imagenPortada": "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    "descripcion": "Explora Night City como un mercenario en un futuro distópico.",
    "completado": false
  },
  {
    "titulo": "Super Mario Odyssey",
    "genero": "Plataformas",
    "plataforma": "Nintendo Switch",
    "yearLanzamiento": 2017,
    "desarrollador": "Nintendo",
    "imagenPortada": "https://upload.wikimedia.org/wikipedia/en/8/8d/Super_Mario_Odyssey.jpg",
    "descripcion": "Acompaña a Mario en un viaje alrededor del mundo para rescatar a Peach.",
    "completado": true
  },
  {
    "titulo": "Hades",
    "genero": "Roguelike, Acción",
    "plataforma": "Xbox",
    "yearLanzamiento": 2020,
    "desarrollador": "Supergiant Games",
    "imagenPortada": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000033131/dbc8c55a21688b446a5c57711b726956483a14ef8c5ddb861f897c0595ccb6b5",
    "descripcion": "Escapa del inframundo en este intenso juego de acción y mitología griega.",
    "completado": false
  }
    
    ]);

    console.log("🎮 Juegos insertados");

    // Insertar reseñas
    await Review.insertMany([
      {
        juegoId: games[0]._id,
        puntuacion: 5,
        textoReview: "Uno de los mejores RPG que he jugado.",
        horasJugadas: 60,
        dificultad: "Difícil",
        recomendaria: true,
      },
      {
        juegoId: games[1]._id,
        puntuacion: 4,
        textoReview: "Hermoso y desafiante, aunque algo repetitivo.",
        horasJugadas: 100,
        dificultad: "Normal",
        recomendaria: true,
      },
      {
        juegoId: games[2]._id,
        puntuacion: 3,
        textoReview: "Buen multijugador, pero la campaña floja.",
        horasJugadas: 20,
        dificultad: "Fácil",
        recomendaria: false,
      },
      {
    juegoId: games[3]._id,
    puntuacion: 5,
    textoReview: "Una historia impresionante, con combates espectaculares.",
    horasJugadas: 80,
    dificultad: "Difícil",
    recomendaria: true,
  },
  {
    juegoId: games[4]._id,
    puntuacion: 4,
    textoReview: "Es un clásico, pero algunas mecánicas pueden volverse repetitivas.",
    horasJugadas: 150,
    dificultad: "Normal",
    recomendaria: true,
  },
  {
    juegoId: games[5]._id,
    puntuacion: 5,
    textoReview: "Un juego fantástico, lleno de historia y acción. El mejor RPG de su época.",
    horasJugadas: 120,
    dificultad: "Difícil",
    recomendaria: true,
  },
   {
    juegoId: games[6]._id, 
    puntuacion: 5,
    textoReview: "Increíble historia y atención al detalle. Una obra maestra.",
    horasJugadas: 120,
    dificultad: "Normal",
    recomendaria: true
  },
  {
    juegoId: games[7]._id, 
    puntuacion: 4,
    textoReview: "Buen juego tras las actualizaciones, pero aún con bugs menores.",
    horasJugadas: 85,
    dificultad: "Normal",
    recomendaria: true
  },
  {
    juegoId: games[8]._id, 
    puntuacion: 5,
    textoReview: "Diversión pura. Cada mundo es único y encantador.",
    horasJugadas: 50,
    dificultad: "Fácil",
    recomendaria: true
  },
  {
    juegoId: games[9]._id, 
    puntuacion: 5,
    textoReview: "Adictivo y muy bien diseñado. La rejugabilidad es altísima.",
    horasJugadas: 70,
    dificultad: "Difícil",
    recomendaria: true
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
