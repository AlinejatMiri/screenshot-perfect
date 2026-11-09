import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { PROJECTS } from "@/data/projects";
import { ORG } from "@/data/site";
import { PROVINCE_COORDS } from "@/data/provinces";

export default function AfghanistanMap({ onSelect }: { onSelect: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const cb = useRef(onSelect);
  cb.current = onSelect;

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView([34.2, 66.5], 6);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    Object.entries(PROVINCE_COORDS).forEach(([name, ll]) => {
      const projects = PROJECTS.filter((p) => p.province === name);
      const office = ORG.offices.find((o) => o.city === name);
      const active = projects.length > 0 || !!office;
      const html = `<strong>${name}</strong>${office ? `<br/><em>${office.type}</em>` : ""}<br/>${
        projects.length
          ? projects.map((p) => `• ${p.title} (${p.year})`).join("<br/>")
          : "No project implemented yet"
      }`;
      L.circleMarker(ll, {
        radius: active ? 9 : 5,
        color: active ? "#0A1F44" : "#4FB3E8",
        fillColor: projects.length ? "#F59E1F" : office ? "#1050A0" : "#4FB3E8",
        fillOpacity: active ? 0.95 : 0.5,
        weight: 2,
      })
        .bindTooltip(html, { direction: "top", className: "max-w-xs whitespace-normal" })
        .on("click", () => cb.current(name))
        .addTo(map);
    });
    return () => { map.remove(); };
  }, []);

  return <div ref={ref} className="relative z-0 h-[420px] w-full overflow-hidden rounded-2xl border border-border" />;
}
