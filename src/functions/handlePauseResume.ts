const $trackAudio = document.querySelector(".track__audio") as HTMLAudioElement;

export const pause = () => $trackAudio.pause();
export const resume = () => $trackAudio.play();
