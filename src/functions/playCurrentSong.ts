import { getCurrentSong } from "./songsState";

const playCurrentSong = () => {
  const song = getCurrentSong();
  const $trackAudio = document.querySelector(
    ".track__audio"
  ) as HTMLAudioElement;
  $trackAudio?.setAttribute("src", `/songs/${song}.mp3`);
  $trackAudio.play();
};

export default playCurrentSong;
