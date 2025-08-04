import { TranslateRequest } from '@/interfaces/translate/TranslateRequest';
import { translateAxios } from '../axios/translate-axios';
import { TranslateResponse } from '@/interfaces/translate/TranslateRespnse';

export const getTranslateText = async (translateRequest: TranslateRequest): Promise<TranslateResponse> => {
    try {
        const response = await translateAxios.post('/api/translate', translateRequest);
        return response.data;
    } catch (error) {
        console.error('번역 API 호출 실패:', error);
        throw error; // 또는 throw new Error('번역 API 에러');
    }
};
