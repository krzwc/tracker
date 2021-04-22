import React, { useRef, useEffect, useState, FunctionComponent } from "react";
import * as converter from "@tmcw/togeojson";
import { DOMParser } from "xmldom";
import { Builder } from "xml2js";

const parseGpx = (gpxString: string) => {
  const gpxAsObj = new Builder().buildObject(JSON.parse(gpxString));
  const parsedGPX = new DOMParser().parseFromString(gpxAsObj);
  return JSON.stringify(converter.gpx(parsedGPX));
};

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
  const [geojson, setGeojson] = useState(() => parseGpx(gpx));

  // Initialize map when component mounts
  /* const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: `https://api.maptiler.com/maps/97ad608b-151a-4a40-9e4f-64a55c304d2d/style.json?key=pTRwinTMAALKOrShrYPV`,
    center: [lng, lat],
    zoom: zoom,
  }); */

  useEffect(() => {
    console.log(geojson);
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
      map.addSource("ports", {
        type: "geojson",
        // a reference to the converted data
        // could come from a file, API, etc
        data: "/.netlify/functions/rest",
      });

      map.addLayer({
        id: "route",
        type: "circle",
        source: "ports",
        paint: {
          "circle-radius": 5,
          "circle-color": "#ff0000",
        },
      });
    });

    // Clean up on unmount
    return () => map.remove();
  }, [geojson]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );
};
