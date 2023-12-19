document.addEventListener("DOMContentLoaded", function () {
    let coinCount = 0;
    let changeCount = 0;
    let energyLife = 10;
    let spinButtonDisabled = false;

    function updateUI() {
            const coinCountElement = document.getElementById("coin-count");
            const changeCountElement = document.getElementById("change-count");
            const energyLifeElement = document.getElementById("energy-life");
            const barElement = document.querySelector(".bar");

            coinCountElement.innerText = coinCount;
            changeCountElement.innerText = changeCount;
            energyLifeElement.innerText = `${energyLife}/50`;

            const barWidth = (energyLife / 50) * 100;
            barElement.style.width = `${barWidth}%`;

            // Verificar si la energía es menor o igual a cero y mostrar el overlay de "Perdiste"
            if (energyLife <= 0) {
                displayLoseOverlay();
            } else {
                // Habilitar el botón de spin si no se ha perdido
                spinButton.disabled = spinButtonDisabled;
                spinButton.addEventListener("click", spinButtonClick);
            }
        }


    const spinButton = document.getElementById("spin-button");
    spinButton.addEventListener("click", spinButtonClick);

    function spinButtonClick() {
        if (!spinButtonDisabled) {
            coinCount++;
            energyLife--;

            updateUI();

            if (energyLife <= 0) {
                // Deshabilitar el botón y llamar a la función de juego si energyLife es igual o menor a 0
                spinButtonDisabled = true;
                spinButton.removeEventListener("click", spinButtonClick);
                spinButton.disabled = true;

                // Llamar al controlador para registrar la puntuación y los intentos después de haber perdido
                const score = changeCount;
                const attempts = coinCount;
                const playerId = 1;
                const gameId = 1;

                document.getElementById("final-change-count").innerText = changeCount;
                document.getElementById("final-coin-count").innerText = coinCount;


                fetch(`/game/slotmachine/finish?playerId=${playerId}&gameId=${gameId}&score=${score}&attempts=${attempts}`)
                    .then(response => response.text())
                    .then(message => console.log(message))
                    .catch(error => console.error("Error al registrar puntuación:", error));

                // Mostrar el overlay después de la petición
                displayLoseOverlay();
            } else {
                playSlotMachine();
            }
        }
    }

    function playSlotMachine() {
        const image1 = document.getElementById("image1");
        const image2 = document.getElementById("image2");
        const image3 = document.getElementById("image3");

        const images = [
            "/img/slotmachine/icons/element1.png",
            "/img/slotmachine/icons/element2.png",
            "/img/slotmachine/icons/element3.png",
        ];

        function getRandomImage() {
            return images[Math.floor(Math.random() * images.length)];
        }

        const randomImage1 = getRandomImage();
        const randomImage2 = getRandomImage();
        const randomImage3 = getRandomImage();

        image1.innerHTML = `<img src="${randomImage1}" alt="Image1">`;
        image2.innerHTML = `<img src="${randomImage2}" alt="Image2">`;
        image3.innerHTML = `<img src="${randomImage3}" alt="Image3">`;

        // Verificar si las tres imágenes son iguales
        if (randomImage1 === randomImage2 && randomImage2 === randomImage3) {
            // Asignar puntajes según el trío específico
            switch (randomImage1) {
                case "/img/slotmachine/icons/element1.png":
                    // Trío de 'element1.png'
                    changeCount += 50;
                    displayOverlayText("Ganaste!");
                    break;
                case "/img/slotmachine/icons/element2.png":
                    // Trío de 'element2.png'
                    changeCount += 100;
                    displayOverlayText("Ganaste!");
                    break;
                case "/img/slotmachine/icons/element3.png":
                    // Trío de 'element3.png'
                    changeCount += 150;
                    displayOverlayText("Ganaste!");
                    break;
                // Agrega más casos según sea necesario
            }

            // Actualizar el DOM con el nuevo puntaje
            updateUI();
        } else if (energyLife === 0) {
            // El jugador ha perdido, pero la petición ya se realizó arriba
            // Mostrar el overlay sin realizar una petición adicional
            displayLoseOverlay();
        } else {
            // No ha ganado y tiene energía, mensaje de reintento
            displayOverlayText("Reintente...");
        }
    }

    function displayOverlayText(text) {
        const overlayText = document.getElementById("overlay-text");
        overlayText.innerText = text;
    }

    function displayLoseOverlay() {
            // Desactivar el botón de reinicio antes de mostrar el overlay
            const restartButton = document.getElementById("restart-button");
            restartButton.removeEventListener("click", restartGame);
            restartButton.disabled = true;

            // Mostrar el overlay
            const loseOverlay = document.getElementById("lose-overlay");
            loseOverlay.style.display = "block";

            // Mostrar el texto en el overlay
            displayOverlayText("Perdiste");

            // Definir la función restartGame
            function restartGame() {
                // Restablecer valores a los iniciales
                coinCount = 0;
                changeCount = 0;
                energyLife = 10;
                spinButtonDisabled = false;

                // Ocultar el overlay de "Perdiste"
                loseOverlay.style.display = "none";

                // Actualizar el DOM con los nuevos valores
                updateUI();
            }

            // Agregar un event listener al botón de reinicio después de mostrar el overlay
            restartButton.addEventListener("click", restartGame);
            restartButton.disabled = false;
        }


    // ... (código para reiniciar el juego)

    updateUI();
});
