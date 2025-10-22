
export function Button({content = '', onClick = () => {}}) {
    return `
    <button 
        class="text-yellow-300 cursor-pointer"
        onclick = "${onClick}"
        >
        <a href="">${content}</a>
    </button>
    `;
} 