"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DarkMapProps {
  className?: string;
}

const DARK_STYLES = [
  { elementType: "geometry",             stylers: [{ color: "#0f0f0f" }] },
  { elementType: "labels.text.stroke",   stylers: [{ color: "#0a0a0a" }] },
  { elementType: "labels.text.fill",     stylers: [{ color: "#666666" }] },
  { featureType: "administrative",       elementType: "geometry",             stylers: [{ color: "#1a1a1a" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#aaaaaa" }] },
  { featureType: "poi",                                                       stylers: [{ visibility: "off" }] },
  { featureType: "poi.park",             elementType: "geometry",             stylers: [{ color: "#0e1a0e" }] },
  { featureType: "transit",              elementType: "labels",               stylers: [{ visibility: "off" }] },
  { featureType: "road",                 elementType: "geometry",             stylers: [{ color: "#1e1e1e" }] },
  { featureType: "road",                 elementType: "geometry.stroke",      stylers: [{ color: "#111111" }] },
  { featureType: "road",                 elementType: "labels.text.fill",     stylers: [{ color: "#888888" }] },
  { featureType: "road.highway",         elementType: "geometry",             stylers: [{ color: "#2a2a2a" }] },
  { featureType: "road.highway",         elementType: "geometry.stroke",      stylers: [{ color: "#1a1a1a" }] },
  { featureType: "road.highway",         elementType: "labels.text.fill",     stylers: [{ color: "#c0a060" }] },
  { featureType: "transit",              elementType: "geometry",             stylers: [{ color: "#1a1a1a" }] },
  { featureType: "transit.station",      elementType: "labels.text.fill",     stylers: [{ color: "#666666" }] },
  { featureType: "water",                elementType: "geometry",             stylers: [{ color: "#000c1a" }] },
  { featureType: "water",                elementType: "labels.text.fill",     stylers: [{ color: "#2a4a6a" }] },
];

let scriptLoaded = false;
const callbacks: (() => void)[] = [];

function loadGoogleMaps(apiKey: string, cb: () => void) {
  if (scriptLoaded) { cb(); return; }
  callbacks.push(cb);
  if (document.getElementById("gmap-script")) return;
  (window as any).__initEquatysMap = () => {
    scriptLoaded = true;
    callbacks.forEach((fn) => fn());
    callbacks.length = 0;
  };
  const s = document.createElement("script");
  s.id = "gmap-script";
  s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__initEquatysMap`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

export function DarkMap({ className }: DarkMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  useEffect(() => {
    if (!apiKey) return;

    loadGoogleMaps(apiKey, () => {
      if (!containerRef.current) return;
      const G = (window as any).google.maps;

      const map = new G.Map(containerRef.current, {
        zoom: 15,
        center: { lat: 46.5528, lng: 6.5497 },
        styles: DARK_STYLES,
        disableDefaultUI: true,
        zoomControl: false,
        keyboardShortcuts: false,
      });

      /* Géocode l'adresse exacte */
      const geocoder = new G.Geocoder();
      geocoder.geocode(
        { address: "Chemin du Vallon 26, 1030 Bussigny, Suisse" },
        (results: any[], status: string) => {
          if (status === "OK" && results[0]) {
            const loc = results[0].geometry.location;
            map.setCenter(loc);
            const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="32" height="43"><path fill="#004AAD" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/><path fill="white" d="M192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>`;
            new G.Marker({
              position: loc,
              map,
              title: "Equatys Energy",
              icon: {
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgIcon),
                scaledSize: new G.Size(32, 43),
                anchor: new G.Point(16, 43),
              },
            });
          }
        },
      );
    });
  }, [apiKey]);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className={cn("h-[500px] w-full rounded-[8px] outline-none", className)}
    />
  );
}
