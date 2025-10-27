const handleRangeProgress = () => {
  const $trackRange = document.querySelector(
    ".track__range"
  ) as HTMLInputElement;
  const $trackAudio = document.querySelector(
    ".track__audio"
  ) as HTMLAudioElement;
  const progress = ($trackAudio.currentTime / $trackAudio.duration) * 100;
  $trackRange.value = `${progress}`;
};

export default handleRangeProgress;
