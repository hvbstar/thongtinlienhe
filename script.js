document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".toggle__theme");
    const card = document.querySelector(".app");
    const contactWidget = document.querySelector("#contact-widget");
    const contactIcon = document.querySelector(".contact-icon");
    const contactMenu = document.querySelector(".contact-menu");

    // Kiểm tra nếu các phần tử cần thiết tồn tại
    if (!contactWidget || !contactIcon || !contactMenu) {
        console.error("Không tìm thấy phần tử cần thiết!");
        return;
    }

    // Toggle menu khi click vào icon
    contactIcon.addEventListener("click", function (event) {
        event.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
        contactMenu.classList.toggle("show");
    });

    // Ẩn menu khi click ra ngoài
    document.addEventListener("click", function (event) {
        if (!contactMenu.contains(event.target) && !contactIcon.contains(event.target)) {
            contactMenu.classList.remove("show");
        }
    });

    // Chuyển đổi theme
    if (toggle) {
        toggle.addEventListener("click", (event) => {
            event.stopPropagation(); // Ngăn chặn sự kiện click ảnh hưởng đến menu

            let theme = toggle.querySelector(".fas");
            console.log("Toggling theme...");

            contactWidget.classList.toggle("dark");

            if (theme.classList.contains("fa-moon")) {
                console.log("Switching to dark mode...");
                theme.classList.remove("fa-moon");
                theme.classList.add("fa-sun");
                card.classList.add("dark");
                contactWidget.classList.add("dark");
            } else {
                console.log("Switching to light mode...");
                theme.classList.remove("fa-sun");
                theme.classList.add("fa-moon");
                card.classList.remove("dark");
                contactWidget.classList.remove("dark");
            }
        });
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

document.addEventListener("DOMContentLoaded", function() {
    // Lấy phần tử âm thanh của giọng Google và nhạc nền
    let googleVoice = document.getElementById("google-voice");
    let music = document.getElementById("welcome-audio");
    let continueButton = document.getElementById("continue-button");

    // Kiểm tra xem các phần tử có tồn tại không
    if (!googleVoice || !music || !continueButton) {
        console.error("Lỗi: Không tìm thấy một trong các phần tử audio hoặc nút!");
        return;
    }

    // Khi nhấn vào nút "Nhấn OK Để Tiếp Tục"
    continueButton.addEventListener("click", function() {
        // Dừng nhạc nếu đang phát trước khi phát giọng Google
        music.pause();
        music.currentTime = 0;

        // Phát giọng Google
        googleVoice.play().then(() => {
            console.log("Giọng Google đang phát...");

            // Sau khi giọng Google phát xong, dừng giọng và phát nhạc
            googleVoice.onended = function() {
                console.log("Giọng Google đã dừng, phát nhạc...");
                googleVoice.pause();
                googleVoice.currentTime = 0;
                music.play().then(() => {
                    console.log("Nhạc nền đã phát.");
                }).catch((error) => {
                    console.error("Không thể phát nhạc:", error);
                    alert("Vui lòng nhấn OK một lần nữa để phát nhạc.");
                });
            };
        }).catch((error) => {
            console.error("Không thể phát giọng Google:", error);
        });
    });
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

    // Hàm copy số tài khoản
    function showCustomAlert(message) {
        const alertBox = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('alert-message');
    
        // Cập nhật nội dung
        alertMessage.textContent = message;
    
        // Hiển thị bảng thông báo
        alertBox.style.display = 'flex';
        alertBox.style.animation = 'fadeIn 0.3s ease-in-out';
    }
    
    function closeCustomAlert() {
        const alertBox = document.getElementById('custom-alert');
    
        // Thêm hiệu ứng mờ dần khi đóng
        alertBox.style.animation = 'fadeOut 0.3s ease-in-out';
    
        // Đợi hiệu ứng hoàn tất trước khi ẩn
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 300);
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

// Hàm copy Email
function copyEmail() {
    const email = "hvb.dvfb@gmail.com"; // Địa chỉ Gmail cần sao chép
    navigator.clipboard.writeText(email)
        .then(() => {
            showCustomAlert(`Bạn cần hỗ trợ? Gửi email cho tôi tại: ${email}`);
        })
        .catch(() => {
            showCustomAlert('Sao chép Gmail thất bại, vui lòng thử lại!');
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
        copyrightElement.classList.add('rainbow-border');
        copyrightElement.style.position = 'fixed';
        copyrightElement.style.bottom = '5px';
        copyrightElement.style.left = '50%';
        copyrightElement.style.transform = 'translateX(-50%)';
        copyrightElement.style.color = 'white';
        copyrightElement.style.fontSize = '14px';
        copyrightElement.style.fontFamily = 'Arial, sans-serif';
        copyrightElement.style.zIndex = '9997';
        copyrightElement.innerHTML = _0x3f21(0);
    
        document.body.appendChild(copyrightElement);
    
        // Kiểm tra chỉnh sửa hoặc xóa phần tử
        const originalContent = copyrightElement.outerHTML;
    
        // Kiểm tra nếu phần tử bị thay đổi hoặc xóa
        setInterval(function() {
            if (copyrightElement.outerHTML !== originalContent) {
                // Ngay lập tức gây lỗi khi có sự thay đổi
                alert('Phần bản quyền đã bị thay đổi hoặc xóa! Trang sẽ ngừng hoạt động.');
                document.body.innerHTML = ''; // Xóa toàn bộ nội dung trang
                throw new Error('Phần bản quyền bị chỉnh sửa.');
            }
        }, 100); // Kiểm tra thường xuyên hơn (100ms) để phát hiện sự thay đổi nhanh chóng
    
        // Ngăn xóa phần tử bằng MutationObserver
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // Kiểm tra nếu phần tử bị xóa
                if (!document.body.contains(copyrightElement)) {
                    document.body.appendChild(copyrightElement);
                    alert('Không thể xóa phần bản quyền này! Trang sẽ ngừng hoạt động.');
                    document.body.innerHTML = ''; // Gây lỗi trang
                    throw new Error('Phần bản quyền bị xóa.');
                }
    
                // Kiểm tra thay đổi nội dung phần tử
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    if (copyrightElement.innerHTML !== _0x3f21(0)) {
                        alert('Phần bản quyền đã bị thay đổi! Trang sẽ ngừng hoạt động.');
                        document.body.innerHTML = '';
                        throw new Error('Phần bản quyền bị thay đổi.');
                    }
                }
            });
        });
    
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    
        // Tạo hàm bảo vệ mã nguồn, ngừng ngay khi có thay đổi
        function protectCode() {
            if (document.body.innerHTML.includes('Hoàng Văn Bảo')) {
                setTimeout(protectCode, 100); // Tiếp tục kiểm tra
            } else {
                alert('Mã JavaScript bị thay đổi hoặc xóa. Trang sẽ ngừng hoạt động.');
                document.body.innerHTML = ''; // Xóa nội dung trang
                throw new Error('Mã JavaScript bị thay đổi.');
            }
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

// Hàm để hiển thị/ẩn menu khi nhấp vào icon CSKH
function toggleContactMenu() {
    const menu = document.querySelector(".contact-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}
