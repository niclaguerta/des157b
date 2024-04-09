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
    let mode = 'dark';

    const music = new Audio('audio/overture.mp3');
    let musicPlaying = false;

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            quote.className = 'switch';
            footer.className = 'switch';
            chonkImage.src = 'images/sleep.png'; // Change to the sleep image
            for (const section of sections) {
                section.className = 'switch';
            }
            mode = 'light';
        } else {
            body.removeAttribute('class');
            banner.removeAttribute('class');
            button.removeAttribute('class');
            quote.removeAttribute('class');
            footer.removeAttribute('class');
            chonkImage.src = 'images/awake.png'; // Change back to the awake image
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark';
        }
    });

    toggleMusicButton.addEventListener('click', function() {
        if (musicPlaying) {
            music.pause();
            musicPlaying = false;
            toggleMusicButton.textContent = "Play Music";
        } else {
            music.play();
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
        buttons.forEach(link => {
            link.addEventListener('mouseenter', playSound);
        });
    });
    
})();

