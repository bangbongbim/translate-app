import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function TranslateModal() {
    const [originalText, setOriginalText] = useState<string>('');
    return (
        <div className="flex flex-col w-[500px] p-5 items-center  h-full justify-center">
            <div className="flex flex-col gap-3 w-full h-[200px] bg-white border shadow-xl rounded-2xl p-4 text-black space-y-3">
                {/* 닫기 버튼 */}

                {/* 입력 영역 */}
                <textarea
                    autoFocus
                    className="w-full h-[100px] resize-none rounded border px-2 py-1 outline-none"
                    placeholder="번역할 텍스트 입력..."
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOriginalText(e.target.value)}
                />

                {/* 번역 버튼 */}
                <div className="flex justify-center">
                    <Button variant="outline" size="sm">
                        번역하기
                    </Button>
                </div>

                {/* 번역 결과 영역 */}
                <div className="w-full h-[100px] bg-gray-100 border text-sm rounded px-2 py-1 overflow-y-auto">
                    번역된 텍스트가 여기에 표시됩니다.
                </div>
            </div>
        </div>
    );
}
