import { Loader } from "@googlemaps/js-api-loader";
import { RefObject, useEffect, useState } from "react";
import { getCurrentPosition } from "../utils/geolocation";
import { Map } from "../utils/map";

export const useMap =  (containerRef: RefObject<HTMLDivElement>) => {

  const [map, setMap] = useState<Map>();

  useEffect(() => {
    (async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries: ["routes", "geometry"],
      });
      const [,,position ] = await Promise.all([
        loader.importLibrary("routes"),
        loader.importLibrary("geometry"),
        getCurrentPosition({enableHighAccuracy: true}),
      ]);
      const gMap = new Map(containerRef.current!, {
        zoom: 15,
        center: position,
      });
      setMap(gMap);
    })();
  }, [containerRef]);
  return map;
}