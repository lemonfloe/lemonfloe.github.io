// #region autoplayer
const audio = document.getElementById('autoplayer__audio');
audio.volume = 0.5;

const volumeSlider = document.getElementById('autoplayer__volume');
if (volumeSlider) {
    volumeSlider.value = audio.volume;
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });
}

document.getElementById('autoplayer__button').addEventListener('click', () => {
    audio.paused ? audio.play() : audio.pause();
})
// #endregion

// #region Nav Content Swap
const pageFiles = [
    'pages/homepage.html',
    'pages/profiles.html',
    'pages/creations.html',
    'pages/gaming.html'
];

const pagePaths = [
    '/',
    '/profiles',
    '/creations',
    '/gaming'
];

let currentPageIndex = null;
let currentPage = 0;
const pageContent = document.getElementById('pageContent');

function getPageIndexFromPath(path) {
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
    return pagePaths.indexOf(path);
}

function getPathFromQuery() {
    const query = window.location.search;
    if (query.startsWith('?/')) {
        return '/' + query.slice(2);
    }
    if (query.startsWith('?')) {
        return '/' + query.slice(1);
    }
    return window.location.pathname
}

async function handleNav(index) {
    currentPageIndex = index;
    currentPage = index;
    history.pushState(null, "", pagePaths[index]);
    await fadeOut(pageContent);
    await changeContent(pageFiles[index]);
    await fadeIn(pageContent);
}

window.addEventListener("DOMContentLoaded", async () => {
    let idx = getPageIndexFromPath(getPathFromQuery());
    if (idx === -1) idx = 0;
    currentPage = idx;
    currentPageIndex = idx;
    await changeContent(pageFiles[idx]);
});

window.addEventListener("popstate", async () => {
    let idx = getPageIndexFromPath(getPathFromQuery());
    if (idx === -1) idx = 0;
    currentPage = idx;
    currentPageIndex = idx;
    await changeContent(pageFiles[idx]);
});

document.querySelectorAll(".nav__button").forEach((button, index) => {
    button.addEventListener("click", () => handleNav(index));
});

function changeContent(contentURL) {
    return fetch(contentURL)
        .then(res => res.text())
        .then(cont => {
            var divPlaceholder = document.getElementById('pageContent');
            divPlaceholder.innerHTML = "";
            divPlaceholder.insertAdjacentHTML("afterbegin", cont);
            setupAudioMotionAnalyzer();
            if (contentURL === 'pages/creations.html') {
                setupCreationsAudio();
                generateGallery();
            }
            currentPage = currentPageIndex;
        })
}

function fadeOut(element) {
    return new Promise((resolve) => {
        let opacity = 1;
        function fade() {
            opacity -= 0.06;
            if (opacity <= 0) {
                element.style.opacity = 0;
                resolve();
            } else {
                element.style.opacity = opacity;
                requestAnimationFrame(fade);
            }
        }
        fade();
    });
}

function fadeIn(element) {
    return new Promise((resolve) => {
        let opacity = null;
        function fade() {
            opacity += 0.015;
            if (opacity >= 1) {
                element.style.opacity = 1;
                resolve();
            } else {
                element.style.opacity = opacity;
                requestAnimationFrame(fade);
            }
        }
        fade();
    });
}
// #endregion

// #region Creations Tracklist
import AudioMotionAnalyzer from "https://cdn.skypack.dev/audiomotion-analyzer?min";
import { audioFiles } from './audioFiles.js';

function setupAudioMotionAnalyzer() {
    const wavContainer = document.getElementById("wavcontainer");
    if (wavContainer) {
        const audioMotion = new AudioMotionAnalyzer(document.getElementById("wavcontainer"), {
            source: document.getElementById("audiosource"),
            alphaBars: false,
            ansiBands: true,
            barSpace: 0,
            bgAlpha: 0,
            channelLayout: "dual-combined",
            colorMode: "gradient",
            fadePeaks: false,
            fftSize: 8192,
            fillAlpha: 0.7,
            frequencyScale: "log",
            gradientLeft: "orangered",
            gradientRight: "steelblue",
            gravity: 0.1,
            ledBars: false,
            linearAmplitude: true,
            linearBoost: 4,
            lineWidth: 0,
            loRes: false,
            lumiBars: false,
            maxDecibels: -25,
            maxFPS: 0,
            maxFreq: 22000,
            minDecibels: -85,
            minFreq: 10,
            mirror: 0,
            mode: 10,
            noteLabels: false,
            outlineBars: false,
            overlay: false,
            peakFadeTime: 0,
            peakHoldTime: 0,
            peakLine: true,
            radial: false,
            radialInvert: false,
            radius: 0,
            reflexAlpha: 0,
            reflexBright: 0,
            reflexFit: false,
            reflexRatio: 0,
            roundBars: false,
            showBgColor: false,
            // showFPS: false,
            showPeaks: false,
            showScaleX: false,
            showScaleY: false,
            smoothing: 0.1,
            spinSpeed: -5,
            splitGradient: false,
            trueLeds: false,
            volume: 0.7,
            weightingFilter: "C"
        });
    }
}

function setupCreationsAudio() {
    const audioElement = document.getElementById("audiosource");
    if (!audioElement) return;

    let currentAudioIndex = 0;

    function changeAudio(index) {
        currentAudioIndex = index;
        audioElement.src = audioFiles[index];
        audioElement.load();
        audioElement.play();
    }

    document.querySelectorAll(".myMusic__button").forEach(function (button, index) {
        button.addEventListener("click", function () {
            changeAudio(index);
        });
    });

    audioElement.addEventListener("ended", function () {
        let nextIndex = (currentAudioIndex + 1) % audioFiles.length;
        changeAudio(nextIndex);
    });

}
// #endregion

// #region Creations Gallery
import { galleryLinks } from './galleryLinks.js';

function generateGallery() {
    const galleryContainer = document.getElementById('galleryContainer');
    if (!galleryContainer) return;

    galleryContainer.innerHTML = "";

    galleryLinks.forEach(link => {
        const fileName = link.split('/').pop().split('.')[0];
        const firstSpace = fileName.indexOf(' ');
        let date = '';
        let caption = '';

        if (firstSpace !== -1) {
            date = fileName.substring(0, firstSpace);
            caption = fileName.substring(firstSpace + 1);
        } else {
            caption = fileName;
        }

        const thumb = `/assets/gallery/thumbnails/${fileName}_thumb.jpg`;

        const div = document.createElement('div');
        div.className = 'gallery';
        div.innerHTML = `
            <a href="${link}">
                <img class="thumbnail" src="${thumb}" alt="${caption}" />
            </a>
        `;
        galleryContainer.appendChild(div);
    });
}
// #endregion

// #region wip autoplayer

// var button = document.getElementById("button");
// var audio = document.getElementById("player");
      
//       button.addEventListener('click', function(){      
//         if(audio.paused){
//         audio.play();
//         button.innerHTML = '<i class="fa fa-pause"></i>';
          
//         } else {
//         audio.pause();
//         button.innerHTML = '<i class="fa fa-play"></i>';
//         }
//       });

// #endregion