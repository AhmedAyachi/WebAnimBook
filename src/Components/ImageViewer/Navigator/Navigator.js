import {useId,FlatList,PopupView} from "cherries";
import css from "./Navigator.module.css";
import ImageView from "../ImageView/ImageView";


export default function Navigator(props){
    const {parent,id=useId("navigator"),images}=props;
    const navigator=PopupView({parent,id,className:css.navigator,keepinDOM:true}),state={
        imageviews:[],
        selectedi:0,
    },{imageviews}=state;
    
    navigator.beforeEndHTML=`
    `;
    const flatlist=FlatList({
        parent:navigator,
        horizontal:true,
        data:images,
        renderItem:({parent:container,item,index})=>{
            const imageview=ImageView({
                parent:container,image:item,
                className:`${css.imageitem} ${(state.selectedi===index)?css.selected:""}`,
                onClick:()=>{
                    parent.setIndex(index);
                    navigator.selectIndex(index);
                },
            });
            imageviews.push(imageview);
            return imageview;
        },
    });
    navigator.ontouchstart=(event)=>{
        event.stopPropagation();
    }

    navigator.selectIndex=(i)=>{
        const selected=imageviews[state.selectedi];
        selected&&selected.classList.remove(css.selected);
        state.selectedi=i;
        const element=imageviews[i];
        if(element){
            element.classList.add(css.selected);
            //flatlist.scrollToIndex(i);
            //element.scrollIntoView({behavior:"smooth",inline:"nearest"});
        }
    }

    return navigator;
}

