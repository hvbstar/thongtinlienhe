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
const audio = document.getElementById('welcome-audio');

// Khi trang load, hiển thị lớp phủ và bảng lời chào
window.addEventListener('load', function() {
    overlay.style.display = 'block';
    welcomeMessage.style.display = 'flex';

    // Xử lý video nền (nếu có)
    const videoBackground = document.querySelector('.video-background');
    if (videoBackground) {
        videoBackground.style.display = 'none';

        videoBackground.oncanplaythrough = function() {
            videoBackground.style.display = 'block';
        };
    }
});

// Khi nhấn vào nút "Nhấn OK Để Tiếp Tục"
continueButton.addEventListener('click', function() {
    // Phát nhạc nếu tồn tại
    if (audio) {
        audio.play().then(() => {
            console.log("Âm thanh đã phát thành công.");
        }).catch((error) => {
            console.error("Không thể phát âm thanh:", error);
            alert("Vui lòng nhấn OK một lần nữa để phát âm thanh.");
        });
    }

    // Ẩn bảng lời chào và lớp phủ
    welcomeMessage.style.display = 'none';
    overlay.style.display = 'none';
});

// Mã hóa và hiển thị phần bản quyền "Design by Hoang Van Bao."
(function() {
    const _0x4e76 = [
        '\u0044\u0065\u0073\u0069\u0067\u006e\u0020\u0062\u0079\u0020\u0048\u006f\u0061\u006e\u0067\u0020\u0056\u0061\u006e\u0020\u0042\u0061\u006f'
    ];

    const _0x3f21 = function(_0x5c1d, _0x1c3f) {
        return _0x4e76[_0x5c1d];
    };

    // Tạo phần tử hiển thị bản quyền
    const copyrightElement = document.createElement('div');
    copyrightElement.style.position = 'fixed';
    copyrightElement.style.bottom = '5px';
    copyrightElement.style.left = '50%';
    copyrightElement.style.transform = 'translateX(-50%)';
    copyrightElement.style.color = 'white';
    copyrightElement.style.fontSize = '14px';
    copyrightElement.style.fontFamily = 'Arial, sans-serif';
    copyrightElement.style.zIndex = '9999';
    copyrightElement.innerHTML = _0x3f21(0);

    document.body.appendChild(copyrightElement);

    // Kiểm tra chỉnh sửa hoặc xóa phần tử
    const originalContent = copyrightElement.outerHTML;

    // Kiểm tra nếu phần tử bị thay đổi hoặc xóa
    setInterval(function() {
        if (copyrightElement.outerHTML !== originalContent) {
            alert('Phần bản quyền đã bị thay đổi hoặc xóa! Trang sẽ ngừng hoạt động.');
            document.body.innerHTML = ''; // Xóa toàn bộ nội dung trang
            throw new Error('Phần bản quyền bị chỉnh sửa.');
        }
    }, 1000);

    // Ngăn xóa phần tử bằng MutationObserver
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (!document.body.contains(copyrightElement)) {
                document.body.appendChild(copyrightElement);
                alert('Không thể xóa phần bản quyền này! Trang sẽ ngừng hoạt động.');
                document.body.innerHTML = ''; // Gây lỗi trang
                throw new Error('Phần bản quyền bị xóa.');
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Tạo hàm bảo vệ mã nguồn
    function protectCode() {
        // Nếu đoạn mã này bị xóa, trang sẽ gặp lỗi
        setTimeout(protectCode, 100);
    }
    protectCode();
})();

// Ngăn ngừa sao chép (copy)
document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert("Sao chép không được phép trên trang web này!");
  });
  
  // Ngừng chọn văn bản (select)
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });
  
  // Ngừng các thao tác chạm (touch) trên thiết bị di động
  document.body.addEventListener('touchstart', function(e) {
    e.preventDefault();
  });  
