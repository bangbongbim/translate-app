export interface TranslateResponse {
    message: {
        result: {
            srcLangType: string;
            tarLangType: string;
            translatedText: string;
        };
    };
}
