export interface Translation {
    code: string;
    name: string;
    license: string;
}

export interface VerseText {
    translationCode: string;
    text: string;
}

export interface Verse {
    verse: number;
    verseTexts: VerseText[];
}

export class BiblePassage {
    book: string;
    bookShortName: string;
    chapter: number;
    translations: Translation[];
    verses: Verse[];
    constructor(book: string, bookShortName: string, chapter: number, translations: Translation[], verses: Verse[]) {
        this.book = book;
        this.bookShortName = bookShortName;
        this.chapter = chapter;
        this.translations = translations;
        this.verses = verses;
    }
}
