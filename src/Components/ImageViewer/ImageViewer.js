import {useId,FlatList,useSwipeGesture,fadeIn} from "vritra";
import css from "./ImageViewer.module.css";
import ImageView from "./ImageView/ImageView";
import Navigator from "./Navigator/Navigator";
import {model0,model1,model2} from "assets";


export default function ImageViewer(props){
    const {parent,id=useId("imageviewer"),position,style,images=[model2,model1,model0]}=props;
    const imageviewer=FlatList({
        parent,id,position,style,
        className:`${css.imageviewer} ${props.className||""}`,
        data:images,
        horizontal:true,pagingEnabled:true,
        renderItem:({parent,item})=>ImageView({parent,image:item,zoomable:true}),
        onSwipe:({index})=>{
            state.index=index;
            state.navigator.selectIndex(index);
        },
    }),state={
        index:0,
        navigator:Navigator({parent:imageviewer,images}),
    };

    imageviewer.beforeEndHTML=`
    `;

    useSwipeGesture({
        element:imageviewer,
        onReady:(event)=>{
            event.stopPropagation();
        },
        onSwipe:({direction})=>{
            (direction==="bottom")&&fadeIn(state.navigator,"block");
        },
    });

    screen.orientation.addEventListener("change",()=>{
        const {index}=state;
        imageviewer.scrollToIndex(0,false);
        if(index){
            imageviewer.style.visibility="hidden";
            setTimeout(()=>{
                imageviewer.scrollToIndex(index,false);
                setTimeout(()=>{
                    imageviewer.style.visibility=null;
                },400);
            },200);
        }
    });

    imageviewer.setIndex=(i)=>{
        state.index=i>0?i:0;
        imageviewer.scrollToIndex(i,false);
    }
    
    return imageviewer;
}
