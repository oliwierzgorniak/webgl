import playCurrentSong from "./playCurrentSong";
import { nextSong } from "./songsState";
import updateTrackUi from "./updateTrackUi";

const handleMusicContinuation = () => {
  const $trackAudio = document.querySelector(
    ".track__audio"
  ) as HTMLAudioElement;
  $trackAudio.addEventListener("ended", () => {
    nextSong();
    playCurrentSong();
    updateTrackUi();
  });
};

export default handleMusicContinuation;
