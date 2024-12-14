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
});

// Kiểm tra xem người dùng có mở trên Zalo WebView không
function isZaloWebView() {
    return navigator.userAgent.includes("Zalo");
}

// Nếu mở trên Zalo WebView, thực hiện các hành động sau
if (isZaloWebView()) {
    // Hiển thị thông báo yêu cầu mở trong trình duyệt khác
    document.getElementById('zalo-warning').style.display = 'block';

    // Ẩn video nền và hiển thị hình ảnh nền fallback
    document.querySelector('.video-background').style.display = 'none';
    document.querySelector('.fallback-image').style.display = 'block';
}

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

// Mã hóa và hiển thị phần bản quyền "Design By Hoang Van Bao."
(function() {
    const _0x1dc45a = _0x49f7;
    const _0x246a = ['&#68;&#101;&#115;&#105;&#103;&#110;&#32;&#98;&#121;&#32;&#72;&#111;&#97;&#110;&#103;&#32;&#86;&#97;&#110;&#32;&#66;&#97;&#111;']; // Mã hóa phần bản quyền

    const copyrightText = _0x246a[0];

    // Tạo phần tử để hiển thị văn bản
    const copyrightElement = document.createElement('div');
    copyrightElement.style.position = 'fixed';
    copyrightElement.style.bottom = '5px';  // Điều chỉnh vị trí từ dưới lên
    copyrightElement.style.left = '50%';
    copyrightElement.style.transform = 'translateX(-50%)';
    copyrightElement.style.color = 'white'; // Màu trắng
    copyrightElement.style.fontSize = '14px';
    copyrightElement.style.zIndex = '9999'; // Đảm bảo nó ở trên cùng
    copyrightElement.innerHTML = copyrightText; // Thêm nội dung bản quyền vào phần tử
    
    // Thêm phần tử vào body
    document.body.appendChild(copyrightElement);
})();

// Hàm làm mờ (obfuscate) phần mã nguồn JavaScript để ngăn chặn việc chỉnh sửa dễ dàng
function _0x49f7(_0x532f85) {
    const _0x246a69 = ['Design By Hoang Van Bao'];
    return _0x246a69[0];
}
