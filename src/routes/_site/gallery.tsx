import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/hero.jpg";
import bridal from "@/assets/bridal.jpg";
import facial from "@/assets/facial.jpg";
import nails from "@/assets/nails.jpg";
import hair from "@/assets/hair.jpg";
import interior from "@/assets/interior.jpg";
import galleryHair from "@/assets/gallery-hair.png";
import galleryFacial from "@/assets/gallery-facial.png";
import galleryBridal from "@/assets/gallery-bridal.png";

export const Route = createFileRoute("/_site/gallery")({ component: GalleryPage });

const images = [hero, galleryHair, bridal, hair, facial, galleryFacial, nails, interior, galleryBridal];

function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Our work" title="Gallery of" script="Looks" crumbs={[{ label: "Gallery" }]}
        subtitle="A glimpse into the transformations we've crafted — bridal, editorial and everyday elegance." />
      <section className="py-16 lg:py-20">
        <div className="container-x columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {images.map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl group break-inside-avoid">
              <img src={src} alt={`Salon work ${i + 1}`} loading="lazy" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--gradient-overlay)" }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
