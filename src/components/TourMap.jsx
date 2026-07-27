import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

const greenMarkerIcon = L.divIcon({
  className: '',
  html: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="#0B7A31"
      stroke="#FFFFFF"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />

      <circle
        cx="12"
        cy="10"
        r="2.5"
        fill="#FFFFFF"
        stroke="none"
      />
    </svg>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

function FitBounds({ locations }) {
  const leafletMap = useMap();

  const bounds = locations?.map((loc) => {
    return [loc.coordinates[1], loc.coordinates[0]];
  });

  useEffect(
    function () {
      if (!bounds?.length) return;

      leafletMap.flyToBounds(bounds, {
        padding: [60, 60],
        maxZoom: 10,
      });
    },
    [leafletMap, bounds],
  );

  return null;
}

export default function TourMap({ selectedTour }) {
  const sectionRef = useRef(null);

  // useEffect(
  //   function () {
  //     if (!selectedTour || !sectionRef.current) return;

  //     const id = setTimeout(function () {
  //       sectionRef.current?.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'end',
  //       });
  //     }, 500);

  //     return () => clearTimeout(id);
  //   },
  //   [selectedTour],
  // );

  return (
    <section
      className="shadow-overview mx-auto mt-12 flex h-auto w-11/12 max-w-7xl flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white md:mt-16 md:h-80 md:flex-row lg:mt-20"
      ref={sectionRef}
    >
      <div className="xs:px-6 flex w-full flex-col items-start justify-center gap-4 bg-white px-5 py-7 sm:px-8 md:w-1/3 md:gap-5 md:px-7 md:py-8 lg:px-9">
        <h2 className="text-lg font-semibold tracking-wide text-[#0B7A31] sm:text-xl">
          Tour Location
        </h2>

        <div className="flex items-center gap-2">
          <MapPin size={20} className="shrink-0 text-[#0B7A31]" />

          <span className="text-sm font-semibold tracking-wide text-[#475569] uppercase">
            {selectedTour?.startLocation?.description}
          </span>
        </div>

        <p className="text-sm leading-6 font-normal text-[#64748B]">
          {selectedTour?.summary}
        </p>
      </div>

      <MapContainer
        center={[0, 0]}
        zoom={1}
        zoomControl={false}
        scrollWheelZoom={true}
        className="h-64 w-full sm:h-72 md:h-full md:w-2/3"
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
          attribution="&copy; Stadia Maps"
        />

        <ZoomControl position="bottomleft" />

        <FitBounds locations={selectedTour?.locations} />

        {selectedTour?.locations?.map((loc) => (
          <Marker
            key={loc?._id}
            position={[loc.coordinates[1], loc.coordinates[0]]}
            icon={greenMarkerIcon}
          >
            <Popup>{`Day ${loc?.day}: ${loc?.description}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}
