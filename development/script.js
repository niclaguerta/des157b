(function(){
    document.addEventListener('DOMContentLoaded', function () {
        AOS.init();

        new TypeIt("h1", {
            speed: 100,
            loop: false,
        }).go();

        const container = document.getElementById('characterGrid');
        let characters = [];

        // Fetch JSON data
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(character => {
                    const characterDiv = document.createElement('div');
                    characterDiv.classList.add('character');
                    characterDiv.dataset.id = character.id;
                    const img = document.createElement('img');
                    img.src = 'images/sprite.png';
                    img.alt = 'character';
                    img.classList.add('characterart', 'face-down');
                    characterDiv.appendChild(img);
                    container.appendChild(characterDiv);
                    characters.push(characterDiv);
                });

                // Add click event to characters
                document.querySelectorAll('.character').forEach(character => {
                    character.addEventListener('click', function () {
                        const id = this.dataset.id;
                        const characterData = data.find(c => c.id == id);
                        if (characterData) {
                            document.getElementById('popup-title').innerText = characterData.title;
                            document.getElementById('popup-description').innerText = characterData.description;
                            document.getElementById('popup').classList.remove('hidden');
                        }
                    });
                });

                // Close popup
                document.querySelector('.popup .close').addEventListener('click', function () {
                    document.getElementById('popup').classList.add('hidden');
                });

                // Close popup on scroll to top
                window.addEventListener('scroll', function () {
                    if (window.scrollY === 0) {
                        document.getElementById('popup').classList.add('hidden');
                    }
                });

                let card3 = document.getElementById('card3');
                let card5 = document.getElementById('card5');
                let hiddenCard3 = false;
                let hiddenCard5 = false;

                function handleCharacterVisibility(card, hiddenFlag, setFlag) {
                    let cardPos = card.getBoundingClientRect().top + window.scrollY;

                    if (window.scrollY + window.innerHeight > cardPos) {
                        if (!hiddenFlag) {
                            setFlag(true);
                            // Select and hide 20% of the characters
                            for (let i = 0; i < Math.floor(characters.length * 0.2); i++) {
                                let index = Math.floor(Math.random() * characters.length);
                                let character = characters[index];
                                let direction = Math.random() > 0.5 ? 'left' : 'right';
                                character.classList.add(`walk-${direction}`);
                                character.firstChild.classList.remove('face-down');
                                character.firstChild.classList.add(`face-${direction}`);
                                character.style.transition = 'opacity 2s ease-out';
                                character.style.opacity = '0';
                                setTimeout(() => {
                                    character.style.display = 'none';
                                }, 2000); // Ensure it disappears after fade out
                            }
                        }
                    } else {
                        if (hiddenFlag) {
                            setFlag(false);
                            // Show all characters
                            characters.forEach(char => {
                                char.style.display = 'block';
                                char.style.transition = 'opacity 2s ease-in';
                                char.style.opacity = '1';
                                char.classList.remove('walk-left', 'walk-right');
                                char.firstChild.classList.remove('face-left', 'face-right');
                                char.firstChild.classList.add('face-down');
                            });
                        }
                    }
                }

                window.addEventListener('scroll', function () {
                    handleCharacterVisibility(card3, hiddenCard3, val => hiddenCard3 = val);
                    handleCharacterVisibility(card5, hiddenCard5, val => hiddenCard5 = val);
                });
            });
    });
})()