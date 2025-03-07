import React, { useState, useEffect } from 'react';
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('forward'); // 'forward' or 'backward'

  // Auto-advance the carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      if (direction === 'forward') {
        if (currentIndex >= Images.length - 1) {
          // Reached the end, change direction
          setDirection('backward');
          setCurrentIndex(currentIndex - 1);
        } else {
          // Continue moving forward
          setCurrentIndex(currentIndex + 1);
        }
      } else {
        // Moving backward
        if (currentIndex <= 0) {
          // Reached the beginning, change direction
          setDirection('forward');
          setCurrentIndex(currentIndex + 1);
        } else {
          // Continue moving backward
          setCurrentIndex(currentIndex - 1);
        }
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, direction, Images.length]);

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
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
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
          </div>
        </div>
      </div>
    </div>
  );
}
