import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
export default function SidePanel({ title, subtitle, steps, currentStep, completedSteps }) {
  const brandImages = [
    '../icons/brands/atc.webp',
    '../icons/brands/beautypillow.png',
    '../icons/brands/blanco.png',
    '../icons/brands/magnum.png',
    '../icons/brands/novimed.png',
    '../icons/brands/nydirect.jpg',
    '../icons/brands/opontia.png',
    '../icons/brands/saje.png',
    '../icons/brands/saxx.png',
    '../icons/brands/silverjeans.png',
    '../icons/brands/suetables.png',
    '../icons/brands/wellca.png'
  ];
  const handleSignOut = async () => {
    try {
      //await signOut();
      console.log("Signing out");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Check if we're on an auth page
  const isAuthPage = true;

  return (
    <div className="w-[400px] bg-[#0049ac] text-white p-8 flex flex-col fixed h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {title || "Ready to expand?"}
        </h1>
        <p className="text-lg text-center text-white/90 mb-12">
          {subtitle || "Answer these questions to easily expand your market to the Middle East!"}
        </p>
        
        {/* Placeholder for slideshow - you can replace this later */}
        <div className="w-full aspect-video bg-white/10 rounded-xl mb-8">
          {/* Slideshow will go here */}
          <div className="h-full flex items-center justify-center text-white/50">
          <Carousel>
            {
                brandImages.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
          </div>
        </div>
      </div>

      {/* Sign Out Button - Only show if not on auth pages */}
      {!isAuthPage && (
        <button
          onClick={handleSignOut}
          className="mt-auto flex items-center justify-center gap-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      )}
    </div>
  );
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}