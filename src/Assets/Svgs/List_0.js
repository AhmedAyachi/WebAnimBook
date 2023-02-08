

export default (color="black",weight=0)=>`data:image/svg+xml;base64,${btoa(`
<svg fill="${color}" stroke="${color}" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="${weight}"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <title>list</title>
        <path d="M8 8v4h16v-4h-16zM8 18h16v-4h-16v4zM8 24h16v-4h-16v4z"></path>
    </g>
</svg>
`)}`;