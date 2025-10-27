const songs = ["let's-kick-ass", "a-night-drive", "solve-mystery", "vaporwave"];
let currentIndext = 0;

const getCurrentSong = () => songs[currentIndext];

const setSong = (song: string) =>
  (currentIndext = songs.findIndex((s) => song === s));

const previousSong = () => {
  currentIndext = currentIndext === 0 ? songs.length - 1 : currentIndext - 1;
};

const nextSong = () => {
  currentIndext = currentIndext === songs.length - 1 ? 0 : currentIndext + 1;
};

export { previousSong, nextSong, setSong, getCurrentSong };
