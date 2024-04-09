(function() {
    'use strict';

    const button = document.querySelector('#toggleSwitch');
    const toggleMusicButton = document.getElementById('toggleMusic');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const quote = document.querySelector('#quote');
    const chonkImage = document.querySelector('#chonk img'); 
    const footer = document.querySelector('#footer');
    let mode = 'day'; // Initial mode is set to 'day'

    const musicDay = new Audio('audio/overture.mp3');
    const musicNight = new Audio('audio/grandpa.mp3');
    let musicPlaying = false;

    button.addEventListener('click', function() {
        if (mode === 'day') {
            // Switching to night mode
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            quote.className = 'switch';
            footer.className = 'switch';
            chonkImage.src = 'images/sleep.png'; // Change to the sleep image
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'night';
            if (musicPlaying) {
                musicDay.pause(); // Now pauses day music when switching to night mode
                musicNight.play(); // Now plays night music in night mode
            }
        } else {
            // Switching to day mode
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            quote.removeAttribute('class');
            footer.removeAttribute('class');
            chonkImage.src = 'images/awake.png'; // Change back to the awake image
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'day';
            if (musicPlaying) {
                musicNight.pause(); // Now pauses night music when switching to day mode
                musicDay.play(); // Now plays day music in day mode
            }
        }
    });

    toggleMusicButton.addEventListener('click', function() {
        if (musicPlaying) {
            // If music is currently playing, pause the appropriate track based on the inverted logic
            if (mode === 'night') {
                musicNight.pause();
            } else {
                musicDay.pause();
            }
            musicPlaying = false;
            toggleMusicButton.textContent = "Play Music";
        } else {
            // Play the appropriate track based on the current mode with inverted logic
            if (mode === 'night') {
                musicNight.play();
            } else {
                musicDay.play();
            }
            musicPlaying = true;
            toggleMusicButton.textContent = "Pause Music"; 
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        const audioClip = new Audio('audio/click.mp3');
    
        function playSound() {
            if (audioClip.paused) {
                audioClip.play();
            } else {
                audioClip.currentTime = 0;
            }
        }
    
        const links = document.querySelectorAll('section a');
        links.forEach(link => {
            link.addEventListener('mouseenter', playSound);
        });

        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', playSound);
        });
    });
    
})();
