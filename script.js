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

// Hàm Copy Số Tài Khoản
document.addEventListener("DOMContentLoaded", function () {
    // Gán sự kiện click cho các phần tử
    document.getElementById("mbbank").addEventListener("click", function () {
        copyAccountNumber("MB Bank");
    });
    document.getElementById("vietinbank").addEventListener("click", function () {
        copyAccountNumber("VietinBank");
    });
    document.getElementById("vietcombank").addEventListener("click", function () {
        copyAccountNumber("Vietcombank");
    });
    document.getElementById("momo").addEventListener("click", function () {
        copyAccountNumber("Momo");
    });

    // Kiểm tra xem có phải đang chạy trong Zalo WebView không
    function isZaloWebView() {
        const userAgent = navigator.userAgent || navigator.vendor;
        return /zalo/i.test(userAgent);
    }

    // Kiểm tra xem có phải đang chạy trong Messenger WebView không
    function isMessengerWebView() {
        const userAgent = navigator.userAgent || navigator.vendor;
        return /FBAN|FBAV/i.test(userAgent);
    }

    // Xử lý Zalo WebView
    if (isZaloWebView()) {
        // Hiển thị cảnh báo và fallback hình nền
        document.getElementById("zalo-warning").style.display = "block";
        document.querySelector(".video-background").style.display = "none";
        document.querySelector(".fallback-image").style.display = "block";
        return; // Không chạy tiếp mã JS cho video nền
    }

    // Hàm sao chép số tài khoản
    function copyAccountNumber(bank) {
        const accountNumbers = {
            "MB Bank": "333005678",
            "VietinBank": "106877439674",
            "Vietcombank": "1041231200",
            "Momo": "0943290373",
        };

        const accountNumber = accountNumbers[bank];

        // Messenger không hỗ trợ clipboard API hoàn chỉnh, dùng textarea fallback
        if (isMessengerWebView()) {
            const textarea = document.createElement("textarea");
            textarea.value = accountNumber;
            textarea.style.position = "absolute";
            textarea.style.left = "-9999px";
            document.body.appendChild(textarea);
            textarea.select();

            try {
                const successful = document.execCommand("copy");
                if (successful) {
                    alert("Số tài khoản " + bank + " đã được sao chép: " + accountNumber);
                } else {
                    alert("Không thể sao chép số tài khoản. Vui lòng thử lại!");
                }
            } catch (err) {
                console.error("Fallback copy failed", err);
                alert("Không thể sao chép số tài khoản. Vui lòng thử lại!");
            }
            document.body.removeChild(textarea);
        } else {
            // Dùng clipboard API nếu không phải Messenger
            navigator.clipboard.writeText(accountNumber).then(function () {
                alert("Số tài khoản " + bank + " đã được sao chép: " + accountNumber);
            }).catch(function (error) {
                console.error("Có lỗi xảy ra khi sao chép số tài khoản: ", error);
                alert("Không thể sao chép số tài khoản. Vui lòng thử lại!");
            });
        }

        // Khôi phục video nền nếu bị gián đoạn
        const videoBackground = document.querySelector(".video-background");
        if (videoBackground && videoBackground.paused) {
            requestAnimationFrame(() => {
                videoBackground.play().catch((error) => {
                    console.error("Không thể phát video nền: ", error);
                });
            });
        }
    }

    // Đảm bảo video nền không hiển thị thanh điều khiển và phát liên tục
    const videoBackground = document.querySelector(".video-background");
    if (videoBackground) {
        videoBackground.controls = false; // Tắt thanh điều khiển

        // Đảm bảo video phát khi trang được tải
        videoBackground.addEventListener("loadeddata", function () {
            videoBackground.play().catch((error) => {
                console.error("Không thể phát video nền: ", error);
            });
        });
    }

    // Phát lại video khi người dùng quay lại trang
    window.addEventListener("focus", function () {
        if (videoBackground && videoBackground.paused) {
            requestAnimationFrame(() => {
                videoBackground.play().catch((error) => {
                    console.error("Không thể phát video nền khi quay lại: ", error);
                });
            });
        }
    });
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
