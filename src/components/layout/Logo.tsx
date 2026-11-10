import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/pwso-logo.png.asset.json";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="inline-flex shrink-0 items-center" aria-label="PWSO home">
      <img
        src={logoAsset.url}
        alt="Poor Women Support Organization (PWSO)"
        width={1080}
        height={540}
        className={inverted ? "h-20 w-40 object-contain" : "h-12 w-24 object-contain"}
      />
    </Link>
  );
}
