

export default (color="black",weight=0)=>`data:image/svg+xml;base64,${btoa(`
<svg height="200px" width="200px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="${color}">
    <g id="SVGRepo_bgCarrier" stroke-width="${weight}"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <style type="text/css">
            .st0 {
                fill: ${color};
            }
        </style>
        <g>
            <polygon class="st0"
                points="440.469,73.413 218.357,295.525 71.531,148.709 0,220.229 146.826,367.055 218.357,438.587 289.878,367.055 512,144.945 ">
            </polygon>
        </g>
    </g>
</svg>
`)}`;
