const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.querySelector('#artist');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
// import { myPlaylist } from "./PLAYLIST.JS";
const songs = [
	{
		title: "We Are",
		artist: "Alex M.O.R.P.H. & Paul van Dyk",
		src: "./my-playlist/Alex M.O.R.P.H. & Paul van Dyk - We Are.mp3"
	},
	{
		title: "Autumn",
		artist: "Ben Böhmer",
		src: "./my-playlist/Ben Böhmer - Autumn.mp3"
	},
	{
		title: "Dive (feat. Margret)",
		artist: "Ben Böhmer",
		src: "./my-playlist/Ben Böhmer - Dive (feat. Margret).mp3"
	},
	{
		title: "I Remember",
		artist: "Deadmau5, Kaskade",
		src: "./my-playlist/deadmau5, Kaskade - I Remember.mp3"
	},
	{
		title: "Dreamscape",
		artist: "009 Sound System",
		src: "./my-playlist/009 Sound System - Dreamscape.mp3"
	},
	{
		title: "Nothing but You",
		artist: "Paul van Dyk",
		src: "src/my-playlist/Paul van Dyk - Nothing but You (PvD radio mix).mp3"
	},
	{
		title: "White Lies",
		artist: "Paul van Dyk ft Jessica Sutta",
		src: "./my-playlist/Paul Van Dyk ft Jessica Sutta - White Lies.mp3"
	},
	{
		title: "Sleepwalking (1980s Chillwave Remix)",
		artist: "The Chain Gang of 1974",
		src: "./my-playlist/The Chain Gang of 1974 - Sleepwalking (1980s Chillwave Remix).mp3"
	},
	{
		title: "Intro",
		artist: "The XX",
		src: "src/my-playlist/The xx - Intro.mp3"
	}
];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex].title, songs[songIndex].artist);

// Update song details
function loadSong(song, art) {
	title.innerText = song;
	artist.innerText = art;
	audio.src = `./my-playlist/${song}.mp3`;
	cover.src = `./images/${song}.jpg`;
}

// Play song
function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');

	audio.play();
}

// Pause song
function pauseSong() {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');

	audio.pause();
}

// Previous song
function prevSong() {
	songIndex--;

	if (songIndex < 0) {
		songIndex = songs.length - 1;
	}

	loadSong(songs[songIndex].title, songs[songIndex].artist);

	playSong();
}

// Next song
function nextSong() {
	songIndex++;

	if (songIndex > songs.length - 1) {
		songIndex = 0;
	}

	loadSong(songs[songIndex].title, songs[songIndex].artist);

	playSong();
}

// Update progress bar
function updateProgress(e) {
	const { duration, currentTime } = e.srcElement;
	const progressPercent = (currentTime / duration) * 100;
	progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
	const { duration, currentTime } = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime == null) ? 0 :
		Math.floor(currentTime / 60);
	min = min < 10 ? '0' + min : min;

	// define seconds currentTime
	function get_sec(x) {
		if (Math.floor(x) >= 60) {

			for (var i = 1; i <= 60; i++) {
				if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
					sec = Math.floor(x) - (60 * i);
					sec = sec < 10 ? '0' + sec : sec;
				}
			}
		} else {
			sec = Math.floor(x);
			sec = sec < 10 ? '0' + sec : sec;
		}
	}

	get_sec(currentTime, sec);

	// change currentTime DOM
	currTime.innerHTML = min + ':' + sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true) ? '0' :
		Math.floor(duration / 60);
	min_d = min_d < 10 ? '0' + min_d : min_d;


	function get_sec_d(x) {
		if (Math.floor(x) >= 60) {

			for (var i = 1; i <= 60; i++) {
				if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
					sec_d = Math.floor(x) - (60 * i);
					sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
				}
			}
		} else {
			sec_d = (isNaN(duration) === true) ? '0' :
				Math.floor(x);
			sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
		}
	}

	// define seconds duration

	get_sec_d(duration);

	// change duration DOM
	durTime.innerHTML = min_d + ':' + sec_d;

};

// Event listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);
