const items = document.querySelectorAll(".item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideo = document.getElementById("lightbox-video");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;
let visibleItems = [...items];


// ===== FILTER =====
function filterGallery(type) {
  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");

  visibleItems = [];

  items.forEach(item => {
    if (type === "all" || item.classList.contains(type)) {
      item.style.display = "block";
      visibleItems.push(item);
    } else {
      item.style.display = "none";
    }
  });
}


// ===== OPEN LIGHTBOX =====
items.forEach((item, index) => {
  item.onclick = () => openLightbox(index);
});

function openLightbox(index) {
  currentIndex = index;
  showItem();
  lightbox.style.display = "flex";
}


// ===== SHOW IMAGE / VIDEO =====
function showItem() {
  const item = visibleItems[currentIndex];

  const img = item.querySelector("img");
  const videoId = item.dataset.video;

  lightboxImg.style.display = "none";
  lightboxVideo.style.display = "none";

  if (videoId) {
    lightboxVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    lightboxVideo.style.display = "block";
  } else {
    lightboxImg.src = img.src;
    lightboxImg.style.display = "block";
  }
}


// ===== ARROWS =====
document.querySelector(".left").onclick = () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showItem();
};

document.querySelector(".right").onclick = () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showItem();
};


// ===== CLOSE =====
closeBtn.onclick = closeLightbox;
lightbox.onclick = (e) => {
  if (e.target === lightbox) closeLightbox();
};

function closeLightbox() {
  lightbox.style.display = "none";
  lightboxVideo.src = "";
}