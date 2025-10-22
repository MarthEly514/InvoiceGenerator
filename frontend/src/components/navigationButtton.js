
export function NavButton({ content = '', link = '' }) {
    return `
    <button 
        class="text-white xl:text-xl bg-[#697AFB] hover:bg-[#616dc2] transition-colors duration-300 font-semibold p-3 px-6 rounded-lg cursor-pointer">
        <a href="${link}">${content}</a>
    </button>
    `;
} 