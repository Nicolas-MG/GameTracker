import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  yearLanzamiento: { type: Number, required: true },
  desarrollador: { type: String, requiered: true },
  imagenPortada: { type: String, required: true},
  descripcion: { type: String, required: true },
  completado: { type: Boolean, default: false },
  fechaCreacion: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);
export default Game;
