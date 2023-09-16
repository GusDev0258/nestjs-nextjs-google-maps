"use client";

import { FormEvent, useRef, useState } from "react";
import { useMap } from "../hooks/useMap";
import type {
  DirectionsStep,
  FindPlaceFromTextResponseData,
  RouteLeg,
} from "@googlemaps/google-maps-services-js";
import { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

export const NewRoutePage = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useMap(mapContainerRef);
  const [directionResponseData, setDirectionResponsedata] = useState<
    DirectionsResponseData & { request: any }
  >();

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();
    const source =
      document.querySelector<HTMLInputElement>("#source_place")?.value;
    const destination =
      document.querySelector<HTMLInputElement>("#destination_place")?.value;
    const [sourceResponse, destinationResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL_SERVER}api/places?search=${source}`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL_SERVER}api/places?search=${destination}`),
    ]);
    const [sourcePlace, destinationPlace]: FindPlaceFromTextResponseData[] =
      await Promise.all([sourceResponse.json(), destinationResponse.json()]);
    if (sourcePlace.status !== "OK") {
      console.error(sourcePlace);
      alert("Não foi possível encontrar a origem");
    }
    if (destinationPlace.status !== "OK") {
      console.error(destinationPlace);
      alert("Não foi possível encontrar o destino");
    }
    const queryParams = new URLSearchParams({
      sourceId: sourcePlace.candidates[0].place_id as string,
      destinationId: destinationPlace.candidates[0].place_id as string,
    });
    const directionsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL_SERVER}api/directions?${queryParams.toString()}`
    );

    const directionsResponseData: DirectionsResponseData & { request: any } =
      await directionsResponse.json();
    setDirectionResponsedata(directionsResponseData);
    map?.removeAllRoutes();
    map?.addRouteWithIcons({
      routeId: "1",
      startMarkerOptions: {
        position: directionsResponseData.routes[0]!.legs[0]!.start_location,
      },
      endMarkerOptions: {
        position: directionsResponseData.routes[0]!.legs[0]!.end_location,
      },
      carMarkerOptions: {
        position: directionsResponseData.routes[0]!.legs[0]!.start_location,
      },
      directionsResponseData,
    });
  };

  const handleRouteCreation = async () => {
    console.log(directionResponseData);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${directionResponseData?.routes[0]!.legs[0]!.start_address} - ${
          directionResponseData?.routes[0]!.legs[0]!.end_address
        }`,
        source_id: directionResponseData?.request.origin.place_id  as string,
        destination_id: directionResponseData?.request.destination.place_id as string,
      }),
    });
    const route = await response.json();
    const { steps } = directionResponseData?.routes[0]!.legs[0]!;
    console.log(steps);
    handleCarMove(steps);
  };

  const handleCarMove = async (steps: DirectionsStep[]) => {
    for (const step of steps) {
      await sleep(2000);
      map?.moveCar("1", {
        lat: step.start_location.lat,
        lng: step.start_location.lng,
      });

      sleep(2000);
      map?.moveCar("1", {
        lat: step.end_location.lat,
        lng: step.end_location.lng,
      });
    }
  };

  return (
    <main className="h-full flex center mx-auto bg-gray-900 text-gray-100 items-center justify-center">
      <section className="p-4">
        <h1 className="text-4xl">Nova rota</h1>
        <form
          action=""
          className="flex flex-col gap-4 mt-4"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            id="source_place"
            name="source_place"
            placeholder="Origem"
            className="p-4 text-sm text-gray-800"
          />
          <input
            type="text"
            id="destination_place"
            name="destination_place"
            placeholder="Destino"
            className="p-4 text-sm text-gray-800"
          />
          <button
            type="submit"
            className="bg-amber-400 px-4 py-2 text-gray-800 rounded-md"
          >
            Pesquisar
          </button>
        </form>
        {directionResponseData && (
          <ul className="text-gray-100">
            <li>
              Origem: {directionResponseData?.routes[0]!.legs[0]!.start_address}
            </li>
            <li>
              Destino: {directionResponseData?.routes[0]!.legs[0]!.end_address}
            </li>
            <li>
              Distância:{" "}
              {directionResponseData?.routes[0]!.legs[0]!.distance.text}{" "}
            </li>
            <li>
              Duração:{" "}
              {directionResponseData?.routes[0]!.legs[0]!.duration.text}
            </li>
            <li>
              <button
                className="bg-amber-400 px-4 py-2 text-gray-800 rounded-md"
                onClick={handleRouteCreation}
              >
                Adicionar rota
              </button>
            </li>
          </ul>
        )}
      </section>
      <div className="h-full w-full" id="map" ref={mapContainerRef}></div>
    </main>
  );
};

export default NewRoutePage;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
