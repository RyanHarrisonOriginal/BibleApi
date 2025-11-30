import Translation from "./translation";

class TranslationMapper {

    static mapToTranslation(translation: any): Translation {


        return translation.map((t: any) => {
            return {
            code: t.code,
            name: t.name,
            license: t.license,
            language: t.language,
        }
    });
    }
}

export default TranslationMapper;