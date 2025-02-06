import { images } from "./images";
import "./carousel.css";

const createSlide = (image, textContent, firstSlide = false) => {
  const divContainer = Object.assign(document.createElement("div"), {
    className: "mySlide",
  });
  if (!firstSlide) divContainer.classList.add("hidden");

  const slideImage = Object.assign(document.createElement("img"), {
    src: image,
    classList: "slideImage",
  });
  const slideText = Object.assign(document.createElement("p"), {
    innerText: textContent,
  });

  divContainer.appendChild(slideImage);
  divContainer.appendChild(slideText);

  return divContainer;
};

const createSlideShow = (slides) => {
  const slideShowContainer = document.createElement("div");

  slides.forEach((slide) => {
    slideShowContainer.appendChild(slide);
  });

  //add the previous and next buttons to the images
  const previousBtn = Object.assign(document.createElement("a"), {
    innerText: "❮",
    classList: "prev",
  });
  const nextBtn = Object.assign(document.createElement("a"), {
    innerText: "❯",
    classList: "next",
  });

  nextBtn.addEventListener("click", () => {
    changeSlide(slides, true);
    //resetAutoSlide();
  });

  previousBtn.addEventListener("click", () => {
    changeSlide(slides);
    //resetAutoSlide();
  });

  let autoSlideInterval;
  const resetAutoSlide = () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      changeSlide(slides, true);
    }, 5000);
  };
  //resetAutoSlide();

  slideShowContainer.appendChild(previousBtn);
  slideShowContainer.appendChild(nextBtn);

  return slideShowContainer;
};

const changeSlide = (slides, nextSlide = false) => {
  let currentIndex;
  //find the current showing photo index
  slides.forEach((slide, index) => {
    if (!Array.from(slide.classList).includes("hidden")) currentIndex = index;
    slide.classList = "";
    slide.classList.add("mySlide");
    slide.classList.add("hidden");
  });

  if (nextSlide) {
    if (currentIndex == slides.length - 1) currentIndex = -1;
    slides[currentIndex + 1].classList.remove("hidden");
  } else {
    if (currentIndex - 1 == -1) currentIndex = slides.length;
    slides[currentIndex - 1].classList.remove("hidden");
  }
};

//Example use case
let slides = [
  createSlide(images.img1, "Caption Text", true),
  createSlide(images.img2, "Caption Text"),
  createSlide(images.img3, "Caption Text"),
  createSlide(images.img4, "Caption Text"),
  createSlide(images.img5, "Caption Text"),
  createSlide(images.img6, "Caption Text"),
];

const body = document.body;
const slideShow = createSlideShow(slides);
slideShow.classList.add("slideshowContainer");
body.appendChild(slideShow);
