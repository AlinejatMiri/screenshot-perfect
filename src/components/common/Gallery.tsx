import { useCallback, useEffect, useState } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroEducation from "@/assets/hero-education.jpg";
import heroLivelihoods from "@/assets/hero-livelihoods.jpg";

const GALLERY_IMAGES = [
  { src: heroLivelihoods, caption: "Sample: skills training activity" },
  { src: heroEducation, caption: "Sample: classroom learning session" },
  { src: heroAgriculture, caption: "Sample: seasonal harvest" },
  { src: heroEducation, caption: "Sample: literacy class in progress" },
  { src: heroAgriculture, caption: "Sample: orchard rehabilitation visit" },
  { src: heroLivelihoods, caption: "Sample: tailoring course graduation" },
];

export function Gallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <section aria-labelledby="gallery-heading" className="mb-10">
      <div className="mb-5 rounded-xl border border-dashed border-border bg-muted/50 p-4 text-sm text-muted-foreground">
        <strong className="text-heading">Sample gallery.</strong> These images demonstrate the
        gallery layout and must be replaced with approved photographs and captions.
      </div>
      <h2 id="gallery-heading" className="sr-only">
        Sample photo gallery
      </h2>
      <Carousel opts={{ loop: true, align: "start" }} setApi={setApi}>
        <CarouselContent className="-ml-4">
          {GALLERY_IMAGES.map((image) => (
            <CarouselItem key={image.caption} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
              <figure className="overflow-hidden rounded-2xl border border-border border-t-4 border-t-primary bg-card shadow-card">
                <img src={image.src} alt="" className="aspect-[4/3] w-full object-cover" />
                <figcaption className="p-4 text-sm font-semibold text-heading">
                  {image.caption}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 -translate-y-1/2 bg-background/80 shadow-card hover:bg-background" />
        <CarouselNext className="right-2 -translate-y-1/2 bg-background/80 shadow-card hover:bg-background" />
      </Carousel>
      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Gallery slides">
        {GALLERY_IMAGES.map((image, index) => (
          <button
            key={image.caption}
            type="button"
            role="tab"
            aria-selected={current === index}
            aria-label={`Go to slide ${index + 1}: ${image.caption}`}
            onClick={() => scrollTo(index)}
            className={`h-2.5 rounded-full border border-border transition-all ${
              current === index
                ? "w-6 border-primary bg-primary"
                : "w-2.5 bg-muted hover:bg-primary/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
