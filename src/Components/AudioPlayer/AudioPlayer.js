import {View,FlatList} from "vritra";
import css from "./AudioPlayer.module.css";
import HeaderView from "./HeaderView/HeaderView";
import PosterView from "./PosterView/PosterView";
import TimelineView from "./TimelineView/TimelineView";
import ControlView from "./ControlView/ControlView";
import BackgroundView from "./BackgroundView/BackgroundView";
import {control0} from "assets";


export default function AudioPlayer(props){
    const {parent}=props;
    const audioplayer=View({parent,className:css.audioplayer}),state={
        song:statics.songs[0],
    };

    audioplayer.innateHTML=`
        <div ref="foreground" class="${css.foreground}"></div>
    `;
    HeaderView({parent:audioplayer.foreground});
    FlatList({
        parent:audioplayer.foreground,
        className:css.posterlist,
        containerClassName:css.container,
        data:statics.songs.map(song=>song.poster),
        horizontal:true,
        pagingEnabled:true,
        renderItem:({parent,item})=>PosterView({parent,poster:item}),
        //onSwipe:()=>{},
    });
    TimelineView({parent:audioplayer.foreground,song:state.song});
    ControlView({parent:audioplayer.foreground});
    const bgview=BackgroundView({parent:audioplayer});

    audioplayer.play=(song)=>{
        bgview.setColor(song.color);
    }
    audioplayer.play(state.song);

    return audioplayer;
}

const statics={
    songs:[
        {
            name:"control",
            poster:control0,
            artists:["qaaley","COLDMIND"].map(name=>({name})),
            color:"#646464",
        },
    ],
}
