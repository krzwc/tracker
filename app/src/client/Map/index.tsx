import React, { useRef, useEffect, useState, FunctionComponent } from "react";
declare global {
  interface Window {
    mapboxgl: any;
  }
}

export const Map: FunctionComponent<{
  gpx: string;
}> = ({ gpx }) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  /* const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: `https://api.maptiler.com/maps/97ad608b-151a-4a40-9e4f-64a55c304d2d/style.json?key=pTRwinTMAALKOrShrYPV`,
    center: [lng, lat],
    zoom: zoom,
  }); */

  useEffect(() => {
    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken = "pTRwinTMAALKOrShrYPV";
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

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: "/.netlify/functions/rest",
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );
};
