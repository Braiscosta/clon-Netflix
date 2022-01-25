import { useState } from "react";
import { useRef } from "react";

let unMute = false;
function useMuteVideo(e) {
  const videoRef = useRef(null);
  const [muteSrc] = useState("mute.ico");

  unMute = !unMute;

  unMute
    ? videoRef.current?.internalPlayer?.mute()
    : videoRef.current?.internalPlayer?.unMute();

  if (!unMute) {
    e.target.src = "unMute.ico";
  } else {
    e.target.src = "mute.ico";
  }
  return [videoRef, muteSrc];
}

export default useMuteVideo;
