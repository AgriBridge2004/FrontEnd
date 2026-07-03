"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapPin } from "lucide-react";

const mendozaCenter = {
  lat: -32.8895,
  lng: -68.8458,
};

const mapOptions: google.maps.MapOptions = {
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
};

export function OriginMap() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return <OriginMapFallback />;
  }

  return <GoogleOriginMap googleMapsApiKey={googleMapsApiKey} />;
}

type GoogleOriginMapProps = {
  googleMapsApiKey: string;
};

function GoogleOriginMap({ googleMapsApiKey }: GoogleOriginMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
  });

  if (loadError) {
    return <OriginMapFallback />;
  }

  if (!isLoaded) {
    return (
      <div className="grid h-40 place-items-center rounded-xl border border-emerald-100 bg-slate-100 text-sm font-semibold text-slate-500 md:h-44">
        Loading map preview...
      </div>
    );
  }

  return (
    <div className="h-40 overflow-hidden rounded-xl border border-emerald-100 bg-slate-100 md:h-44">
      {/* TODO: Later connect origin input to Places Autocomplete / geocoding. */}
      <GoogleMap
        center={mendozaCenter}
        mapContainerClassName="h-full w-full"
        options={mapOptions}
        zoom={10}
      >
        <Marker position={mendozaCenter} />
      </GoogleMap>
    </div>
  );
}

function OriginMapFallback() {
  return (
    <div className="grid h-40 place-items-center rounded-xl border border-emerald-100 bg-[linear-gradient(135deg,#eef5f0,#d8ded9_45%,#a9b0aa)] p-4 text-center md:h-44">
      <div>
        <MapPin className="mx-auto size-7 text-emerald-800" />
        <p className="mt-2 text-sm font-semibold text-slate-700">
          Map preview will appear after Google Maps API key is configured.
        </p>
      </div>
    </div>
  );
}
