const audio = document.getElementById('bgMusic');
audio.volume = 0; // Set initial volume to 0

let fadeInInterval;
const fadeInDuration = 2000; // 2 seconds

function fadeIn() {
  let volume = 0;
  const increment = 0.01;
  const intervalTime = fadeInDuration / (1 / increment);

  fadeInInterval = setInterval(() => {
    volume += increment;
    audio.volume = volume;
    if (volume >= 1) {
      clearInterval(fadeInInterval);
    }
  }, intervalTime);
}

audio.play();
fadeIn();