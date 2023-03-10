import {useId,View,DraggableView} from "cherries";
import css from "./PrisonerView.module.css";


export default function PrisonerView(props){
    const {parent,id=useId("prisonerview")}=props;
    const prisonerview=View({parent,id,className:`${css.prisonerview} ${props.className||""}`});

    prisonerview.innateHTML=`
        <div class="${css.prison}"></div>
    `;
    const prisonEl=prisonerview.querySelector(`.${css.prison}`);
    const radius=prisonEl.clientWidth/2;
    DraggableView({
        parent:prisonEl,
        className:css.prisoner,
        onDrop:(coords,element)=>{
            const {x,y}=coords;
            const distance=Math.sqrt(x**2+y**2)+element.clientWidth/2;
            if(distance>radius){
                element.setPosition({x:0,y:0,duration:200});
            }
        },
    });
    

    return prisonerview;
}
