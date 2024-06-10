(function() {
    document.addEventListener('DOMContentLoaded', function () {
        AOS.init();

        new TypeIt("h1", {
            speed: 100,
            loop: false,
        }).go();

        const container = document.getElementById('characterGrid');
        let characters = [];
        let originalCharactersData = [];

        // Fetch JSON data
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                originalCharactersData = data.slice(); // Make a copy of the original data
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

                let hiddenFlags = {
                    card7: false,
                    card12: false,
                    card15: false,
                    card18: false,
                    card22: false,
                    card26: false
                };

                function handleCharacterVisibility(cardId, percentageToRemove, keepOnlyFour = false) {
                    const card = document.getElementById(cardId);
                    const cardPos = card.getBoundingClientRect().top + window.scrollY;

                    if (window.scrollY + window.innerHeight > cardPos) {
                        if (!hiddenFlags[cardId]) {
                            hiddenFlags[cardId] = true;
                            let numToRemove = keepOnlyFour ? characters.length - 4 : Math.floor(characters.length * percentageToRemove);
                            for (let i = 0; i < numToRemove; i++) {
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
                                }, 2000);
                                characters.splice(index, 1);
                            }
                        }
                    }
                }

                function restoreAllCharacters() {
                    characters = [];
                    container.innerHTML = '';
                    originalCharactersData.forEach(character => {
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

                    // Re-attach click event to characters
                    document.querySelectorAll('.character').forEach(character => {
                        character.addEventListener('click', function () {
                            const id = this.dataset.id;
                            const characterData = originalCharactersData.find(c => c.id == id);
                            if (characterData) {
                                document.getElementById('popup-title').innerText = characterData.title;
                                document.getElementById('popup-description').innerText = characterData.description;
                                document.getElementById('popup').classList.remove('hidden');
                            }
                        });
                    });

                    // Animate characters walking in from left and right
                    characters.forEach((character, index) => {
                        character.style.display = 'block';
                        character.style.opacity = '1';
                        let direction = Math.random() > 0.5 ? 'left' : 'right';
                        character.classList.add(`walk-${direction}-in`);
                        character.firstChild.classList.remove('face-down');
                        character.firstChild.classList.add(direction === 'left' ? 'face-right' : 'face-left');
                    });
                    

                    setTimeout(() => {
                        characters.forEach(character => {
                            character.classList.remove('walk-left-in', 'walk-right-in');
                            character.firstChild.classList.remove('face-left', 'face-right');
                            character.firstChild.classList.add('face-down');
                        });
                    }, 5000); // Duration should match the animation time
                }

                window.addEventListener('scroll', function () {
                    handleCharacterVisibility('card7', 0.15);
                    handleCharacterVisibility('card12', 0.15);
                    handleCharacterVisibility('card15', 0.15);
                    handleCharacterVisibility('card18', 0.15);
                    handleCharacterVisibility('card21', 0, true);

                    const card26 = document.getElementById('card26');
                    const card26Pos = card26.getBoundingClientRect().top + window.scrollY;
                    if (window.scrollY + window.innerHeight > card26Pos) {
                        if (!hiddenFlags.card26) {
                            hiddenFlags.card26 = true;
                            restoreAllCharacters();
                        }
                    } else {
                        hiddenFlags.card26 = false;
                    }
                });
            });
    });
})();
