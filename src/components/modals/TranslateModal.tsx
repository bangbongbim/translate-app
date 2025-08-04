import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { getTranslateText } from '@/api/translate/translate';
import { sourceLangs, targetLangsForCn, targetLangsForEn, targetLangsForJa, targetLangsForKo } from '@/\bconstants/languages';

export default function TranslateModal() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('ko');

    const targetLangList = useMemo(() => {
        switch (sourceLang) {
            case 'ko':
                return targetLangsForKo;
            case 'en':
                return targetLangsForEn;
            case 'ja':
                return targetLangsForJa;
            case 'zh-CN':
                return targetLangsForCn;
            // 필요시 다른 source 언어도 추가
            default:
                return [];
        }
    }, [sourceLang]);

    const translateText = async () => {
        try {
            const result = await getTranslateText({
                text,
                source: sourceLang,
                target: targetLang,
            });
            setTranslatedText(result.message.result.translatedText);
        } catch (err) {
            setTranslatedText('번역 실패');
        }
    };

    return (
        <div className="flex w-full h-full items-center justify-center p-4">
            <div className="flex flex-col gap-4 w-full h-full max-w-xl max-h-[700px] bg-white border shadow-xl rounded-2xl p-6 text-black">
                {/* 언어 선택 드롭다운 */}
                <div className="flex gap-2 items-center justify-center">
                    <select className="border rounded px-2 py-1 text-sm" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                        {sourceLangs.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                    <span className="text-gray-400 font-bold text-base">→</span>
                    <select className="border rounded px-2 py-1 text-sm" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                        {targetLangList.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 입력 영역 */}
                <textarea
                    autoFocus
                    className="w-full flex-1 min-h-[80px] max-h-[40%] resize-none rounded border px-2 py-1 outline-none"
                    placeholder="번역할 텍스트 입력..."
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                />

                {/* 번역 버튼 */}
                <div className="flex justify-center">
                    <Button variant="outline" size="sm" onClick={translateText}>
                        번역하기
                    </Button>
                </div>

                {/* 번역 결과 영역 */}
                <div className="w-full flex-1 min-h-[80px] max-h-[40%] bg-gray-100 border text-sm rounded px-2 py-1 overflow-y-auto">
                    {translatedText}
                </div>
            </div>
        </div>
    );
}
