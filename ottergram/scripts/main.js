var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';

var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
  }

function setDetailsFromThumb(thumb) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb));
}

function addThumbClickHandler(thumb) { 
    'use strict';
    thumb.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('clicked');
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() { 
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() { 
    'use strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keycode);
        if (event.keycode === ESC_KEY) { 
            hideDetails();
        }
    });
}

function arrowButton() {
    const LeftButton = document.querySelector('.previousbutton');
    const RightButton = document.querySelector('.nextbutton');
    LeftButton.addEventListener('click', previousImage);
    RightButton.addEventListener('click', nextImage);
}

function previousImage() {
    var previousPic = getCurrentSlide() - 1;
    if (previousPic < 1) {
        previousPic = 5
    }
    const imageLink = `img/otter${previousPic}.jpg`;
    const nextOtter = document.querySelector(`a[href='${imageLink}']`);
}

function nextImage() {
    var nextPic = getCurrentSlide() + 1;
    if (nextPic > 5){
        nextPic = 1;
    }
    const imageLink = `img/otter${previousPic}.jpg`;
    const nextOtter = document.querySelector(`a[href='${imageLink}']`);
}

function initializeEvents() {
    'use strict';

    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    arrowButton();
}

initializeEvents();