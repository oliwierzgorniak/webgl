import getTitleFromSlug from "./getTitleFromSlug";
import { getCurrentSong } from "./songsState";

const updateTrackUi = () => {
  const song = getCurrentSong();
  const $trackImg = document.querySelector(".track__img") as HTMLImageElement;
  $trackImg.src = `/song-covers/${song}.jpg`;

  const $trackLabel = document.querySelector(
    ".track__label"
  ) as HTMLHeadingElement;
  $trackLabel.textContent = getTitleFromSlug(song);

  const $trackRange = document.querySelector(
    ".track__range"
  ) as HTMLInputElement;
  $trackRange.value = "0";
};

export default updateTrackUi;
