import { useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = ({ selectedMarkets = [], onMarketSelect, currentMarkets = [], targetMarkets = [], isSelectingCurrent }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('map-container');
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (event) => {
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  return (
    <div id="map-container" className="relative h-[400px] bg-gray-50 rounded-lg overflow-hidden" onMouseMove={handleMouseMove}>
      <ComposableMap
        width={dimensions.width}
        height={dimensions.height}
        projection="geoMercator"
        projectionConfig={{
          scale: dimensions.width / 7,
          center: [45, 25]
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isCurrent = currentMarkets.includes(countryName);
                const isTarget = targetMarkets.includes(countryName);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(countryName);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      // console.log('Clicked country:', { name: countryName, code: countryCode });
                      console.log(geo.properties);
                      if (countryName) {
                        console.log('Clicked country:', countryName);
                        onMarketSelect(countryName);
                      }
                    }}
                    style={{
                      default: {
                        fill: isCurrent ? "#0049ac" : isTarget ? "#00ac4a" : "#D1D5DB",
                        outline: "none",
                        stroke: "#FFF",
                        strokeWidth: 0.5
                      },
                      hover: {
                        fill: isCurrent ? "#0049ac" : isTarget ? "#00ac4a" : "#9CA3AF",
                        outline: "none",
                        stroke: "#FFF",
                        strokeWidth: 0.5,
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: isCurrent ? "#0049ac" : isTarget ? "#00ac4a" : "#0049ac",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltipContent && (
        <div
          className="absolute z-10 px-2 py-1 text-sm text-white bg-gray-900 rounded pointer-events-none"
          style={{
            left: Math.min(tooltipPosition.x + 10, dimensions.width - 100),
            top: Math.min(tooltipPosition.y - 20, dimensions.height - 40)
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default WorldMap;