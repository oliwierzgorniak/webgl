import playCurrentSong from "./playCurrentSong";
import { setSong } from "./songsState";
import updateTrackUi from "./updateTrackUi";
import { shaderPlane } from "../main";

const handleInitailMenu = () => {
  const $tracksList = document.querySelector(".tracks-list") as HTMLDivElement;
  const trackButtons = document.querySelectorAll(
    ".tracks-list__button"
  ) as NodeListOf<HTMLButtonElement>;
  const $track = document.querySelector(".track") as HTMLDivElement;

  trackButtons.forEach(($button) =>
    $button.addEventListener("click", () => {
      const song = $button.dataset.track as string;
      setSong(song);
      $tracksList.classList.add("hidden");
      playCurrentSong();
      shaderPlane.initAudio();

      updateTrackUi();
      $track.classList.remove("hidden");
    })
  );
};

export default handleInitailMenu;
