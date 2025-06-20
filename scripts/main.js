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

window.addEventListener("DOMContentLoaded", changeContent('homepage.html'), (currentPage = 0));

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

    const audioFiles = [
        "https://dl.dropbox.com/scl/fi/3kni8e09vbao66f1bn7ct/floe-rainbowpotion-demo.mp3?rlkey=2ui12h9hos3e7ema81n9nqf6k",
        "https://dl.dropbox.com/scl/fi/5w5846eaar79yc9q4yv3s/floe-thrash-demo.mp3?rlkey=g13zn9599x04md50oocl3axx7",
        "https://dl.dropbox.com/scl/fi/1t1avibsj3p5u2j41o401/floe-crimson-demo.mp3?rlkey=ryl3yojadddbk26dii74e5729",
        "https://dl.dropbox.com/scl/fi/hp80vg637j9rwdesll6vx/floe-splitcircuit-demo.mp3?rlkey=geikgnz3b1hg5j7u6bn8uldz6",
        "https://dl.dropbox.com/scl/fi/tzpv7xu268rhql1ao8gne/floe-senseless.mp3?rlkey=2ufonpvudfvocxrzdvtym7xgz&st=47czh5yw",
        "https://dl.dropbox.com/scl/fi/vni60xa1gdjmq6kjgl6zy/floe-chameleon-demo.mp3?rlkey=q7vhwaoiuby77es5fdjcfs79s&st=csb8ad2r",
        "https://dl.dropbox.com/scl/fi/tf0a3w2ub0w6gqqglj7kz/MY-BLOOD-IS-LITERALLY-SUGAR.mp3?rlkey=1eq910phzvax4nhdx6efhsst6"
    ];

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