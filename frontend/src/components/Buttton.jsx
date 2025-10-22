
export default function Button({ content, onClick }) {

    return (
        <button
            className="text-white xl:text-xl bg-[#697AFB] hover:bg-[#616dc2] transition-colors duration-300 font-semibold p-3 px-6 rounded-lg cursor-pointer"
            onclick={onClick}
        >
    { content }
        </button >
    )
}