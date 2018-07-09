'use strict'

const galleryItems = [
  { preview: 'img/small-1.jpeg', fullview: 'img/full-1.jpeg', alt: "alt text 1" },
  { preview: 'img/small-2.jpeg', fullview: 'img/full-2.jpeg', alt: "alt text 2" },
  { preview: 'img/small-3.jpeg', fullview: 'img/full-3.jpeg', alt: "alt text 3" },
  { preview: 'img/small-4.jpeg', fullview: 'img/full-4.jpeg', alt: "alt text 4" },
  { preview: 'img/small-5.jpeg', fullview: 'img/full-5.jpeg', alt: "alt text 5" },
  { preview: 'img/small-6.jpeg', fullview: 'img/full-6.jpeg', alt: "alt text 6" },
  { preview: 'img/small-7.jpeg', fullview: 'img/full-7.jpeg', alt: "alt text 7" },
  { preview: 'img/small-8.jpeg', fullview: 'img/full-8.jpeg', alt: "alt text 8" },
];

//const fullviewBox = document.querySelector('.fullview > img');
//const preview = document.querySelector('.preview');
const imageGallery = document.querySelector('.image-gallery');

const newGallery = new addGallery(galleryItems);

function addGallery(imageList){
  const fullSizeBox = document.createElement('div');
  fullSizeBox.classList.add('fullview');
  
  const fullSizeImage = document.createElement('img');
  fullSizeImage.setAttribute('src', imageList[0].fullview);
  fullSizeImage.setAttribute('alt', imageList[0].alt);
   
  fullSizeBox.appendChild(fullSizeImage);

  const previewBox = document.createElement('ul');
  previewBox.classList.add('preview');

  imageList.forEach(elem => {
    const previewLi = document.createElement('li');
    const previewImg = document.createElement('img');
    previewImg.setAttribute('src', elem.preview);
    previewImg.setAttribute('data-fullview', elem.fullview);
    previewImg.setAttribute('alt', elem.alt);
    previewLi.appendChild(previewImg);
    previewBox.appendChild(previewLi);
  });
  
  imageGallery.append(fullSizeBox, previewBox);
  
  imageGallery.addEventListener('click', onClick);


function onClick (event){
  const target = event.target;
  const nodename = target.nodeName;
  if( nodename !== 'IMG') return;
  //console.log(target.dataset.fullview);
  fullSizeImage.src = event.target.dataset.fullview;
  fullSizeImage.alt = event.target.alt;

  const allImages = Array.from(document.querySelectorAll('.preview  img'));
  allImages.forEach(el => (el.style.boxShadow = 'none'));
  event.target.style.boxShadow = '0 0 0.5125rem 0 #d502f4';
}};

