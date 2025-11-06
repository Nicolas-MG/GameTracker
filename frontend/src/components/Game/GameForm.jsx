import { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function GameForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    genre: '',
    releaseYear: '',
    rating: '',
    status: 'Not Started',
    hoursPlayed: 0,
    coverImage: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    },
    maxFiles: 1
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.platform) newErrors.platform = 'Platform is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      if (id) {
        await axios.put(`/api/games/${id}`, data);
      } else {
        await axios.post('/api/games', data);
      }
      
      navigate('/games');
    } catch (error) {
      console.error('Error saving game:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {id ? 'Edit Game' : 'Add New Game'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Drag & Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${errors.coverImage ? 'border-red-500' : ''}`}
        >
          <input {...getInputProps()} />
          
          {preview ? (
            <div className="relative">
              <motion.img
                src={preview}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                  setFormData(prev => ({ ...prev, coverImage: null }));
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ) : (
            <div className="text-gray-500">
              <p>Drag and drop your game cover here, or click to select</p>
              <p className="text-sm mt-2">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
        </div>

        {/* Game Details Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm
                ${errors.title ? 'border-red-500' : 'border-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Platform *
            </label>
            <input
              type="text"
              value={formData.platform}
              onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm
                ${errors.platform ? 'border-red-500' : 'border-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.platform && (
              <p className="text-red-500 text-xs mt-1">{errors.platform}</p>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Genre *
            </label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm
                ${errors.genre ? 'border-red-500' : 'border-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.genre && (
              <p className="text-red-500 text-xs mt-1">{errors.genre}</p>
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Release Year
            </label>
            <input
              type="number"
              value={formData.releaseYear}
              onChange={(e) => setFormData(prev => ({ ...prev, releaseYear: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Abandoned">Abandoned</option>
            </select>
          </motion.div>

          <motion.div whileHover={{ scale: 1.01 }} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Hours Played
            </label>
            <input
              type="number"
              value={formData.hoursPlayed}
              onChange={(e) => setFormData(prev => ({ ...prev, hoursPlayed: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <motion.button
            type="button"
            onClick={() => navigate('/games')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </motion.button>
          
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 text-white bg-blue-500 rounded-lg
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}
              flex items-center space-x-2`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <span>Save Game</span>
            )}
          </motion.button>
        </div>
      </form>

      {/* Preview Card */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-4 bg-white rounded-lg shadow-lg"
          >
            <h3 className="text-lg font-semibold mb-4">Preview Card</h3>
            <div className="flex space-x-4">
              <img src={preview} alt="Game cover" className="w-32 h-32 object-cover rounded-lg" />
              <div>
                <h4 className="font-medium">{formData.title || 'Game Title'}</h4>
                <p className="text-sm text-gray-600">{formData.platform || 'Platform'}</p>
                <p className="text-sm text-gray-600">{formData.genre || 'Genre'}</p>
                <p className="text-sm text-gray-600">{formData.status}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
