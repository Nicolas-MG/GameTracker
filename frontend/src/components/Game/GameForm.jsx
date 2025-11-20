import { useState } from "react";
import { motion } from "framer-motion";
import { createGame } from "../../services/api";
import { useDropzone } from 'react-dropzone';
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
    const { name, value } = e.target;
    if (value.startsWith(' ')) return;
    setForm({ ...form, [name]: value });
  };

  const blockInvalidNumberKeys = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
  };

  const handleYearChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    const limitedDigits = digits.slice(0, 4);
    setForm({ ...form, yearLanzamiento: limitedDigits });
  };

  const handleDrop = (acceptedFiles) => {
    const image = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prevForm) => ({
        ...prevForm,
        imagenPortada: reader.result,
      }));
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!form.titulo.trim() || !form.genero.trim() || !form.plataforma.trim() || !form.descripcion.trim()) {
      alert("Por favor completa todos los campos obligatorios correctamente");
      return;
    }
    
    // Limpiar todos los valores antes de enviar
    const cleanedForm = Object.keys(form).reduce((acc, key) => {
      acc[key] = typeof form[key] === 'string' ? form[key].trim() : form[key];
      return acc;
    }, {});
    
    await createGame(cleanedForm);
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: 'image/*',
  });
  const generos = ["Acción", "Aventura", "RPG", "Deportes", "Estratégia", "Simulación"];
  const plataformas = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"];

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

      <select
        name="genero"
        value={form.genero}
        onChange={handleChange}
        className="input-field"
        required
      >
        <option value="">Selecciona un género</option>
        {generos.map((genero, index) => (
          <option key={index} value={genero}>
            {genero}
          </option>
        ))}
      </select>

      <select
        name="plataforma"
        value={form.plataforma}
        onChange={handleChange}
        className="input-field"
        required
      >
        <option value="">Selecciona una plataforma</option>
        {plataformas.map((plataforma, index) => (
          <option key={index} value={plataforma}>
            {plataforma}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="yearLanzamiento"
        placeholder="Año de lanzamiento"
        value={form.yearLanzamiento}
        onChange={handleYearChange}
        onKeyDown={blockInvalidNumberKeys}
        min={0}
        step={1}
        inputMode="numeric"
        className="input-field"
      />

      <div
        {...getRootProps()}
        className="dropzone-container"
      >
        <input {...getInputProps()} />
        <p>Arrastra y suelta la imagen o haz clic para seleccionar una</p>
        {form.imagenPortada && (
          <img src={form.imagenPortada} alt="Portada del juego" className="preview-image" />
        )}
      </div>

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