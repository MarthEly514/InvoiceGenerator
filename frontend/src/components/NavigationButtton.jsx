export function NavButton({ mode, content, onclick, link, type = 'secondary' }) {
    return (
        <button
            className={`${mode ? `${type == 'primary' ? 'text-white bg-[#697AFB] hover:bg-[#616dc2]' : 'text-[#697AFB] border-2 border-[#697AFB] hover:bg-[#616dc2] hover:border-[#616dc2]'} hover:text-white` : `${type == 'primary' ? 'text-neutral-800 bg-white hover:bg-white/60' : 'text-white/60 border-2 border-white/60 hover:bg-white/60 hover:text-neutral-700'}`}  transition-colors duration-300 font-semibold p-3 px-6 rounded-full cursor-pointer`} href={link}
            onClick={onclick}>
            {content}
        </button>
    )
}