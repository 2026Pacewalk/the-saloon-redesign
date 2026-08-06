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
import aromaMassageImg from "@/assets/svc-aroma-massage.jpg";
import beautyCareImg from "@/assets/svc-beauty-care.jpg";
import bridalImg from "@/assets/svc-bridal.jpg";
import browTintImg from "@/assets/svc-brow-tint.jpg";
import cuticleImg from "@/assets/svc-cuticle.jpg";
import dayMakeupImg from "@/assets/svc-day-makeup.jpg";
import electrolysisImg from "@/assets/svc-electrolysis.jpg";
import eveningMakeupImg from "@/assets/svc-evening-makeup.jpg";
import extensionsImg from "@/assets/svc-extensions.jpg";
import eyelashesImg from "@/assets/svc-eyelashes.jpg";
import facialImg from "@/assets/svc-facial.jpg";
import filePolishImg from "@/assets/svc-file-polish.jpg";
import hairColorImg from "@/assets/svc-hair-color.jpg";
import hairStylingImg from "@/assets/svc-hair-styling.jpg";
import handsFeetImg from "@/assets/svc-hands-feet.jpg";
import honeyWrapImg from "@/assets/svc-honey-wrap.jpg";
import iplImg from "@/assets/svc-ipl.jpg";
import lashTintImg from "@/assets/svc-lash-tint.jpg";
import longHairImg from "@/assets/svc-long-hair.jpg";
import makeupLessonImg from "@/assets/svc-makeup-lesson.jpg";
import maniPediImg from "@/assets/svc-mani-pedi.jpg";
import ozoneImg from "@/assets/svc-ozone.jpg";
import shellacImg from "@/assets/svc-shellac.jpg";
import shortHairImg from "@/assets/svc-short-hair.jpg";
import stoneTherapyImg from "@/assets/svc-stone-therapy.jpg";
import sugaringImg from "@/assets/svc-sugaring.jpg";
import threadingImg from "@/assets/svc-threading.jpg";
import updoImg from "@/assets/svc-updo.jpg";
import waxingImg from "@/assets/svc-waxing.jpg";
import courseMehndi from "@/assets/course-mehndi.jpg";
import g1 from "@/assets/g1.jpg.asset.json";
import g2 from "@/assets/g2.jpg.asset.json";
import g3 from "@/assets/g3.jpg.asset.json";

export const Route = createFileRoute("/_site/gallery")({ component: GalleryPage });

const images = [hero, galleryHair, bridal, hair, facial, galleryFacial, nails, interior, galleryBridal, g1.url, g2.url, g3.url, courseMehndi, aromaMassageImg, beautyCareImg, bridalImg, browTintImg, cuticleImg, dayMakeupImg, electrolysisImg, eveningMakeupImg, extensionsImg, eyelashesImg, facialImg, filePolishImg, hairColorImg, hairStylingImg, handsFeetImg, honeyWrapImg, iplImg, lashTintImg, longHairImg, makeupLessonImg, maniPediImg, ozoneImg, shellacImg, shortHairImg, stoneTherapyImg, sugaringImg, threadingImg, updoImg, waxingImg];

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
