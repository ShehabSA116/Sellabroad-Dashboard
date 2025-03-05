import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Image Imports
import atc from '../../assets/brands/atc.webp';
import beautypillow from '../../assets/brands/beautypillow.png';
import blanco from '../../assets/brands/blanco.png';
import magnum from '../../assets/brands/magnum.png';
import novimed from '../../assets/brands/novimed.png';
import nydirect from '../../assets/brands/nydirect.jpg';
import opontia from '../../assets/brands/opontia.png';
import saje from '../../assets/brands/saje.png';
import saxx from '../../assets/brands/saxx.png';
import silverjeans from '../../assets/brands/silverjeans.png';
import suetables from '../../assets/brands/suetables.png';
import wellca from '../../assets/brands/wellca.png';

export default function SidePanel({ title, subtitle }) {
  const Images = [
    beautypillow,
    atc,
    blanco,
    magnum,
    novimed,
    nydirect,
    opontia,
    saje,
    saxx,
    silverjeans,
    suetables,
    wellca,
  ];

  // Start at index 1 because index 0 is a duplicate of the last image.
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isJumping, setIsJumping] = useState(false);

  // Use setTimeout to auto-advance only when not in a jump.
  useEffect(() => {
    if (!isJumping) {
      const timer = setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isJumping]);

  const right = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const left = () => {
    setCurrentIndex(prevIndex => prevIndex - 1);
  };

  // Handle instant jump when reaching duplicate slides.
  const handleTransitionEnd = () => {
    if (currentIndex === Images.length + 1) {
      // Reached duplicate of first image.
      setIsJumping(true);
      setTransitionEnabled(false);
      setCurrentIndex(1);
      // Wait for the next frame to ensure the position is updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsJumping(false);
        });
      });
    } else if (currentIndex === 0) {
      // Reached duplicate of last image.
      setIsJumping(true);
      setTransitionEnabled(false);
      setCurrentIndex(Images.length);
      // Wait for the next frame to ensure the position is updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsJumping(false);
        });
      });
    }
  };

  return (
    <div className="w-[400px] bg-[#0049ac] text-white p-8 flex flex-col fixed h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {title || "Ready to expand?"}
        </h1>
        <p className="text-lg text-center text-white/90 mb-12">
          {subtitle || "Answer these questions to easily expand your market to the Middle East!"}
        </p>

        {/* Slideshow */}
        <div className="w-full bg-white rounded-xl mb-8 relative overflow-hidden py-2">
          {/* Navigation Buttons */}
          <button 
            onClick={left}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          >
            <FaArrowLeft />
          </button>
          <button 
            onClick={right}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
          >
            <FaArrowRight />
          </button>

          <div 
            className="flex"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: transitionEnabled ? "transform 1.9s ease-in-out" : "none",
            }}
          >
            {/* Duplicate of the last image (for backward looping) */}
            <div 
              className="w-full flex-shrink-0 flex items-center justify-center"
              style={{ height: '150px' }}
            >
              <img 
                src={Images[Images.length - 1]} 
                alt="brand duplicate last"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {/* Actual images */}
            {Images.map((image, index) => (
              <div 
                key={index}
                className="w-full flex-shrink-0 flex items-center justify-center"
                style={{ height: '150px' }}
              >
                <img 
                  src={image} 
                  alt={`brand ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
            {/* Duplicate of the first image (for forward looping) */}
            <div 
              className="w-full flex-shrink-0 flex items-center justify-center"
              style={{ height: '150px' }}
            >
              <img 
                src={Images[0]} 
                alt="brand duplicate first"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
