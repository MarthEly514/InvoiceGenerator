export default function Card({ mode, icon, title, content }) {
    return (
        <div className={`w-full max-w-sm aspect-4/3 rounded-2xl border border-white/30 flex flex-col items-center justify-between p-10 hover:scale-103 hover:shadow-[#607afb33] ${mode ? 'shadow-neutral-200 shadow-2xl' : 'shadow-xl'} transition-all duration-300`}>
            {icon}
            <div className="w-full text-center flex flex-col items-center gap-3">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="font-light opacity-40">{content}</p>
            </div>
        </div >
    )
}