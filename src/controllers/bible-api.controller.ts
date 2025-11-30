import { Request, Response, NextFunction } from 'express';
import bibleRepository from '../repositories/BibleRepository.js';
import { BiblePassageMapper } from '../models/bible-passage.mapper.js';

class BibleApiController {
  async getAllBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { translation } = req.query;
      const books = await bibleRepository.findAllBooks(translation ? String(translation) : 'BSB');
      res.json(BiblePassageMapper.maptoBooks(books));
    } catch (error) {
      next(error);
    }
  }

  async getBookInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookName } = req.params;
      const chapters = await bibleRepository.findBookInfo(bookName);
      res.json(BiblePassageMapper.maptoBookInfo(chapters));
    } catch (error) {
      next(error);
    }
  }

  async getChapterInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookName, chapterNumber } = req.params;

      const verses = await bibleRepository.findChapterInfo(
        bookName,
        Number(chapterNumber)
      );

      if (!verses) {
        res.status(404).json({ message: 'Chapter not found' });
        return;
      }

      res.json(BiblePassageMapper.mapToBookChapterInfo(verses));
    } catch (error) {
      next(error);
    }
  }

  async getVerseRange(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookName, chapterNumber } = req.params;
      const { start, end, translation } = req.query;

      

      const result = await bibleRepository.findVerseText(
        bookName,
        Number(chapterNumber),
        Number(start),
        Number(end),
        translation ? String(translation) : undefined
      );

      if (!result) {
        res.status(404).json({ message: 'Verses not found' });
        return;
      }

      res.json(BiblePassageMapper.mapToBiblePassage(result));
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

export default new BibleApiController();

