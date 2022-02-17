let imageCount = 5;
const apiKey = '63oPVTDTjLatqLWusMw4COSINb0Z0QxviVDBO9w_JrY';
let unsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Make sure image is loaded before continue
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        imageCount = 30;
        unsplashAPI = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
    }
}

// Helper function to set attribute
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Display the image on the screen
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.append(item);
    });
}

// Get photos from UnSplash
async function getPhotosUnsplash() {
    try {
        const response = await fetch(unsplashAPI);
        photosArray = await response.json();
        displayPhotos();
    }
    catch (error) {

    }
}

// Scroll event to create the infinite scroll experience
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosUnsplash();
    }
});

getPhotosUnsplash();