import { BiblePassage, Translation } from "./bible-passage";

export class BiblePassageMapper {

    
    static mapToBookChapterInfo(verses: any): any | null {
        try {
        const versesPayload = verses[0];
        console.log(versesPayload);
        return {
            book: versesPayload.name,
            chapter: versesPayload.chapters[0].chapterNumber,
            numberOfVerses: versesPayload.chapters[0].verses.length
        }
        } catch (error) {
            throw error;
        }
    }

    static maptoBookInfo(book: any): any | null {
      const bookPayload = book[0];  
      try {
        return {
          book: bookPayload.name,
          bookShortName: bookPayload.shortName,
          numberOfChapters: bookPayload.chapters.length
        }
      } catch (error) {
        throw error;
      }
    }

    static maptoBooks(books: any): any | null {
      try {
        return books.map((b: any) => {
          return {
            book: b.name,
            bookShortName: b.shortName,
            numberOfChapters: b.chapters.length

          }
        });
      } catch (error) {
        throw error;
      }
    }


    static mapToBiblePassage(bookResult: any): BiblePassage | null {
    if (!bookResult) return null;
  
    const chapter = bookResult.chapters?.[0];
    if (!chapter) return null;
  
    // -------------------------------
    // Collect all translations used
    // -------------------------------
    const translationMap: Record<string, any> = {};
  
    chapter.verses.forEach((v: any) => {
      v.bibleTexts.forEach((bt: any) => {
        const t = bt.translation;
        if (!translationMap[t.code]) {
          translationMap[t.code] = {
            code: t.code,
            name: t.name,
            license: t.license,
            language: t.language,
          };
        }
      });
    });
  
    const translations = Object.values(translationMap) as Translation[];
  
    // -------------------------------
    // Build verses with multiple texts
    // -------------------------------
    const verses = chapter.verses.map((v: any) => ({
      verse: v.verseNumber,
      texts: v.bibleTexts.map((bt: any) => ({
        translation: bt.translation.code,
        text: bt.text,
      })),
    }));
    
    // -------------------------------
    // Final DTO
    // -------------------------------
    return new BiblePassage(bookResult.name, bookResult.shortName, chapter.chapterNumber, translations, verses);
  }
}