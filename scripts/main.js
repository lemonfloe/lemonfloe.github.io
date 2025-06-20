// #region autoplayer
const audio = document.getElementById('autoplayer__audio');
audio.volume = 0;

let fadeInInterval;
const fadeInDuration = 1000;

function audioFadeIn() {
    let volume = 0;
    const increment = 0.01;
    const steps = 1 / increment;
    const intervalTime = fadeInDuration / steps;

    fadeInInterval = setInterval(() => {
        volume += increment;
        if (volume > 1) {
            volume = 1;
            audio.volume = volume;
            clearInterval(fadeInInterval);
        } else {
            audio.volume = volume;
        }
    }, intervalTime);
}

document.getElementById('autoplayer__button').addEventListener('click', () => {
    audio.play();
    audioFadeIn();
})
// #endregion

// #region Nav Content Swap
const pageFiles = [
    'homepage.html',
    'profiles.html',
    'creations.html',
    'gaming.html'
];

let currentPageIndex = null;
let currentPage = 0;

window.addEventListener("DOMContentLoaded", changeContent('homepage.html'), (currentPage = 0), (currentPageIndex = 0));

document.querySelectorAll(".nav__button").forEach(function (button, index) {
    button.addEventListener("click", async function () {

        if (currentPage != index) {
            currentPageIndex = index;
            const contentURL = pageFiles[currentPageIndex];
            await fadeOut(pageContent);
            await changeContent(contentURL);
            await fadeIn(pageContent);
        } else {
            console.log('already here!');
        }
    });
});

function changeContent(contentURL) {
    return fetch(contentURL)
        .then(res => res.text())
        .then(cont => {
            var divPlaceholder = document.getElementById('pageContent');
            divPlaceholder.innerHTML = "";
            divPlaceholder.insertAdjacentHTML("afterbegin", cont);
            setupAudioMotionAnalyzer();
            if (contentURL === 'creations.html') {
                setupCreationsAudio();
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

// #region Creations Audio
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