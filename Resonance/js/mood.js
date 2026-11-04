
/* Mood Explorer JavaScript */

const moodData = {
    calm: {
        name: "Calm",
        description: "Gentle sounds and relaxing ambience for a peaceful moment.",
        image: "Images for Website/Mood Explorer Page/CalmImage.jpg",
        audio: "audio/CalmAudio.wav",
        songs: [
            {
                title: "Moon Song",
                artist: "Phoebe Bridgers",
                description: "A soft and intimate song with a gentle, reflective atmosphere.",
                image: "Images for Website/Mood Explorer Page/MoonSongImage.png"
            },
            {
                title: "Bloom",
                artist: "The Paper Kites",
                description: "Warm acoustic melodies that create a peaceful and comforting mood.",
                image: "Images for Website/Mood Explorer Page/BloomImage.jpg"
            },
            {
                title: "Apocalypse",
                artist: "Cigarettes After Sex",
                description: "Dreamy vocals and slow instrumentals that create a quiet atmosphere.",
                image: "Images for Website/Mood Explorer Page/CASImage.jpg"
            }
        ]
    },

    energetic: {
        name: "Energetic",
        description: "Upbeat sounds to bring excitement and energy to your day.",
        image: "Images for Website/Mood Explorer Page/EnergeticImage.jpg",
        audio: "audio/EnergeticAudio.mp3",
        songs: [
            {
                title: "Blinding Lights",
                artist: "The Weeknd",
                description: "Fast-paced rhythms and bright synths that bring a rush of energy.",
                image: "Images for Website/Mood Explorer Page/BlindingLightsImage.png"
            },
            {
                title: "Don't Start Now",
                artist: "Dua Lipa",
                description: "An upbeat dance track with a confident and lively atmosphere.",
                image: "Images for Website/Mood Explorer Page/DontStartNowImage.png"
            },
            {
                title: "As It Was",
                artist: "Harry Styles",
                description: "A catchy song with energetic instrumentals and a driving beat.",
                image: "Images for Website/Mood Explorer Page/AsItWasImage.jpg"
            }
        ]
    },

    nostalgic: {
        name: "Nostalgic",
        description: "Familiar sounds that bring back memories of another time.",
        image: "Images for Website/Mood Explorer Page/NostalgicImage.jpg",
        audio: "audio/NostalgicAudio.wav",
        songs: [
            {
                title: "Somewhere Only We Know",
                artist: "Keane",
                description: "A heartfelt song that brings back memories of familiar places.",
                image: "Images for Website/Mood Explorer Page/SomewhereOnlyWeKnowImage.jpg"
            },
            {
                title: "The Night We Met",
                artist: "Lord Huron",
                description: "A haunting melody about memories and moments we wish to revisit.",
                image: "Images for Website/Mood Explorer Page/TheNightWeMetImage.jpg"
            },
            {
                title: "1979",
                artist: "The Smashing Pumpkins",
                description: "A nostalgic song that captures the freedom of youth.",
                image: "Images for Website/Mood Explorer Page/1979Image.jpg"
            }
        ]
    },

    reflective: {
        name: "Reflective",
        description: "Thoughtful sounds for slowing down and looking inward.",
        image: "Images for Website/Mood Explorer Page/ReflectiveImage.jpg",
        audio: "audio/ReflectiveAudio.mp3",
        songs: [
            {
                title: "Vienna",
                artist: "Billy Joel",
                description: "A reminder to slow down and appreciate life's journey.",
                image: "Images for Website/Mood Explorer Page/ViennaImage.jpg"
            },
            {
                title: "The Scientist",
                artist: "Coldplay",
                description: "A thoughtful song about regret, love, and understanding.",
                image: "Images for Website/Mood Explorer Page/TheScientistImage.jpg"
            },
            {
                title: "Matilda",
                artist: "Harry Styles",
                description: "A gentle reflection on personal growth and moving forward.",
                image: "Images for Website/Mood Explorer Page/MatildaImage.jpg"
            }
        ]
    },

    joyous: {
        name: "Joyous",
        description: "Bright and uplifting sounds to celebrate the moment.",
        image: "Images for Website/Mood Explorer Page/JoyousImage.jpg",
        audio: "audio/JoyousAudio.mp3",
        songs: [
            {
                title: "Here Comes the Sun",
                artist: "The Beatles",
                description: "A warm and hopeful song that brings a feeling of happiness.",
                image: "Images for Website/Mood Explorer Page/HereComesTheSunImage.jpg"
            },
            {
                title: "Walking on Sunshine",
                artist: "Katrina and the Waves",
                description: "A lively and cheerful song filled with positive energy.",
                image: "Images for Website/Mood Explorer Page/WalkingOnSunshineImage.jpg"
            },
            {
                title: "Good as Hell",
                artist: "Lizzo",
                description: "An uplifting song about confidence and feeling good.",
                image: "Images for Website/Mood Explorer Page/GoodAsHellImage.jpg"
            }
        ]
    }
};


/* Get HTML Elements */

const moodButtons = document.querySelectorAll(".mood-btn");
const moodPlayer = document.getElementById("moodPlayer");
const selectedMood = document.getElementById("selectedMood");
const moodDescription = document.getElementById("moodDescription");
const recommendedSongs = document.getElementById("recommendedSongs");

const moodAudio = document.getElementById("moodAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const audioProgress = document.getElementById("audioProgress");


/* Display Recommended Songs */

function displaySongs(songs) {

    recommendedSongs.innerHTML = "";

    songs.forEach(song => {

        const card = document.createElement("div");
        card.className = "col-12 col-md-4";

        card.innerHTML = `
            <div class="recommendation-card">

                <img src="${song.image}" alt="${song.title} album artwork">

                <div class="recommendation-content">
                    <h3>${song.title}</h3>
                    <p class="recommendation-artist">${song.artist}</p>
                    <p class="recommendation-description">${song.description}</p>
                </div>

            </div>
        `;

        recommendedSongs.appendChild(card);
    });
}


/* Change Selected Mood */

function changeMood(mood) {

    const data = moodData[mood];
    if (!data) return;

    selectedMood.textContent = data.name;
    moodDescription.textContent = data.description;

    moodPlayer.style.backgroundImage =
        `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)), url("${data.image}")`;

    moodButtons.forEach(button => {
        const active = button.dataset.mood === mood;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    displaySongs(data.songs);

    /* Change Audio */
    moodAudio.pause();
    moodAudio.src = data.audio;
    moodAudio.load();
    audioProgress.value = 0;

    /* Start Audio After Mood Selection */
    moodAudio.play().catch(() => {
        playPauseBtn.textContent = "▶";
        playPauseBtn.setAttribute("aria-label", "Play ambience");
    });
}


/* Mood Button Events */

moodButtons.forEach(button => {
    button.addEventListener("click", () => {
        changeMood(button.dataset.mood);
    });
});


/* Play and Pause Audio */

playPauseBtn.addEventListener("click", () => {

    if (moodAudio.paused) {
        moodAudio.play().catch(() => {});
    } else {
        moodAudio.pause();
    }
});

/* Mute and Unmute */

const volumeIcon = document.getElementById("volumeIcon");

muteBtn.addEventListener("click", () => {
    moodAudio.muted = !moodAudio.muted;

    if (moodAudio.muted) {
        volumeIcon.src = "Images for Website/Mood Explorer Page/volume-off.png";
        muteBtn.setAttribute("aria-label", "Unmute ambience");
    } else {
        volumeIcon.src = "Images for Website/Mood Explorer Page/volume-on.png";
        muteBtn.setAttribute("aria-label", "Mute ambience");
    }
});


/* Audio Progress */

moodAudio.addEventListener("timeupdate", () => {
    if (Number.isFinite(moodAudio.duration) && moodAudio.duration > 0) {
        audioProgress.value =
            (moodAudio.currentTime / moodAudio.duration) * 100;
    }
});

audioProgress.addEventListener("input", () => {
    if (Number.isFinite(moodAudio.duration) && moodAudio.duration > 0) {
        moodAudio.currentTime =
            (audioProgress.value / 100) * moodAudio.duration;
    }
});


/* Update Play Button */

moodAudio.addEventListener("play", () => {
    playPauseBtn.textContent = "❚❚";
    playPauseBtn.setAttribute("aria-label", "Pause ambience");
});

moodAudio.addEventListener("pause", () => {
    playPauseBtn.textContent = "▶";
    playPauseBtn.setAttribute("aria-label", "Play ambience");
});


/* Repeat Ambience */

moodAudio.loop = true;


/* Show Calm Recommendations on Page Load */

displaySongs(moodData.calm.songs);
moodAudio.src = moodData.calm.audio;
