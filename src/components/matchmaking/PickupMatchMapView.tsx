"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export interface PickupMarker {
  id: string;
  lat: number;
  lng: number;
  sportType: string;
  venueName: string;
  captainName: string;
  slotDate: string;
  slotStart: string;
  slotsFilled: number;
  slotsTotal: number;
}

/** Teardrop pin showing how many spots are still open in that game. */
function pinIcon(openSlots: number, highlighted: boolean) {
  const fill = openSlots > 0 ? "#10B981" : "#334155";
  const size = highlighted ? 44 : 36;
  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:${size}px;height:${size}px;filter:drop-shadow(0 4px 6px rgba(15,23,42,.5))">
      <svg viewBox="0 0 36 36" width="${size}" height="${size}"><path d="M18 34s12-11.2 12-20A12 12 0 0 0 6 14c0 8.8 12 20 12 20Z" fill="${fill}" stroke="#0F172A" stroke-width="2"/></svg>
      <span style="position:absolute;top:${size * 0.2}px;left:0;right:0;text-align:center;font:800 ${size * 0.33}px Inter,sans-serif;color:#0F172A">${openSlots}</span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

interface PickupMatchMapViewProps {
  markers: PickupMarker[];
  center: [number, number];
  highlightedId?: string | null;
}

export default function PickupMatchMapView({ markers, center, highlightedId }: PickupMatchMapViewProps) {
  return (
    <div className="h-[460px] w-full overflow-hidden rounded-2xl border border-border">
      <MapContainer center={center} zoom={12} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={pinIcon(marker.slotsTotal - marker.slotsFilled, marker.id === highlightedId)}
            zIndexOffset={marker.id === highlightedId ? 1000 : 0}
          >
            <Popup>
              <div style={{ fontSize: 12, lineHeight: 1.5 }}>
                <strong style={{ fontSize: 13 }}>{marker.sportType}</strong> · {marker.venueName}
                <br />
                Captain {marker.captainName}
                <br />
                {new Date(marker.slotDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} at{" "}
                {marker.slotStart.slice(0, 5)}
                <br />
                <span style={{ color: "#10B981", fontWeight: 700 }}>
                  {marker.slotsTotal - marker.slotsFilled} of {marker.slotsTotal} spots open
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
