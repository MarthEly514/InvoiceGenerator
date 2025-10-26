
export default function Button({ content, onClick }) {

    return (
        <button
            className="text-white xl:text-xl flex flex-row gap-3 bg-[#697AFB] hover:bg-[#616dc2] transition-colors duration-300 font-semibold p-3 px-6 rounded-lg cursor-pointer"
            onClick={onClick}
        >
    { content }
        </button >
    )
}