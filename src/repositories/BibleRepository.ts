import { prisma } from '../lib/prisma.js';
import { Book, Translation } from '@prisma/client';

class BibleRepository {

  

  private handleVerseFilter(startVerse?: number, endVerse?: number) {
    const filter: any = {};
    console.log(startVerse, endVerse);
  
    if (startVerse) filter.gte = startVerse;
    if (endVerse) filter.lte = endVerse;
  
    return Object.keys(filter).length > 0
      ? { verseNumber: filter }
      : undefined;
  }

  private handleTranslationFilter(translationCode?: string) {
    return translationCode ?
      {
        translation: {
          code: {
            equals: translationCode,
            mode: 'insensitive' as const,
          },
        },
      } : undefined;
  }

  async findAllBooks(translation?: string): Promise<Book[]> {
    return await prisma.book.findMany({
      where: {
        chapters: {
          some: {
            verses: {
              some: {
                bibleTexts: {
                  some: {
                    ...this.handleTranslationFilter(translation),
                  },
                },
              },
            },
          },
        },
      },
      include: {
        chapters: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findBookInfo(bookName: string): Promise<Book[]> {
    return await prisma.book.findMany({
      where: {
        OR: [
          { name: { equals: bookName, mode: 'insensitive' } },
          { shortName: { equals: bookName, mode: 'insensitive' } },
        ],
      },
      include: {
        chapters: true,
      },
    });
  }

  async findChapterInfo(bookName: string, chapterNumber: number): Promise<Book[]> {
    return await prisma.book.findMany({
      where: {
        OR: [
          { name: { equals: bookName, mode: 'insensitive' } },
          { shortName: { equals: bookName, mode: 'insensitive' } },
        ],
        chapters: {
          some: {
            chapterNumber: chapterNumber,
          },
        },
      },
      include: {
        chapters: {
          where: {
            chapterNumber: chapterNumber,
          },
          include: {
            verses: true,
          },
        },
      },
    });
  }

  async findVerseText(
    bookName: string,
    chapterNumber: number,
    startVerse: number,
    endVerse: number,
    translationCode?: string
  ) {
    return await prisma.book.findFirst({
      where: {
        OR: [
          { name: { equals: bookName, mode: 'insensitive' } },
          { shortName: { equals: bookName, mode: 'insensitive' } },
        ],
      },
      include: {
        chapters: {
          where: { chapterNumber },
          include: {
            verses: {
              where: this.handleVerseFilter(startVerse, endVerse),
              include: {
                bibleTexts: {
                  where: this.handleTranslationFilter(translationCode),
                  include: {
                    translation: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findAllTranslations(): Promise<Translation[]> {
    return await prisma.translation.findMany();
  }
}



export default new BibleRepository();

