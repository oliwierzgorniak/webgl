import { pause, resume } from "./handlePauseResume";
import playCurrentSong from "./playCurrentSong";
import { nextSong, previousSong } from "./songsState";
import updateTrackUi from "./updateTrackUi";

const handleTrack = () => {
  const $trackPrevious = document.querySelector(
    ".track__previous"
  ) as HTMLButtonElement;
  $trackPrevious.addEventListener("click", () => {
    previousSong();
    playCurrentSong();
    updateTrackUi();
  });
  const $trackNext = document.querySelector(
    ".track__next"
  ) as HTMLButtonElement;
  $trackNext.addEventListener("click", () => {
    nextSong();
    playCurrentSong();
    updateTrackUi();
  });

  const $trackPause = document.querySelector(
    ".track__pause"
  ) as HTMLButtonElement;
  const $trackPauseImg = document.querySelector(
    ".track__pause-img"
  ) as HTMLImageElement;

  $trackPause.addEventListener("click", () => {
    if ($trackPause.dataset.state === "pause") {
      $trackPause.dataset.state = "play";
      $trackPauseImg.src = "/play-button.svg";
      pause();
    } else {
      $trackPause.dataset.state = "pause";
      $trackPauseImg.src = "/pause-button.svg";
      resume();
    }
  });

  const $trackRange = document.querySelector(
    ".track__range"
  ) as HTMLInputElement;
  const $trackAudio = document.querySelector(
    ".track__audio"
  ) as HTMLAudioElement;
  setInterval(() => {
    $trackRange.value = String(
      ($trackAudio.currentTime / $trackAudio.duration) * 100
    );
  }, 1000);

  $trackRange.addEventListener("change", () => {
    $trackAudio.currentTime = (+$trackRange.value / 100) * $trackAudio.duration;
  });
};

export default handleTrack;
