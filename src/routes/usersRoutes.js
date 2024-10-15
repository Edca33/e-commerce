import express from 'express';
import { loginUser, registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Ruta para login de usuarios
router.post('/login', loginUser);

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para obtener perfil de usuario (protegida)
router.get('/profile', protect, getUserProfile);


export default router;
