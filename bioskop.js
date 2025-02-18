document.addEventListener("DOMContentLoaded", function () {
  const filmSelect = document.getElementById("film");
  const seatsContainer = document.getElementById("seats-container");
  const confirmButton = document.getElementById("confirm-button");

  const selectedFilm = document.getElementById("selected-film");
  const selectedSeats = document.getElementById("selected-seats");
  const selectedPackage = document.getElementById("selected-package");
  const totalPrice = document.getElementById("total-price");

  const ticketPrice = 35000;
  let selectedSeatsArray = [];
  let selectedPackagePrice = 0;
  let selectedPackageName = "-";

  // Data Trailer Film
  const trailers = {
    "aku-jati": "https://www.youtube.com/watch?v=_DDPY2w2GCE",
    "venom": "https://youtu.be/__2bjWbetsA?si=vQR2Mu0fE3Y06sml",
    "kuasa-gelap": "https://www.youtube.com/embed/video_id_3",
    "wild-robot": "https://www.youtube.com/embed/video_id_4",
  };
// =======================================================================================================

// ===========================================================================================================
// Generate kursi bioskop
  function generateSeats() {
    seatsContainer.innerHTML = "";
    selectedSeatsArray = [];
    for (let row = 0; row < 5; row++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("seat-row");

      for (let col = 0; col < 8; col++) {
        const seat = document.createElement("div");
        const seatNumber = String.fromCharCode(65 + row) + (col + 1);
        seat.classList.add("seat");
        seat.textContent = seatNumber;

        seat.addEventListener("click", function () {
          if (selectedSeatsArray.includes(seatNumber)) {
            selectedSeatsArray = selectedSeatsArray.filter((s) => s !== seatNumber);
            seat.classList.remove("selected");
          } else {
            selectedSeatsArray.push(seatNumber);
            seat.classList.add("selected");
          }
          updateSummary();
        });

        rowDiv.appendChild(seat);
      }
      seatsContainer.appendChild(rowDiv);
    }
  }

  // Update ringkasan pemesanan
  function updateSummary() {
    const filmText = filmSelect.options[filmSelect.selectedIndex].text;
    selectedFilm.textContent = filmText;
    selectedSeats.textContent = selectedSeatsArray.length > 0 ? selectedSeatsArray.join(", ") : "-";
    selectedPackage.textContent = selectedPackageName;

    const total = selectedSeatsArray.length * ticketPrice + selectedPackagePrice;
    totalPrice.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }

  // Event listener untuk pemesanan tiket
  confirmButton.addEventListener("click", function () {
    if (selectedSeatsArray.length === 0) {
      alert("Silakan pilih setidaknya satu kursi!");
      return;
    }
    alert(`Pemesanan berhasil!\nFilm: ${selectedFilm.textContent}\nKursi: ${selectedSeats.textContent}\nTotal: ${totalPrice.textContent}`);
  });
  
  // Event listener untuk pemilihan film (dropdown)
  filmSelect.addEventListener("change", function () {
    const selectedFilmValue = filmSelect.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const filmTitle = card.querySelector(".card-front").textContent.toLowerCase();
      if (filmTitle.includes(selectedFilmValue.replace("-", " "))) {
        card.style.display = "block";
        const iframe = card.querySelector("iframe");
        iframe.src = trailers[selectedFilmValue] || "";
      } else {
        card.style.display = "none";
      }
    });

    generateSeats(); // Reset kursi setiap ganti film
    updateSummary();
  });

  // Event listener untuk memilih paket makanan
  document.querySelectorAll(".package").forEach((packageDiv) => {
    packageDiv.addEventListener("click", function () {
      document.querySelectorAll(".package").forEach((p) => p.classList.remove("selected"));
      this.classList.add("selected");

      selectedPackageName = this.querySelector("p").textContent;
      selectedPackagePrice = parseInt(this.dataset.price);
      updateSummary();
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".card").forEach((card) => {
      const cardFront = card.querySelector(".card-front");
      const imageUrl = card.dataset.image;
      
      console.log("Gambar ditemukan:", imageUrl); // Debugging
  
      if (imageUrl) {
        cardFront.style.backgroundImage = `url('${imageUrl}')`;
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const filmSelect = document.getElementById("film");
    const cards = document.querySelectorAll(".card");
      // Loop semua kartu, lalu tampilkan yang sesuai film yang dipilih
      filmSelect.addEventListener("change", function () {
        const selectedFilm = filmSelect.value;
        
        // Loop semua kartu dan tampilkan hanya yang sesuai dengan film yang dipilih
        cards.forEach(card => {
            if (card.dataset.film === selectedFilm) {
                card.style.display = "block"; // Tampilkan kartu yang sesuai
            } else {
                card.style.display = "none"; // Sembunyikan kartu yang lain
            }
        });
    });
    
  
    // Panggil sekali untuk menampilkan film pertama secara default
  // Hover Card untuk Trailer
  document.querySelectorAll(".card").forEach((card) => {
    const iframe = card.querySelector("iframe");

    card.addEventListener("mouseenter", () => {
      const selectedFilmValue = filmSelect.value.toLowerCase();
      iframe.src = trailers[selectedFilmValue] || "";
    });

    card.addEventListener("mouseleave", () => {
      iframe.src = "";
    });
  });

  // Inisialisasi tampilan
  generateSeats();
  filmSelect.dispatchEvent(new Event("change"));
});

// setelah pesan akan menampilkan

document.getElementById("confirm-button").addEventListener("click", function () {
  let button = this; 
  button.innerHTML = '<span class="spinner"></span> Memproses...'; 
  button.disabled = true;

  setTimeout(() => {
  // Ambil data pesanan
    let film = document.getElementById("film").value;
    let seats = Array.from(document.querySelectorAll(".seat.selected")).map(seat => seat.textContent);
    let package = document.querySelector(".package.selected") ? document.querySelector(".package.selected").textContent : "Tidak ada";
    let totalPrice = calculateTotalPrice(seats.length, package);

    // Simpan ke localStorage
    let orderSummary = {
        film: film,
        seats: seats,
        package: package,
        totalPrice: totalPrice
    };
    localStorage.setItem("orderSummary", JSON.stringify(orderSummary));

    // Redirect ke halaman struk
    window.location.href = "struk.html";
  }, 3000); // Delay 2 detik untuk efek loading
});

// Fungsi untuk menghitung total harga
function calculateTotalPrice(seatCount, packageName) {
  let ticketPrice = 50000; // Harga tiket per kursi
  let packagePrice = 0;

  if (packageName.includes("Popcorn & Soda")) packagePrice = 30000;
  if (packageName.includes("Popcorn & Milo")) packagePrice = 25000;
  if (packageName.includes("Burger & Cola")) packagePrice = 20000;

  return (seatCount * ticketPrice) + packagePrice;
}
});
