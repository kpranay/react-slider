import React, { useState, useEffect, useRef } from 'react';
import './Slider.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 5;
  const slideInterval = useRef(null);

  const updateSlider = (index) => {
    setCurrentIndex(index);
  };

  const showNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const showPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const resetInterval = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(showNextSlide, 3000);
  };

  useEffect(() => {
    slideInterval.current = setInterval(showNextSlide, 3000);
    return () => clearInterval(slideInterval.current);
  }, []);

  useEffect(() => {
    resetInterval();
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        <div className="slide" style={{ backgroundColor: '#f00' }}>Slide 1</div>
        <div className="slide" style={{ backgroundColor: '#0f0' }}>Slide 2</div>
        <div className="slide" style={{ backgroundColor: '#00f' }}>Slide 3</div>
        <div className="slide" style={{ backgroundColor: '#ff0' }}>Slide 4</div>
        <div className="slide" style={{ backgroundColor: '#0ff' }}>Slide 5</div>
      </div>
      <div className="arrows">
        <span className="arrow left" onClick={showPrevSlide}>&#9664;</span>
        <span className="arrow right" onClick={showNextSlide}>&#9654;</span>
      </div>
      <div className="dots">
        {[...Array(totalSlides).keys()].map((index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => updateSlider(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
