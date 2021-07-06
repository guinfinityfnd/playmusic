const playListContainerTag=document.getElementsByClassName("playlistcontainer")[0];
const audioTag=document.getElementsByClassName("audiolines")[0];
const currentAndTotalTimeTag=document.getElementsByClassName("currentAndTotalTime")[0];
const currentProgressTag=document.getElementById("currentProgress");
const playButtonTag=document.getElementsByClassName("playButton")[0];
const pauseButtonTag=document.getElementsByClassName("pauseButton")[0];
const previousButtonTag=document.getElementsByClassName("previousButton")[0];
const nextButtonTag=document.getElementsByClassName("nextButton")[0];
const tracks=[
    {trackId:"music/track1.mp3",title:"Akon_Beautiful.feat-blabla"},
    {trackId:"music/track2.mp3",title:"Alok_Fugo.feat-blabla"},
    {trackId:"music/track3.mp3",title:"AliGate_It's you.feat-blabla"},
    {trackId:"music/track4.mp3",title:"I Don't know What You know about Me.feat-blabla"},
    {trackId:"music/track5.mp3",title:"ImagineDragon_Bad Liar.feat-blabla"},
];
for(let i=0;i<tracks.length;i++){
    const trackTag=document.createElement("div");
    trackTag.addEventListener("click",()=>{
        const trackId=tracks[i].trackId;
        // audioTag.src=trackId; //audio releases an event with this name is laodeddata;see in line number 23::::
        currentPlayingIndex=i;
        palySong();
    });
    trackTag.classList.add('trackItem');
    const title=(i+1).toString() + ". " + tracks[i].title;
    trackTag.textContent=title;
    playListContainerTag.append(trackTag);  
    /*The below lines are dragged on StackOverFlow pages. this is about css :hover in Javascript.......*/  
    let css='.trackItem:hover {color:red}';
    let style=document.createElement("style");
    if (style.styleSheet) {
        style.styleSheet.cssText=css;
    }else{
        style.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
}
let duration=0;
let durationText="00:00"
audioTag.addEventListener("loadeddata",()=>{
    duration=Math.floor(audioTag.duration);    //215.122323change
    durationText=createMinutesAndSecondsText(duration);   //00:00 =>03:12

    // console.log("thi is duration",minuteText + ":" + secondText);    
})
/*audio element မှာ play,pause,currentTime,durationဆိုတဲ့methods တွေရှိတယ်*/
audioTag.addEventListener("timeupdate",()=>{//others audio releaes event is timeupdate:::
    const currentTime=Math.floor(audioTag.currentTime);
    const currentTimeText=createMinutesAndSecondsText(currentTime); 
    const durationTextAndCurrentText=currentTimeText + "" + "/" + "" + durationText; //00 : 00  /  00 : 00
    currentAndTotalTimeTag.textContent=durationTextAndCurrentText;//this line is to show update numbers;
    currentTimeProgress(currentTime);
})
const currentTimeProgress=(currentTime)=>{
    const currnetProgressWidth=(500/duration)*currentTime;  //this releases "number type" and we need to change that it is to string;;;
    currentProgressTag.style.width =currnetProgressWidth.toString() + "px";
}
const createMinutesAndSecondsText=(totalTimes)=>{
    const minutes=Math.floor(totalTimes/60);
    const seconds=totalTimes%60;//အကြွင်းရှာရန်သုံးတယ်///

    const minuteText=minutes<10 ? "0" + minutes.toString() : minutes;
    const secondText=seconds<10 ? "0" + seconds.toString() : seconds;

    return minuteText + ":" + secondText;
};

let currentPlayingIndex=0;
let isPlaying=false;
previousButtonTag.addEventListener("click",()=>{
    if (currentPlayingIndex===0) {
        return;
    }else{
        currentPlayingIndex-=1;
        palySong();
    }
});
/*currentpalyingindex ကို forloop ထဲ မှာ i တန်ဖိုးပေးရန်လိုအပ်///*/
nextButtonTag.addEventListener("click",()=>{
    if (currentPlayingIndex===tracks.length -1) {
        return;//သူက ထဲကထွက်ပေးတယ်//
    }else{
        currentPlayingIndex+=1;
        palySong();
    }
});
playButtonTag.addEventListener("click",()=>{
    const currentTime=Math.floor(audioTag.currentTime);
    isPlaying=true;
    if (currentTime===0) {
        palySong();
    }else{
        audioTag.play();//ဒီလိုရေးတာက သီချင်းကို ရောက်ရာနေရာကနေပြန်စပေးတယ်//
        updatePlayAndPauseButton();
    }    
});
pauseButtonTag.addEventListener("click",()=>{
    isPlaying=false;
    audioTag.pause();
    updatePlayAndPauseButton();
});
const palySong=()=>{
    const songIdToPlay=tracks[currentPlayingIndex].trackId;
    audioTag.src=songIdToPlay;
    // const lineExists=audioTag.classList.contains("colorChange");
    // if (lineExists) {
    //     audioTag.classList.remove("colorChange");
    // }else{
    //     audioTag.classList.add("colorChange");
    // }
    audioTag.play();
    isPlaying=true;

    updatePlayAndPauseButton();
}
const updatePlayAndPauseButton=()=>{
    if (isPlaying) {
        playButtonTag.style.display="none";
        pauseButtonTag.style.display="inline";
    }else{
        playButtonTag.style.display="inline";
        pauseButtonTag.style.display="none";
    }
}


