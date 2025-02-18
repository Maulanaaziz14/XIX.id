// sebelum masuk web
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("hidden");
        document.body.classList.add("loaded")
    }, 4000); // Loader hilang setelah 4 detik
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth', block: 'start'
        });
    });
});
// ===============================================================================
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded. Initializing Swiper...");

    // Cek tampilan mobile/desktop
    let isMobile = window.innerWidth <= 768;

    // Swiper untuk Movie Slider (Available)
    if (isMobile) {
        new Swiper(".movie-slider", {
            slidesPerView: 2.5,
            spaceBetween: 20,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            speed: 4000,
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            grabCursor: true
        });
    } else {
        document.querySelector(".swiper-wrapper").classList.add("no-swiper");
    }

    // Swiper untuk Coming Soon (Auto Swipe)
    if (isMobile) {
        new Swiper(".coming-soon-slider", {
            slidesPerView: 2.5,
            spaceBetween: 20,
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            speed: 4000,
            pagination: { el: ".swiper-pagination", clickable: true }
            
        });
    } else {
        document.querySelector(".swiper-wrapper").classList.add("no-swiper");
    }

    console.log("Swiper initialized for available movies & coming soon.");
});

// Event Listener untuk Tombol Pemesanan
document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("order-button")) {
        let selectedFilm = event.target.getAttribute("data-film");
        if (selectedFilm) {
            localStorage.setItem("selectedFilm", selectedFilm);
            window.location.href = "bioskop.html";
        } else {
            console.error("Data film tidak ditemukan!");
        }
    }
});
