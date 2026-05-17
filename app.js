class MusicPlayer {
  constructor() {
    this.audio = document.getElementById("audioPlayer");
    this.playPauseBtn = document.getElementById("playPauseBtn");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.progressContainer = document.getElementById("progressContainer");
    this.progressBar = document.getElementById("progressBar");
    this.currentTimeEl = document.getElementById("currentTime");
    this.durationEl = document.getElementById("duration");
    this.currentTrackEl = document.getElementById("currentTrack");
    this.currentArtistEl = document.getElementById("currentArtist");
    this.playlistEl = document.getElementById("playlist");
    this.searchInput = document.getElementById("searchInput");
    this.volumeSlider = document.getElementById("volumeSlider");
    this.volumeBtn = document.getElementById("volumeBtn");

    this.musicData = [
      {
        title: "Shallow",
        artist: "Lady Gaga",
        category: "jazz",
        duration: "3:04",
        src: "audio/audio14.mp3",
        cover: "image/shallow.jpeg",
      },
      {
        title: "Diamonds",
        artist: "Rihanna",
        category: "jazz",
        duration: "3:26",
        src: "audio/audio15.mp3",
        cover: "image/diamonds.jpeg",
      },
      {
        title: "Angels Like You",
        artist: "Miley Cyrus",
        category: "jazz",
        duration: "3:07",
        src: "audio/audio16.mp3",
        cover: "image/angels like you.jpeg",
      },
      {
        title: "Daylight",
        artist: "Taylor Swift",
        category: "pop",
        duration: "3:34",
        src: "audio/audio17.mp3",
        cover: "image/daylight.jpeg",
      },
      {
        title: "We Don't Talk Anymore",
        artist: "Selena Gomez",
        category: "electronic",
        duration: "3:37",
        src: "audio/audio8.mp3",
        cover: "image/we dont talk anymore 13.jpg",
      },
      {
        title: "Rolling in the Deep",
        artist: "Alan Walker",
        category: "jazz",
        duration: "3:23",
        src: "audio/audio9.mp3",
        cover: "image/img 9.jpg",
      },
      {
        title: "So What",
        artist: "Miles Davis",
        category: "jazz",
        duration: "3:03",
        src: "audio/audio10.mp3",
        cover: "image/so what.jpeg",
      },
      {
        title: "DJ Snake",
        artist: "Justin Bieber",
        category: "jazz",
        duration: "3:03",
        src: "audio/audio11.mp3",
        cover: "image/dj snake.jpeg",
      },
      {
        title: "Be The One",
        artist: "Dua Lipa",
        category: "jazz",
        duration: "3:03",
        src: "audio/audio12.mp3",
        cover: "image/be the one.jpeg",
      },
      {
        title: "Night Changes",
        artist: "Harry Styles",
        category: "jazz",
        duration: "3:32",
        src: "audio/audio13.mp3",
        cover: "image/night changes.jpeg",
      },
      {
        title: "Kese Bhula Dun",
        artist: "Ashir",
        category: "electronic",
        duration: "3:26",
        src: "audio/audio1.mp3",
        cover: "image/kese bhula dun 1.jpg",
      },
      {
        title: "Adaa",
        artist: "Kontraa",
        category: "electronic",
        duration: "2:53",
        src: "audio/audio2.mp3",
        cover: "image/teri ada 2.jpg",
      },
      {
        title: "lofium lofi",
        artist: "lofi",
        category: "rock",
        duration: "4:41",
        src: "audio/audio3.mp3",
        cover: "image/img 3.jpg",
      },
      {
        title: "DJ",
        artist: "Southean",
        category: "rock",
        duration: "1:08",
        src: "audio/audio4.mp3",
        cover: "image/img 4.jpg",
      },
      {
        title: "Alone",
        artist: "Suryantta",
        category: "hiphop",
        duration: "3:14",
        src: "audio/audio5.mp3",
        cover: "image/img 5.jpg",
      },
      {
        title: "HipHop",
        artist: "Kendrick Lamar",
        category: "hiphop",
        duration: "4:02",
        src: "audio/audio6.mp3",
        cover: "image/img 6.jpg",
      },
      {
        title: "Khuwab ka musafir",
        artist: "Ashir",
        category: "electronic",
        duration: "3:30",
        src: "audio/audio7.mp3",
        cover: "image/khwaab ka musafir 7.jpg",
      },
    ];

    this.currentIndex = 0;
    this.isPlaying = false;
    this.currentCategory = "all";
    this.filteredData = [...this.musicData];

    this.init();
  }

  init() {
    this.renderPlaylist();
    this.bindEvents();
    this.updateVolume();
  }

  bindEvents() {
    // Player controls
    this.playPauseBtn.addEventListener("click", () => this.togglePlayPause());
    this.prevBtn.addEventListener("click", () => this.prevTrack());
    this.nextBtn.addEventListener("click", () => this.nextTrack());

    // Progress bar
    this.progressContainer.addEventListener("click", (e) =>
      this.setProgress(e),
    );

    // Audio events
    this.audio.addEventListener("timeupdate", () => this.updateProgress());
    this.audio.addEventListener("loadedmetadata", () => this.updateDuration());
    this.audio.addEventListener("ended", () => this.nextTrack());

    // Search and categories
    this.searchInput.addEventListener("input", (e) =>
      this.filterTracks(e.target.value),
    );

    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.filterByCategory(e.target.dataset.category),
      );
    });

    // Volume
    this.volumeSlider.addEventListener("input", (e) =>
      this.setVolume(e.target.value),
    );
    this.volumeBtn.addEventListener("click", () => this.toggleMute());

    // Playlist items
    this.playlistEl.addEventListener("click", (e) => {
      if (e.target.closest(".playlist-item")) {
        const index = parseInt(
          e.target.closest(".playlist-item").dataset.index,
        );
        this.playTrack(index);
      }
    });
  }

  renderPlaylist() {
    this.playlistEl.innerHTML = this.filteredData
      .map(
        (track, index) => `
                    <li class="playlist-item ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                        <img src="${track.cover}" alt="${track.title}">
                        <div class="track-details">
                            <div class="track-title">${track.title}</div>
                            <div class="track-artist">${track.artist}</div>
                        </div>
                        <div>${track.duration}</div>
                    </li>
                `,
      )
      .join("");
  }

  filterTracks(query) {
    this.filteredData = this.musicData.filter(
      (track) =>
        track.title.toLowerCase().includes(query.toLowerCase()) ||
        track.artist.toLowerCase().includes(query.toLowerCase()),
    );
    this.renderPlaylist();
  }

  filterByCategory(category) {
    this.currentCategory = category;
    document.querySelectorAll(".category-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.category === category);
    });

    if (category === "all") {
      this.filteredData = [...this.musicData];
    } else {
      this.filteredData = this.musicData.filter(
        (track) => track.category === category,
      );
    }
    this.renderPlaylist();
  }

  playTrack(index) {
    this.currentIndex = index;
    const track = this.filteredData[index];

    this.currentTrackEl.textContent = track.title;
    this.currentArtistEl.textContent = track.artist;
    this.audio.src = track.src;
    this.audio.load();
    this.audio.play();
    this.isPlaying = true;
    this.updatePlayButton();
    this.renderPlaylist();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  prevTrack() {
    this.currentIndex =
      (this.currentIndex - 1 + this.filteredData.length) %
      this.filteredData.length;
    this.playTrack(this.currentIndex);
  }

  nextTrack() {
    this.currentIndex = (this.currentIndex + 1) % this.filteredData.length;
    this.playTrack(this.currentIndex);
  }

  updatePlayButton() {
    this.playPauseBtn.textContent = this.isPlaying ? "⏸" : "▶";
  }

  updateProgress() {
    if (this.audio.duration) {
      const progress = (this.audio.currentTime / this.audio.duration) * 100;
      this.progressBar.style.width = progress + "%";
      this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }
  }

  updateDuration() {
    this.durationEl.textContent = this.formatTime(this.audio.duration);
  }

  setProgress(e) {
    const rect = this.progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    this.audio.currentTime = pos * this.audio.duration;
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  setVolume(value) {
    this.audio.volume = value / 100;
  }

  updateVolume() {
    this.volumeSlider.value = this.audio.volume * 100;
  }

  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this.volumeBtn.textContent = this.audio.muted ? "🔇" : "🔊";
  }
}

// Audio events for play/pause state
document.addEventListener("DOMContentLoaded", () => {
  const player = new MusicPlayer();

  document.getElementById("audioPlayer").addEventListener("play", () => {
    player.isPlaying = true;
    player.updatePlayButton();
  });

  document.getElementById("audioPlayer").addEventListener("pause", () => {
    player.isPlaying = false;
    player.updatePlayButton();
  });
});
