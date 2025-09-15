const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
const slider = document.getElementById("testimoniSlider");

if (slider) {
  let scrollAmount = 0;
  setInterval(() => {
    scrollAmount += 320;
    if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
      scrollAmount = 0;
    }
    slider.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }, 3000);
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery-item img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.getAttribute("data-full");
    captionText.textContent = img.alt;
  });
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}


if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}


const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

 const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
  }
});

// === BERITA TERBARU DI BERANDA ===
document.addEventListener("DOMContentLoaded", () => {
  const beritaContainer = document.getElementById("berita-container");

  if (beritaContainer) {
    fetch("beritalengkap.json")
      .then(response => response.json())
      .then(data => {
        // Ambil hanya 3 berita pertama
        const beritaTerbaru = data.slice(0, 3);

        beritaTerbaru.forEach(item => {
          const beritaCard = document.createElement("div");
          beritaCard.classList.add("berita-card");

          beritaCard.innerHTML = `
            <a href="${item.link}">
              <img src="${item.gambar}" alt="${item.judul}" class="berita-img">
              <h4>${item.judul}</h4>
               <span class="berita-date">${item.tanggal}</span>
            </a>
            <p>${item.deskripsi}</p>
          `;

          beritaContainer.appendChild(beritaCard);
        });
      })
      .catch(error => {
        console.error("Gagal memuat data berita:", error);
        beritaContainer.innerHTML = "<p>Tidak dapat memuat berita terbaru.</p>";
      });
  }
});

