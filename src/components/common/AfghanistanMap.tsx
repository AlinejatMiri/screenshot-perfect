import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { PROJECTS } from "@/data/projects";
import { ORG } from "@/data/site";

// Province boundaries: geoBoundaries (gbOpen, ADM1), CC BY 4.0.
export default function AfghanistanMap({
  onSelect,
  zones,
}: {
  onSelect: (p: string) => void;
  zones: { name: string; provinces: string[]; color: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);
  const cb = useRef(onSelect);
  cb.current = onSelect;

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView([34.2, 66.5], 6);
    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors · Boundaries: geoBoundaries",
      opacity: 0.5,
    }).addTo(map);
    tiles.on("tileerror", () => setMapError(true));
    let cancelled = false;
    fetch("/afghanistan-provinces.geojson")
      .then((r) => r.json())
      .then((geo) => {
        if (cancelled) return;
        if (!geo?.features?.length) throw new Error("Province boundaries are unavailable");
        const zoneByProvince = new Map<string, { color: string; name: string }>();
        zones.forEach((z) =>
          z.provinces.forEach((p) => zoneByProvince.set(p, { color: z.color, name: z.name })),
        );
        const fill = (name: string) => {
          const hasProject = PROJECTS.some(
            (p) =>
              p.province === name &&
              !p.needsVerification.some((item) => item.toLowerCase().includes("status")),
          );
          const hasOffice = ORG.offices.some((o) => o.city === name);
          const zone = zoneByProvince.get(name);
          if (hasProject && zone) return zone.color;
          if (hasOffice) return "#1050A0";
          return "#4FB3E8";
        };
        const base = (name: string): L.PathOptions => ({
          color: "#0A1F44",
          weight: 1,
          fillColor: fill(name),
          fillOpacity: fill(name) === "#4FB3E8" ? 0.2 : 0.65,
        });
        const layer = L.geoJSON(geo, {
          style: (f) => base(f?.properties.name),
          onEachFeature: (f, l) => {
            const name: string = f.properties.name;
            const projects = PROJECTS.filter((p) => p.province === name);
            const office = ORG.offices.find((o) => o.city === name);
            const zone = zoneByProvince.get(name);
            l.bindTooltip(
              `<strong>${name}</strong>${zone ? `<br/><em>${zone.name}</em>` : ""}${office ? `<br/><em>${office.type} office</em>` : ""}<br/>${
                projects.length
                  ? projects
                      .filter(
                        (p) =>
                          !p.needsVerification.some((item) =>
                            item.toLowerCase().includes("status"),
                          ),
                      )
                      .map((p) => `• ${p.title} (${p.year})`)
                      .join("<br/>") || "No project is listed in the current portfolio"
                  : "No project is listed in the current portfolio"
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

        map.fitBounds(layer.getBounds(), { padding: [60, 60] });
        map.invalidateSize();
      })
      .catch(() => {
        if (!cancelled) setMapError(true);
      });
    return () => {
      cancelled = true;
      map.remove();
    };
  }, [zones]);

  return (
    <div className="relative">
      <div
        ref={ref}
        role="region"
        aria-label="Interactive map of Afghanistan"
        className="relative z-0 h-[520px] w-full overflow-hidden rounded-2xl border border-border md:h-[620px] xl:h-[720px]"
      />
      {mapError && (
        <p
          role="status"
          className="absolute bottom-3 left-3 right-3 z-10 rounded-lg bg-card/95 p-3 text-xs text-muted-foreground shadow-card"
        >
          Map tiles or province boundaries could not be loaded. The province list remains available
          below.
        </p>
      )}
    </div>
  );
}
