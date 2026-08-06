import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Prose } from "@/components/site/Prose";

export const Route = createFileRoute("/_site/company-history")({ component: HistoryPage });

function HistoryPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Some" script="History" crumbs={[{ label: "Our History" }]}
        subtitle="How 1st Lady grew from a neighbourhood parlour into a trusted salon and beauty academy." />
      <Prose>
        <p>
          <strong>1st Lady Hair &amp; Beauty Salon</strong> began with a simple belief — that every woman deserves to feel
          confident and cared for. What started as a small ladies-only parlour in Bagha Purana has grown, year after year,
          into one of the area's most trusted names in hair, beauty and bridal styling.
        </p>
        <h2>Built on trust</h2>
        <p>
          Our reputation was built one guest at a time. By focusing on genuine care, hygienic practices and consistently
          beautiful results, we earned the loyalty of thousands of women across Moga district. That trust remains at the
          heart of everything we do.
        </p>
        <h2>From salon to academy</h2>
        <p>
          As demand grew, so did our team — and our mission. We launched the <strong>1st Lady Beauty Academy</strong> to
          train the next generation of beauty professionals, offering certificate, diploma and advanced programmes with
          hands-on, job-ready training.
        </p>
        <h2>Looking ahead</h2>
        <p>
          Today we continue to invest in our people, our products and our craft — combining timeless hospitality with
          modern techniques, and always keeping beauty kind to our guests, our staff and the environment.
        </p>
      </Prose>
    </>
  );
}
