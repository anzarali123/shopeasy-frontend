import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import { useEffect, useState } from "react";
import "./Slider.scss";

const intervalTime = 5000;
const autoScroll = true;
let slideInterval;
const Slider = () => {
  const [currentSlide, setcurrentSlide] = useState(0);
  const slideLength = sliderData.length;

  const nextSlide = () => {
    setcurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setcurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    function auto() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
    if (autoScroll) auto();
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, idx) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={idx}
            className={idx === currentSlide ? "slide current" : "slide"}
          >
            {idx === currentSlide && (
              <>
                <img src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop Now
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
