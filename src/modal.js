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
    
    openModal('SilhouetteMon: Guessing Game', 'Welcome to the silhouette matching game! Your goal is to correctly identify the three bouncing silhouettes out of four choices. Pay attention to their movements and match them with the correct options on the screen. Be careful, as selecting the wrong answer or running out of time will cost you the game. Score one point for round won, and strive to reach five points to win! Good luck!')


    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    }
});

export { openModal, openVictoryModal, openGameOverModal, closeModal };