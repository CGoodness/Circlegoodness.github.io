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

function initGallery() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('caption');
  const closeBtn = document.querySelector('.lightbox .close');

  const galleryImages = document.querySelectorAll('.gallery-item img');
  if (galleryImages.length === 0) return;

  galleryImages.forEach(img => {
    img.addEventListener('click', function () {
      lightbox.style.display = 'block';
      lightboxImg.src = this.getAttribute('data-full');
      caption.textContent = this.alt || '';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
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

// Efek shadow saat scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 20) {
    header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
  }
});

// Animasi profil direktur saat scroll
window.addEventListener("scroll", () => {
  const direkturProfile = document.querySelector(".direktur-profile");
  const position = direkturProfile.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (position < screenHeight - 100) {
    direkturProfile.classList.add("visible");
  }
});

function getLangFilePath() {
  if (window.location.pathname.includes("/berita/") || window.location.pathname.includes("/galeri/")) {
    return "../lang.json";
  }
  return "lang.json";
}

function getBeritaFilePath() {
  if (window.location.pathname.includes("/berita/")) {
    return "../beritalengkap.json";
  }
  return "beritalengkap.json";
}

function setLanguage(lang) {
  const langFile = getLangFilePath();

  fetch(langFile)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
          el.innerText = translations[lang][key];
        }
      });

      localStorage.setItem("lang", lang);
      loadBerita(lang);
    })
    .catch(err => console.error("Gagal memuat terjemahan:", err));
}

function loadBerita(lang) {
  const beritaContainer = document.getElementById("berita-container");
  if (!beritaContainer) return;

  const beritaFile = getBeritaFilePath();

  fetch(beritaFile)
    .then(response => response.json())
    .then(data => {
      beritaContainer.innerHTML = "";

const path = window.location.pathname;
const isBeranda =
  path === "/" || (path.endsWith("/index.html") && !path.includes("/berita/"));

const beritaToShow = isBeranda ? data.slice(0, 3) : data;

beritaToShow.forEach(item => {
  const judul = item.judul[lang];
  const deskripsi = item.deskripsi[lang];

  const gambarPath = isBeranda ? item.gambar : "../" + item.gambar;
  const linkPath = isBeranda ? item.link : "../" + item.link;

  const beritaCard = document.createElement("div");
  beritaCard.classList.add("berita-card");

  beritaCard.innerHTML = `
    <a href="${linkPath}">
      <img src="${gambarPath}" alt="${judul}" class="berita-img">
      <h4>${judul}</h4>
      <span class="berita-date">${item.tanggal}</span>
    </a>
    <p>${deskripsi}</p>
  `;

  beritaContainer.appendChild(beritaCard);
});
    })
    .catch(error => {
      console.error("Gagal memuat data berita:", error);
      beritaContainer.innerHTML = "<p>Tidak dapat memuat berita.</p>";
    });
}


// Load default language
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "id";
  setLanguage(savedLang);
});

// Smooth scroll
document.querySelectorAll('a[data-scroll]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('data-scroll');

    // Jika masih di halaman index
    if (document.getElementById(targetId)) {
      e.preventDefault();
      document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    } else {
      // Jika di halaman lain (misalnya /berita/...), simpan target lalu redirect
      sessionStorage.setItem("scrollTarget", targetId);
    }
  });
});

// Setelah pindah ke index.html, cek apakah ada target scroll
document.addEventListener("DOMContentLoaded", () => {
  const targetId = sessionStorage.getItem("scrollTarget");
  if (targetId) {
    setTimeout(() => {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
      sessionStorage.removeItem("scrollTarget");
    }, 300); // kasih delay 300ms
  }
});



function loadHomepageGallery() {
  const galleryContainer = document.getElementById('gallery-grid');
  if (!galleryContainer) return; 

  fetch('gallery.json')
    .then(response => response.json())
    .then(data => {
      const images = data.gallery.slice(0, 8); 
      galleryContainer.innerHTML = ''; 

      const currentLang = localStorage.getItem('selectedLang') || 'id';

      images.forEach(item => {
        let altText = item[`alt_${currentLang}`] || item.alt_id;
        
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.innerHTML = `
          <img src="${item.src}" 
               data-full="${item.full}" 
               alt="${altText}">
        `;
        galleryContainer.appendChild(galleryItem);
      });

      
      initGallery();
    })
    .catch(error => console.error('Error loading gallery:', error));
}


document.addEventListener('DOMContentLoaded', loadHomepageGallery);
