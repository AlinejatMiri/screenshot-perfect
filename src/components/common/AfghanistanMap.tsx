import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { PROJECTS } from "@/data/projects";
import { ORG } from "@/data/site";

// Province boundaries: geoBoundaries (gbOpen, ADM1), CC BY 4.0.
export default function AfghanistanMap({ onSelect }: { onSelect: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onSelect);
  cb.current = onSelect;

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView([34.2, 66.5], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors · Boundaries: geoBoundaries",
      opacity: 0.5,
    }).addTo(map);
    let cancelled = false;
    fetch("/afghanistan-provinces.geojson").then((r) => r.json()).then((geo) => {
      if (cancelled) return;
      const fill = (name: string) =>
        PROJECTS.some((p) => p.province === name) ? "#F59E1F" : ORG.offices.some((o) => o.city === name) ? "#1050A0" : "#4FB3E8";
      const base = (name: string): L.PathOptions => ({ color: "#0A1F44", weight: 1, fillColor: fill(name), fillOpacity: fill(name) === "#4FB3E8" ? 0.2 : 0.65 });
      const layer = L.geoJSON(geo, {
        style: (f) => base(f?.properties.name),
        onEachFeature: (f, l) => {
          const name: string = f.properties.name;
          const projects = PROJECTS.filter((p) => p.province === name);
          const office = ORG.offices.find((o) => o.city === name);
          l.bindTooltip(
            `<strong>${name}</strong>${office ? `<br/><em>${office.type}</em>` : ""}<br/>${
              projects.length ? projects.map((p) => `• ${p.title} (${p.year})`).join("<br/>") : "No project implemented yet"
            }`,
            { sticky: true, className: "max-w-xs whitespace-normal" },
          );
          l.on({
            mouseover: () => (l as L.Path).setStyle({ weight: 3, fillOpacity: 0.85 }),
            mouseout: () => (l as L.Path).setStyle(base(name)),
            click: () => cb.current(name),
          });
        },
      }).addTo(map);
      map.fitBounds(layer.getBounds());
    });
    return () => { cancelled = true; map.remove(); };
  }, []);

  return <div ref={ref} className="relative z-0 h-[460px] w-full overflow-hidden rounded-2xl border border-border" />;
}
