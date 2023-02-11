

export default (color="black",weight=0)=>`data:image/svg+xml;base64,${btoa(`
<svg fill="${color}" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
    transform="matrix(-1, 0, 0, 1, 0, 0)">
    <g id="SVGRepo_bgCarrier" stroke-width="${weight}"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <title>paperplane</title>
        <path
            d="M3.363 4.414l4.875 19.348 9.467-3.018-8.448-10.298 10.902 9.56 8.853-2.77-25.649-12.822zM18.004 27.586v-5.324l-3.116 0.926 3.116 4.398z">
        </path>
    </g>
</svg>
`)}`;