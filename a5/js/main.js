let currentIndex = 0;
let currentimage = document.getElementById("carousel-image");

let images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.pexels.com/photos/34950/pexels-photo.jpg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg"
];
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    currentimage.src = images[currentIndex];
    return images[currentIndex];
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    currentimage.src = images[currentIndex];
    return images[currentIndex];
}
