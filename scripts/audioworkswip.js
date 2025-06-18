
        import AudioMotionAnalyzer from "https://cdn.skypack.dev/audiomotion-analyzer?min";

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


// Music Playlist Script
        const audioFiles = [
            "https://dl.dropbox.com/scl/fi/3kni8e09vbao66f1bn7ct/floe-rainbowpotion-demo.mp3?rlkey=2ui12h9hos3e7ema81n9nqf6k",
            "https://dl.dropbox.com/scl/fi/5w5846eaar79yc9q4yv3s/floe-thrash-demo.mp3?rlkey=g13zn9599x04md50oocl3axx7",
            "https://dl.dropbox.com/scl/fi/1t1avibsj3p5u2j41o401/floe-crimson-demo.mp3?rlkey=ryl3yojadddbk26dii74e5729",
            "https://dl.dropbox.com/scl/fi/hp80vg637j9rwdesll6vx/floe-splitcircuit-demo.mp3?rlkey=geikgnz3b1hg5j7u6bn8uldz6",
            "https://dl.dropbox.com/scl/fi/tzpv7xu268rhql1ao8gne/floe-senseless.mp3?rlkey=2ufonpvudfvocxrzdvtym7xgz&st=47czh5yw",
            "https://dl.dropbox.com/scl/fi/vni60xa1gdjmq6kjgl6zy/floe-chameleon-demo.mp3?rlkey=q7vhwaoiuby77es5fdjcfs79s&st=csb8ad2r",
            "https://dl.dropbox.com/scl/fi/rhy2o9pj2b5huk33vt961/MY-BLOOD-IS-LITERALLY-SUGAR.wav?rlkey=8sbfcelbxsao8bkwp9ii61g26"
        ];

        let currentAudioIndex = 0;
        const audioElement = document.getElementById("audiosource");

        function changeAudio(audioURL) {
            audioElement.src = audioURL;
            audioElement.load();
            audioElement.play();
        }

        document.querySelectorAll("button").forEach(function (button, index) {
            button.addEventListener("click", function () {
                currentAudioIndex = index;
                const audioURL = audioFiles[currentAudioIndex];
                changeAudio(audioURL);
            });
        });

        audioElement.addEventListener("ended", function () {
            currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length;
            const nextAudioURL = audioFiles[currentAudioIndex];
            changeAudio(nextAudioURL);
        });