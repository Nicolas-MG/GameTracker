import { useState } from "react";
import { motion } from "framer-motion";
import { createGame } from "../../services/api";
import './GameForm.css';

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
      className="game-form"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="form-title">Agregar Juego</h2>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={form.titulo}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="text"
        name="genero"
        placeholder="Género"
        value={form.genero}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="text"
        name="plataforma"
        placeholder="Plataforma"
        value={form.plataforma}
        onChange={handleChange}
        className="input-field"
        required
      />
      <input
        type="number"
        name="yearLanzamiento"
        placeholder="Año de lanzamiento"
        value={form.yearLanzamiento}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="imagenPortada"
        placeholder="URL Imagen"
        value={form.imagenPortada}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="text"
        name="desarrollador"
        placeholder="Desarrollador"
        value={form.desarrollador}
        onChange={handleChange}
        className="input-field"
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={handleChange}
        className="input-textarea"
      />
      <button className="submit-button">Guardar</button>
    </motion.form>
  );
};

export default GameForm;
