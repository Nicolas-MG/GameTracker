import { useState } from "react";
import { motion } from "framer-motion";
import { createGame } from "../services/api";

const GameForm = ({ onGameAdded }) => {
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    yearLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGame(form);
    setForm({
      titulo: "",
      genero: "",
      plataforma: "",
      yearLanzamiento: "",
      desarrollador: "",
      imagenPortada: "",
      descripcion: "",
      completado: false,
    });
    if (onGameAdded) onGameAdded();
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg p-6 rounded-2xl space-y-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold">Agregar Juego</h2>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
        required
      />
      <input
        type="text"
        name="genero"
        placeholder="Género"
        value={form.genero}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
        required
      />
      <input
        type="text"
        name="plataforma"
        placeholder="Plataforma"
        value={form.plataforma}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
        required
      />
      <input
        type="number"
        name="yearLanzamiento"
        placeholder="Año de lanzamiento"
        value={form.yearLanzamiento}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <input
        type="text"
        name="imagenPortada"
        placeholder="URL Imagen"
        value={form.imagenPortada}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        className="w-full border rounded-lg p-2"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg">
        Guardar
      </button>
    </motion.form>
  );
};

export default GameForm;
