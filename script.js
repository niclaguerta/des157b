(function() {
    'use strict';

    const button = document.querySelector('button');
    const body = document.querySelector('body');
    const banner = document.querySelector('#banner');
    const sections = document.querySelectorAll('section');
    const quote = document.querySelector('#quote');
    const chonkImage = document.querySelector('#chonk img'); 
    const footer = document.querySelector('#footer');
    let mode = 'dark';

    button.addEventListener('click', function() {
        if (mode === 'dark') {
            body.className = 'switch';
            banner.className = 'switch';
            button.className = 'switch';
            quote.className = 'switch';
            footer.className = 'switch';
            chonkImage.src = 'images/sleep.png'; // Change to the sleep image
            chonkImage.width = 80; 
            chonkImage.height = 80;
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
            chonkImage.width = 80; 
            chonkImage.height = 80; 
            for (const section of sections) {
                section.removeAttribute('class');
            }
            mode = 'dark';
        }
    });
})();
