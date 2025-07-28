import { translateAxios } from '../axios/translate-axios';

export interface TranslateRequest {
    text: string;
    source: string;
    target: string;
}

export interface TranslateResult {
    srcLangType: string;
    tarLangType: string;
    translatedText: string;
}

export interface TranslateMessage {
    result: TranslateResult;
}

export interface TranslateResponse {
    message: TranslateMessage;
}

export const getTranslateText = async (translateRequest: TranslateRequest): Promise<TranslateResponse> => {
    try {
        const response = await translateAxios.post('/api/translate', translateRequest);
        return response.data;
    } catch (error) {
        console.error('번역 API 호출 실패:', error);
        throw error; // 또는 throw new Error('번역 API 에러');
    }
};
