import { LangOption } from '@/interfaces/language/language';

export const sourceLangs: LangOption[] = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: '영어' },
    { code: 'ja', label: '일본어' },
    { code: 'zh-CN', label: '중국어' },
    // 필요에 따라 추가
];

export const targetLangsForKo: LangOption[] = [
    { code: 'en', label: '영어' },
    { code: 'ja', label: '일본어' },
    { code: 'zh-CN', label: '중국어(간체)' },
    { code: 'zh-TW', label: '중국어(번체)' },
    { code: 'vi', label: '베트남어' },
    { code: 'th', label: '태국어' },
    { code: 'id', label: '인도네시아어' },
    { code: 'fr', label: '프랑스어' },
    { code: 'es', label: '스페인어' },
    { code: 'ru', label: '러시아어' },
    { code: 'de', label: '독일어' },
    { code: 'it', label: '이탈리아어' },
];

export const targetLangsForEn: LangOption[] = [
    { code: 'ko', label: '한국어' },
    { code: 'ja', label: '일본어' },
    { code: 'zh-CN', label: '중국어(간체)' },
    { code: 'zh-TW', label: '중국어(번체)' },
    { code: 'vi', label: '베트남어' },
    { code: 'th', label: '태국어' },
    { code: 'id', label: '인도네시아어' },
    { code: 'fr', label: '프랑스어' },
    { code: 'es', label: '스페인어' },
    { code: 'ru', label: '러시아어' },
    { code: 'de', label: '독일어' },
];

export const targetLangsForJa: LangOption[] = [
    { code: 'zh-CN', label: '중국어(간체)' },
    { code: 'zh-TW', label: '중국어(번체)' },
    { code: 'vi', label: '베트남어' },
    { code: 'th', label: '태국어' },
    { code: 'id', label: '인도네시아어' },
    { code: 'fr', label: '프랑스어' },
];

export const targetLangsForCn: LangOption[] = [{ code: 'zh-TW', label: '중국어(번체)' }];
