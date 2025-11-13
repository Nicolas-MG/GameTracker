import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { updateGame } from "../../../services/api";
import "./EditGame.css";
import { useDropzone } from "react-dropzone";

const EditGame = ({ game, onClose, onSave }) => {
  const [form, setForm] = useState({
    titulo: game.titulo,
    genero: game.genero,
    plataforma: game.plataforma,
    descripcion: game.descripcion,
    desarrollador: game.desarrollador,
    yearLanzamiento: game.yearLanzamiento,
    imagenPortada: game.imagenPortada,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const blockInvalidNumberKeys = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
  };

  const handleYearChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const limitedDigits = digits.slice(0, 4);
    setForm({ ...form, yearLanzamiento: limitedDigits });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateGame(game._id, form);
    onSave();
    onClose();
  };

  const handleDrop = (acceptedFiles) => {
    const image = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imagenPortada: reader.result }));
    };
    if (image) reader.readAsDataURL(image);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
  });

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <button
            className="close-button"
            onClick={onClose}
          >
            ✖
          </button>

          <h2 className="modal-title">Editar Juego</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="modal-label" htmlFor="titulo">Título</label>
              <input
                type="text"
                name="titulo"
                id="titulo"
                value={form.titulo}
                onChange={handleChange}
                className="modal-input"
                required
              />
            </div>

            <div>
              <label className="modal-label" htmlFor="genero">Género</label>
              <select
                name="genero"
                id="genero"
                value={form.genero}
                onChange={handleChange}
                className="modal-input"
                required
              >
                <option value="">Selecciona un género</option>
                {(["Acción", "Aventura", "RPG", "Deportes", "Estratégia", "Simulación"]).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="modal-label" htmlFor="plataforma">Plataforma</label>
              <select
                name="plataforma"
                id="plataforma"
                value={form.plataforma}
                onChange={handleChange}
                className="modal-input"
                required
              >
                <option value="">Selecciona una plataforma</option>
                {(["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"]).map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="modal-label" htmlFor="yearLanzamiento">Año de lanzamiento</label>
              <input
                type="number"
                name="yearLanzamiento"
                id="yearLanzamiento"
                placeholder="Año de lanzamiento"
                value={form.yearLanzamiento}
                onChange={handleYearChange}
                onKeyDown={blockInvalidNumberKeys}
                min={1000}
                step={0}
                inputMode="numeric"
                className="modal-input"
                required
              />
            </div>

            <div>
              <label className="modal-label" htmlFor="desarrollador">Desarrollador</label>
              <input
                type="text"
                name="desarrollador"
                id="desarrollador"
                value={form.desarrollador}
                onChange={handleChange}
                className="modal-input"
                required
              />
            </div>

            <div>
              <label className="modal-label" htmlFor="imagenPortada">URL de imagen de portada</label>
              <input
                type="text"
                name="imagenPortada"
                id="imagenPortada"
                value={form.imagenPortada}
                onChange={handleChange}
                className="modal-input"
                required
              />
            </div>

            <div {...getRootProps()} className="dropzone-container">
              <input {...getInputProps()} />
              <p>Arrastra y suelta la imagen o haz clic para seleccionar</p>
              {form.imagenPortada && (
                <img src={form.imagenPortada} alt="Portada" className="preview-image" />
              )}
            </div>

            <div>
              <label className="modal-label" htmlFor="descripcion">Descripción</label>
              <textarea
                name="descripcion"
                id="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="modal-input"
                required
              />
            </div>

          <button
            type="submit"
            className="modal-button"
          >
            Guardar Cambios
          </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditGame;
