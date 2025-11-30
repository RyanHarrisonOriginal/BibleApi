import express from 'express';
import translationsController from '../controllers/translations.controller.js';

const router = express.Router();
router.get('/', translationsController.getAllTranslations.bind(translationsController));

export default router;