(function(){
    'use strict';

    const myVideo = document.querySelector('#myVideo');
    const fs = document.querySelector('.fa-expand');
    const filterIcon = document.querySelector('.fa-filter');
    
    const mySection = document.querySelector('#mySection');
    const line1 = document.querySelector('#line1');
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');

    const filters = ["none", "grayscale(100%)", "sepia(100%)"];
    let currentFilterIndex = 0;

    const haiku = {
        start: [0, 4, 8],
        stop: [2, 6, 10],
        line: [line1, line2, line3]
    }

    const intervalID = setInterval(checkTime, 1000);

    function checkTime() {
        for (let i = 0; i < haiku.start.length; i++) {
            if (haiku.start[i] < myVideo.currentTime && myVideo.currentTime < haiku.stop[i]) {
                haiku.line[i].className = 'showing';
            }
            else {
                haiku.line[i].className = 'hidden';
            }
        }
    }

    fs.addEventListener('click', function() {
    // The fullscreenElement attribute returns null if the element is in windowed mode
    if (!document.fullscreenElement) {
        // document.documentElement returns the Element that is a direct child of the document,   which is the <html> element
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
    });

    filterIcon.addEventListener('click', function() {
        currentFilterIndex = (currentFilterIndex + 1) % filters.length;
        myVideo.style.filter = filters[currentFilterIndex];
    });
})();