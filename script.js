const toggle = document.querySelector(".toggle__theme");
const card = document.querySelector(".app");
toggle.addEventListener("click", () => {
    let theme = toggle.querySelector(".fas");
    if (theme.classList.contains("fa-moon")) {
        theme.classList.remove("fa-moon");
        theme.classList.add("fa-sun");
        card.classList.add("dark");
    } else {

        theme.classList.remove("fa-sun");
        theme.classList.add("fa-moon");
        card.classList.remove("dark");

    }
})

// Lấy các phần tử
const continueButton = document.getElementById('continue-button');
const overlay = document.getElementById('overlay');
const welcomeMessage = document.getElementById('welcome-message');

// Khi nhấn vào nút "Nhấn Ok Để Tiếp Tục"
continueButton.addEventListener('click', function() {
    // Phát nhạc khi nhấn vào nút (nếu cần)
    var audio = document.getElementById('welcome-audio');
    audio.play();

    // Ẩn bảng lời chào
    welcomeMessage.style.display = 'none';

    // Ẩn lớp phủ
    overlay.style.display = 'none';
});

// Khi trang load, hiển thị lớp phủ và bảng lời chào
window.onload = function() {
    overlay.style.display = 'block';
    welcomeMessage.style.display = 'flex';
};
