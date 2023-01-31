//Variables
const likeBtn = document.querySelector("#like"),
  prevSongBtn = document.querySelector("#prevSong"),
  nextSongBtn = document.querySelector("#nextSong"),
  Play_Pause = document.querySelector("#Play-Pause"),
  progress = document.querySelector("#progress"),
  audio = document.querySelector("#audio"),
  songName = document.querySelector(".songName"),
  artist = document.querySelector(".artist"),
  cover = document.querySelector(".cover"),
  progressContainer = document.querySelector(".progress-container"),
  duration = document.querySelector('.duration'),
  current = document.querySelector('.current');

const songs = [
  {
    SName: "Baraye",
    artist: "Shervin Hajipour",
    src: "https://dls.loudmusic.ir/Music/1401/01/Baraye%20-Shervin%20Hajipour%20[loudmusic.ir]-320.mp3",
    cover: "./images/1.jpg",
  },

  {
    SName: "Dancing With Your Ghost",
    artist: "Sasha Solan",
    src: "https://files.musicfeed.ir/2020/07/Sasha-Sloan-Dancing-With-Your-Ghost-128.mp3",
    cover: "./images/2.jpg",
  },

  {
    SName: "Chandelier",
    artist: "Sia",
    src: "http://dl.mediak.ir/Sia%20-%20Chandelier.mp3",
    cover: "./images/3.jpg",
  },
];

let pauseIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clip-rule="evenodd" />
    </svg>
`;

let playIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
    </svg>
`;
let songIndex = 0;

//EventListeners
prevSongBtn.addEventListener("click", prevSong);
nextSongBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
document.addEventListener('DOMContentLoaded' , loadSong(0))

//Functions
function playSong() {
  audio.classList.add("play");
  audio.classList.remove("pause");
  Play_Pause.innerHTML = pauseIcon;
  audio.play();
}

function pauseSong() {
  audio.classList.add("pause");
  audio.classList.remove("play");
  Play_Pause.innerHTML = playIcon;
  audio.pause();
}

function loadSong(index) {
    songName.innerHTML = songs[index].SName;
    artist.innerHTML = songs[index].artist;
    audio.src = songs[index].src;
    cover.style.backgroundImage = `url(${songs[index].cover})`;
    generateTime()
}

function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songIndex);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songIndex);
  playSong();
}

Play_Pause.addEventListener("click", () => {
  const isPlaying = audio.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
  generateTime()
});

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  generateTime()
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
  generateTime()
}

function generateTime(){
    let durMin = Math.floor(audio.duration / 60);
    let durSec = Math.floor(audio.duration - durMin * 60);
    let curMin = Math.floor(audio.currentTime / 60);
    let curSec = Math.floor(audio.currentTime - curMin * 60);

    if (durSec < 10) {
        durSec = "0" + durSec;
    }
    if (curMin < 10) {
        curMin = "0" + curMin;
    }
    if (curSec < 10) {
        curSec = "0" + curSec;
    }

    duration.innerHTML = `${durMin}:${durSec} `
    current.innerHTML = `${curMin}:${curSec}`
}