let modal, modalTitle, modalMessage;
let victoryModal, victoryModalTitle, victoryModalMessage;
let gameOverModal, gameOverModalTitle, gameOverModalMessage;

function openModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;

    modal.style.display = "block";

}

function openVictoryModal(title, message) {
    victoryModalTitle.textContent = title;
    victoryModalMessage.textContent = message;
    
    victoryModal.style.display = "block";
    
}

function openGameOverModal(title, message) {
    gameOverModalTitle.textContent = title;
    gameOverModalMessage.textContent = message;

    gameOverModal.style.display = "block";

}

function closeModal() {
    modal.style.display = "none";
    victoryModal.style.display = "none";
    gameOverModal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    modal = document.getElementById('modal');
    modalTitle = document.getElementById('modal-title');
    modalMessage = document.getElementById('modal-message');
    victoryModal = document.getElementById('victory-modal');
    victoryModalTitle = document.getElementById('victory-modal-title');
    victoryModalMessage = document.getElementById('victory-modal-message');
    gameOverModal = document.getElementById('gameover-modal');
    gameOverModalTitle = document.getElementById('gameover-modal-title');
    gameOverModalMessage = document.getElementById('gameover-modal-message');
    const etext = 'Pok\u00E9Gu\u00E9ss';

    openModal(`${etext}: Guessing Game`, 'PokeGuess, the ultimate guessing game where your challenge is to identify three bouncing silhouettes from four options. Be mindful of their movements, time, and wrong choices, and aim to score five points by winning each round - Good luck!')


    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
});

export { openModal, openVictoryModal, openGameOverModal, closeModal };