import React, { useRef, useEffect, useState } from "react";

export const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken = "pTRwinTMAALKOrShrYPV";
    /* const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/97ad608b-151a-4a40-9e4f-64a55c304d2d/style.json?key=pTRwinTMAALKOrShrYPV`,
      center: [lng, lat],
      zoom: zoom,
    }); */
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/97ad608b-151a-4a40-9e4f-64a55c304d2d/style.json?key=pTRwinTMAALKOrShrYPV",
      center: [0, 0],
      zoom: 1,
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );
};
