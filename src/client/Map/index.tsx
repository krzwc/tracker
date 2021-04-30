import React, { useRef, useEffect, useState, FunctionComponent } from "react";
import { FeatureCollection, LineString } from "geojson";

declare global {
  interface Window {
    mapboxgl: any;
  }
}

export const Map: FunctionComponent<{
  id: string;
}> = ({ id }) => {
  const mapContainerRef = useRef(null);
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    const mapboxgl = window.mapboxgl;
    mapboxgl.accessToken = "pTRwinTMAALKOrShrYPV";
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/97ad608b-151a-4a40-9e4f-64a55c304d2d/style.json?key=pTRwinTMAALKOrShrYPV",
      center: [lng, lat],
      zoom: zoom,
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: `/.netlify/functions/rest?id=${id}`,
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
    fetch(`/.netlify/functions/rest?id=${id}`)
      .then((res) => res.json())
      .then((res: FeatureCollection<LineString>) => {
        const coordinates = res.features[0].geometry.coordinates;
        const bounds = coordinates.reduce((bounds, coord) => {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, {
          padding: 20,
        });
      });

    return () => map.remove();
  }, [id]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
    />
  );
};
