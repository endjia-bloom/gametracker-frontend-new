// gametracker-frontend/src/services/JuegoService.js
import axios from 'axios';

// La URL base de tu Backend. Debe coincidir con el puerto donde corre Express.
const API_URL = 'http://localhost:4000/api/juegos'; 

export const JuegoService = {
    // READ ALL: GET /api/juegos
    getAllJuegos: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    // CREATE: POST /api/juegos
    createJuego: async (juegoData) => {
        const response = await axios.post(API_URL, juegoData);
        return response.data;
    },
    
    // READ BY ID: GET /api/juegos/:id
    getJuegoById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    // UPDATE: PUT /api/juegos/:id
    updateJuego: async (id, juegoData) => {
        const response = await axios.put(`${API_URL}/${id}`, juegoData);
        return response.data;
    },

    // DELETE: DELETE /api/juegos/:id
    deleteJuego: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    },
};