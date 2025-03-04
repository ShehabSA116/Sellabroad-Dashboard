import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

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
  const Images = [ beautypillow, atc,blanco, magnum, novimed, nydirect, opontia, saje, saxx, silverjeans, suetables, wellca];

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
        <div className="w-full bg-white/10 rounded-xl mb-8">
          <Carousel
            autoPlay={true}
            animation="fade"
            indicators={false}
            navButtonsAlwaysVisible={false}
            cycleNavigation={true}
            fullHeightHover={false}
            swipe={true}
          >
            {Images.map((item, i) => <Item key={i} item={item} />)}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

function Item(props) {
  console.log('Props:', props);
  return (
    <Paper elevation={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 150 }}>
      <img src={props.item} alt="brand" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </Paper>
  );
}
