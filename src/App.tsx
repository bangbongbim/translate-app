import '@/styles/global.css';

function App() {
    return (
        <div className="flex flex-col items-center justify-start w-[780px] min-h-[500px] bg-[#f6fafd] p-8 rounded-3xl shadow-xl mx-auto">
            {/* 설명 영역 */}
            <div className="mb-5 w-full max-w-[700px] p-6 bg-gradient-to-r from-[#1389ff] to-[#02c7f2] rounded-2xl shadow text-white">
                <h2 className="text-xl font-bold mb-3">🔤 AI 번역기 사용법</h2>
                <p className="text-base mb-3">
                    이 번역기는 <span className="font-bold text-white underline">Papago</span>를 활용해
                    <br />
                    원하는 텍스트를 다양한 언어로 빠르게 번역할 수 있습니다.
                </p>
                <ul className="list-disc list-inside text-base pl-2 space-y-1 text-white/90">
                    <li>
                        <b>Cmd + Shift + T</b>단축키로 번역 모달을 열 수 있습니다.
                    </li>
                    <li>
                        <b>원천 언어</b>와 <b>대상 언어</b>를 드롭다운에서 선택해 주세요.
                    </li>
                    <li>
                        <b>번역할 텍스트</b>를 입력한 뒤 <span className="font-bold text-yellow-200">[번역하기]</span> 버튼을 누르면 결과가
                        바로 아래에 표시됩니다.
                    </li>
                    <li>
                        <b>결과 텍스트</b>는 바로 복사해서 쓸 수 있습니다.
                    </li>
                </ul>
                <p className="text-xs text-white/60 mt-4">※ 번역 품질은 입력 내용과 엔진에 따라 달라질 수 있습니다.</p>
            </div>
            {/* 아래에 실제 번역 입력/출력 UI가 들어가면 됩니다 */}
        </div>
    );
}

export default App;
