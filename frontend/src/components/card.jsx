export function Card({mode, icon, title, content = ''}) {
    return `
    <div class="w-full max-w-sm aspect-4/3 rounded-2xl border border-white/30 flex flex-col items-center justify-between p-10 hover:scale-103 hover:shadow-[#607afb60] ${mode?'shadow-neutral-200 shadow-2xl':'shadow-xl'} transition-all duration-300">
        <i data-lucide=${icon} class="text-[#607AFB] w-13 h-13"></i>
       <div class="w-full text-center flex flex-col items-center gap-3">
            <h1 class="text-lg font-semibold">${title}</h1>
            <p class="font-light opacity-40">${content}</p>
       </div>
    </div>
    `;
} 