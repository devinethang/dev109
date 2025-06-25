let currentIndex = 0;

let currentimage = document.getElementById("carousel-image");

let images = [
    "./images/image1.jpg",
    "./images/image2.jpg",
    "./images/image3.jpg",
    "./images/image4.jpg",
    "./images/image5.jpeg"
];

let altTexts = [
    "A beautiful sunset in between two mountains",
    "A railroad track leading into the distance inside a forest",
    "A tree on an island with the sun shining through the center",
    "A beutiful view of the stars in the night sky",
    "A dock leading out to a lake with mountains in the background"
];

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    currentimage.src = images[currentIndex];
    currentimage.alt = altTexts[currentIndex];
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    currentimage.src = images[currentIndex];
    currentimage.alt = altTexts[currentIndex];
}
