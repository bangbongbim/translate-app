export default function TranslateModal() {
    return (
        <div className="w-[360px] h-[160px] bg-white border shadow-lg rounded p-4 text-black">
            <textarea autoFocus className="w-full h-full resize-none outline-none" placeholder="번역할 텍스트 입력..." />
        </div>
    );
}
