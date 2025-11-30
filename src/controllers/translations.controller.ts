import { NextFunction, Request, Response } from "express";
import bibleRepository from "../repositories/BibleRepository.js";
import TranslationMapper from "../models/translation.mapper.js";

class TranslationsController {

    async getAllTranslations(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const translations = await bibleRepository.findAllTranslations();
            res.json(TranslationMapper.mapToTranslation(translations));
        } catch (error) {
            next(error);
        }
    }
}

export default new TranslationsController();