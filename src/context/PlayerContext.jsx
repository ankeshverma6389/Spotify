import  { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";
export const playerContext = createContext();
const PlayerContextProvider = ({children}) => {
  const audioRef = useRef();
  const seekBg=useRef();
  const seekBar=useRef();
const [track,setTrack]=useState(songsData[0])
const [playerStatus,setPlayerStatus]=useState(false);
const [playStatus,setPlayStatus]=useState();
const [time, setTime] = useState({
  currentTime: {
    second: 0,
    minute: 0,
  },
  totalTime: {
    second: 0,
    minute: 0,
  },
});
useEffect(()=>{
setTimeout(()=>{
  audioRef.current.ontimeupdate=()=>{
    seekBar.current.style.width=(Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+'%'
    setTime({
      currentTime: {
        second: Math.floor(audioRef.current.currentTime % 60),
        minute: Math.floor(audioRef.current.currentTime / 60),
      },
      totalTime: {
        second: Math.floor(audioRef.current.duration % 60),
        minute: Math.floor(audioRef.current.duration / 60),
      },
    });
  }
},1000)
},[audioRef])
const play=()=>{
  setPlayStatus(true);
  audioRef.current.play();
  setPlayerStatus(true)
}
const pause=()=>{
   setPlayStatus(false);
   audioRef.current.pause();
  setPlayerStatus(false);
}
const playWithId=async(id)=>{
await setTrack(songsData[id]);
await audioRef.current.play();
setPlayStatus(true);
}
const previous=async(id)=>{
  if(track.id>0){
    await setTrack(songsData[track.id-1]);
    await audioRef.current.play();
    setPlayStatus(true)
  }
}
const next=async(id)=>{
  if(track.id<songsData.length-1){
    await setTrack(songsData[track.id+1]);
    await audioRef.current.play();
    setPlayStatus(true)
  }
}
const seekSong=async(e)=>{
audioRef.current.currentTime=((e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration)
}
  const contextValue = {
    seekSong,
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    time,
    setTime,
    playerStatus,
    setPlayerStatus,
    play,
    pause,
    playStatus,
    playWithId,
    previous,next
  };
  return (
    <playerContext.Provider value={contextValue}>
     { children}
    </playerContext.Provider>
  );
};

export default PlayerContextProvider;
