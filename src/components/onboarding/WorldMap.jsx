import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WorldMap = () => {
  return (
    <div className="relative h-[400px] bg-gray-50 rounded-lg overflow-hidden">
      <ComposableMap
        width={800}
        height={400}
        projection="geoMercator"
        projectionConfig={{
          scale: 800 / 7,
          center: [45, 25]
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#D1D5DB",
                      outline: "none",
                      stroke: "#FFF",
                      strokeWidth: 0.5
                    },
                    hover: {
                      fill: "#9CA3AF",
                      outline: "none",
                      stroke: "#FFF",
                      strokeWidth: 0.5,
                      cursor: "pointer"
                    },
                    pressed: {
                      fill: "#0049ac",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;