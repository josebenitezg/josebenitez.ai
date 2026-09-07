import type { Metadata } from "next";
import Container from "@/components/Container";
import NextRoom from "@/components/NextRoom";
import PageIntro from "@/components/PageIntro";
import { capabilities } from "@/lib/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Ways José Benítez can support teams working through Physical AI strategy, computer vision, edge and cloud infrastructure, and system evaluation.",
  alternates: {
    canonical: "/capabilities",
  },
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            How I<br />
            <em>can help.</em>
          </>
        }
        description="Working with founders and teams building physical AI."
        study={3}
      />
      <Container className="room-content">
        <div>
          {capabilities.map((capability) => (
            <article key={capability.number} className="capability-entry">
              <h2>{capability.title}</h2>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </Container>
      <NextRoom href="/contact" title="Get in touch" />
    </>
  );
}
