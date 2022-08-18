import playList from "./playlist.js";
let buttonPrev = document.querySelector(".play-prev");
let buttonPlay = document.querySelector(".play");
let buttonNext = document.querySelector(".play-next");
let playListBlock = document.querySelector(".play-list");

let isPlay = false;
let audio = new Audio();

function playAudio() {
  if (!isPlay) {
    console.log("test");
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    buttonPlay.classList.add("pause");
  } else {
    audio.pause();
    isPlay = false;
    buttonPlay.classList.remove("pause");
  }
}
buttonPlay.addEventListener("click", playAudio);

buttonPrev.addEventListener("click", playPrev);
buttonNext.addEventListener("click", playNext);

let playNum = 0;

function playNext() {
  isPlay = false;
  if (playNum === 3) {
    playNum = 0;
  } else {
    playNum += 1;
  }
  playAudio();
  console.log(playNum);
}

function playPrev() {
  isPlay = false;
  if (playNum === 0) {
    playNum = 3;
  } else {
    playNum -= 1;
  }
  playAudio();
}

playList.forEach((element) => {
  let li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = element.title;
  playListBlock.append(li);
});
