(function() {
    // Ensure the script runs only after the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function () {
        // Initialize the AOS (Animate On Scroll) library
        AOS.init();

        // Initialize the TypeIt library for the header text animation
        new TypeIt("h1", {
            speed: 100,
            loop: false,
        }).go();

        // Select the container for the character grid
        const container = document.getElementById('characterGrid');
        // Array to hold the character elements
        let characters = [];
        // Copy of the original character data
        let originalCharactersData = [];

        // Fetch JSON data
        fetch('data.json')
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                originalCharactersData = data.slice(); // Make a copy of the original data
                data.forEach(character => {
                    // Create a div for each character
                    const characterDiv = document.createElement('div');
                    characterDiv.classList.add('character');
                    characterDiv.dataset.id = character.id;

                    // Create an image element for the character sprite
                    const img = document.createElement('img');
                    img.src = 'images/sprite.png';
                    img.alt = 'character';
                    img.classList.add('characterart', 'face-down');

                    // Append the image to the character div
                    characterDiv.appendChild(img);
                    // Append the character div to the container
                    container.appendChild(characterDiv);
                    // Add the character div to the characters array
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

                // Close popup when the close button is clicked
                document.querySelector('.popup .close').addEventListener('click', function () {
                    document.getElementById('popup').classList.add('hidden');
                });

                // Close popup when scrolling back to the top
                window.addEventListener('scroll', function () {
                    if (window.scrollY === 0) {
                        document.getElementById('popup').classList.add('hidden');
                    }
                });

                // Flags to keep track of which cards have been handled
                let hiddenFlags = {
                    card7: false,
                    card12: false,
                    card15: false,
                    card18: false,
                    card21: false,
                    card24: false
                };

                // Function to handle character visibility based on the card
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

                // Function to restore all characters and animate them walking in from the sides
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

                    // Remove walking animation classes after the animation completes
                    setTimeout(() => {
                        characters.forEach(character => {
                            character.classList.remove('walk-left-in', 'walk-right-in');
                            character.firstChild.classList.remove('face-left', 'face-right');
                            character.firstChild.classList.add('face-down');
                        });
                    }, 5000); // Duration should match the animation time
                }

                // Scroll event listener to handle visibility and restoration of characters
                window.addEventListener('scroll', function () {
                    handleCharacterVisibility('card7', 0.15);
                    handleCharacterVisibility('card12', 0.15);
                    handleCharacterVisibility('card15', 0.15);
                    handleCharacterVisibility('card18', 0.15);
                    handleCharacterVisibility('card21', 0, true);

                    const card24 = document.getElementById('card24');
                    const card24Pos = card24.getBoundingClientRect().top + window.scrollY;
                    if (window.scrollY + window.innerHeight > card24Pos) {
                        if (!hiddenFlags.card24) {
                            hiddenFlags.card24 = true;
                            restoreAllCharacters();
                        }
                    } else {
                        hiddenFlags.card24 = false;
                    }
                });
            });
    });
})();
