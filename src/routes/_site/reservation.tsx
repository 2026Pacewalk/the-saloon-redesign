import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { AppointmentForm } from "@/components/site/AppointmentForm";

export const Route = createFileRoute("/_site/reservation")({ component: ReservationPage });

function ReservationPage() {
  return (
    <>
      <PageHero eyebrow="Reserve your seat" title="Make a" script="Reservation" crumbs={[{ label: "Reservation" }]}
        subtitle="Reserve your seat at 1st Lady Hair & Beauty Salon — quick and easy." />
      <section className="py-16 lg:py-24">
        <div className="container-x max-w-2xl">
          <AppointmentForm />
        </div>
      </section>
    </>
  );
}
