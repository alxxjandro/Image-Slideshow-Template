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

const addDot = () => {
  let dot = Object.assign(document.createElement("span"), {
    className: "dot",
  });
  return dot;
};

const setDotActive = (dots, index) => {
  dots.forEach((dot) => {
    dot.classList = "";
    dot.classList.add("dot");
  });
  dots[index].classList.add("active");
};

const loadDotSlide = (slides) => {
  const dots = document.querySelectorAll(".dot");
  console.log(dots);
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setDotActive(dots, index);
      changeSlide(slides, false, index);
    });
  });
};

const createSlideShow = (slides) => {
  const slideShowContainer = document.createElement("div");
  const dotContainer = document.createElement("div");
  dotContainer.classList.add("dotContainer");

  slides.forEach((slide, index) => {
    slideShowContainer.appendChild(slide);
    dotContainer.appendChild(addDot());
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

  //automatic slide change
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
  slideShowContainer.appendChild(dotContainer);

  return slideShowContainer;
};

const changeSlide = (slides, nextSlide = false, targetIndex = null) => {
  const dots = document.querySelectorAll(".dot");
  let currentIndex;
  //find the current showing photo index
  slides.forEach((slide, index) => {
    if (!Array.from(slide.classList).includes("hidden")) currentIndex = index;
    slide.classList = "";
    slide.classList.add("mySlide");
    slide.classList.add("hidden");
  });

  if (targetIndex !== null) currentIndex = targetIndex + 1;

  if (nextSlide) {
    if (currentIndex == slides.length - 1) currentIndex = -1;
    slides[currentIndex + 1].classList.remove("hidden");
    console.log(currentIndex, "next");
    setDotActive(dots, currentIndex + 1);
  } else {
    if (currentIndex - 1 == -1) currentIndex = slides.length;
    slides[currentIndex - 1].classList.remove("hidden");
    console.log(currentIndex, "prev");
    setDotActive(dots, currentIndex - 1);
  }
};

//Example use case
const carouselExample = (function () {
  let slides = [
    createSlide(images.img1, "Caption Text", true),
    createSlide(images.img2, "Caption Text"),
    createSlide(images.img3, "Caption Text"),
    createSlide(images.img4, "Caption Text"),
    createSlide(images.img5, "Caption Text"),
    createSlide(images.img6, "Caption Text"),
  ];

  const body = document.body;
  const fatherDiv = document.createElement("div");
  const slideShow = createSlideShow(slides);

  slideShow.classList.add("slideshowContainer");
  fatherDiv.classList.add("fatherDiv");
  fatherDiv.appendChild(slideShow);
  body.appendChild(fatherDiv);

  loadDotSlide(slides);
  const dots = document.querySelectorAll(".dot");
  setDotActive(dots, 0);
})();
