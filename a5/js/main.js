let currentIndex = 0;

let currentimage = document.getElementById("carousel-image");
let caption = document.getElementById("caption");

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

let timer = setInterval(nextImage, 4000);

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextImage, 4000);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;

    // Update the image, alt text, and caption
    currentimage.src = images[currentIndex];
    currentimage.alt = altTexts[currentIndex];
    caption.textContent = altTexts[currentIndex];

    // Reset the timer after changing the image
    resetTimer();
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;

    // Update the image, alt text, and caption
    currentimage.src = images[currentIndex];
    currentimage.alt = altTexts[currentIndex];
    caption.textContent = altTexts[currentIndex];

    // Reset the timer after changing the image
    resetTimer();
}

