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

// Hàm kiểm tra xem trang đang được mở trong trình duyệt tích hợp của các ứng dụng
function isInAppBrowser() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const inAppBrowsers = [
        "Zalo",        // Zalo
        "FBAN",        // Facebook App on iOS
        "FBAV",        // Facebook App on Android
        "Instagram",   // Instagram
        "Line",        // LINE App
        "Snapchat",    // Snapchat
        "Twitter",     // Twitter App
        "TikTok",      // TikTok App
        "WhatsApp",    // WhatsApp
        "Messenger"    // Facebook Messenger
    ];

    // Kiểm tra nếu User-Agent chứa bất kỳ chuỗi nào trong danh sách
    return inAppBrowsers.some(browser => userAgent.includes(browser));
}

// Nếu mở trên trình duyệt tích hợp, hiển thị cảnh báo
if (isInAppBrowser()) {
    // Hiển thị thông báo yêu cầu mở trong trình duyệt khác
    document.getElementById('app-warning').style.display = 'block';

    // Ẩn video nền và hiển thị hình ảnh nền fallback
    const videoBackground = document.querySelector('.video-background');
    const fallbackImage = document.querySelector('.fallback-image');

    if (videoBackground) videoBackground.style.display = 'none';
    if (fallbackImage) fallbackImage.style.display = 'block';
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

    // Hàm Copy Số Tài Khoản
function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('alert-message');

    // Cập nhật nội dung
    alertMessage.textContent = message;

    // Hiển thị bảng thông báo và tạo hiệu ứng fade-in
    alertBox.style.visibility = 'visible';
    alertBox.style.opacity = 1;
    alertBox.style.transition = 'opacity 0.3s ease-in-out, visibility 0s 0s';
}

function closeCustomAlert() {
    const alertBox = document.getElementById('custom-alert');

    // Hiệu ứng fade-out và đảm bảo không bị nháy lại
    alertBox.style.opacity = 0;
    alertBox.style.visibility = 'hidden';
    alertBox.style.transition = 'opacity 0.3s ease-in-out, visibility 0s 0.3s';
}

// Ví dụ cách sử dụng
function copyAccount(bankName, accountNumber) {
    navigator.clipboard.writeText(accountNumber)
        .then(() => {
            showCustomAlert(`Số tài khoản ${bankName} đã được sao chép: ${accountNumber}`);
        })
        .catch(() => {
            showCustomAlert('Sao chép thất bại, vui lòng thử lại!');
        });
}

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

// Ngừng chuột phải
document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Ngừng chuột phải
});

// Ngừng các phím tắt: Ctrl + U, F12, Ctrl + Shift + I (mở DevTools)
document.addEventListener('keydown', function(e) {
    // Ngừng Ctrl + U (Xem mã nguồn)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
    }
    // Ngừng F12 (Mở Developer Tools)
    if (e.keyCode === 123) { 
        e.preventDefault();
    }
    // Ngừng Ctrl + Shift + I (Mở Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
    }
    // Ngừng Ctrl + Shift + J (Mở Console DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
    }
    // Ngừng F11 (Chế độ toàn màn hình)
    if (e.keyCode === 122) {
        e.preventDefault();
    }
});

// Kiểm tra khi DevTools bị mở và ngừng các hành động
(function() {
    let devtoolsOpen = false;
    const threshold = 160;
    window.addEventListener('resize', function() {
        if (window.innerWidth - window.outerWidth > threshold || window.innerHeight - window.outerHeight > threshold) {
            devtoolsOpen = true;
            alert('Developer tools đã được mở!');
            // Bạn có thể thực hiện hành động ngừng hoạt động của trang nếu cần
        }
    });

    setInterval(function() {
        if (devtoolsOpen) {
            // Chặn trang nếu DevTools bị mở
            document.body.innerHTML = '';
            alert('Trang đã bị chặn vì Developer tools đã được mở!');
        }
    }, 1000);
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
