import express from 'express';
import bibleApiController from '../controllers/bible-api.controller.js';

const router = express.Router();
router.get('/', bibleApiController.getAllBooks.bind(bibleApiController));
router.get('/:bookName', bibleApiController.getBookInfo.bind(bibleApiController));
router.get('/:bookName/chapters/:chapterNumber', bibleApiController.getChapterInfo.bind(bibleApiController));
router.get('/:bookName/chapters/:chapterNumber/verses', bibleApiController.getVerseRange.bind(bibleApiController));

export default router;

