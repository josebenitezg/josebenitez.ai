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

const prompts = [
  "What does the system need to perceive before it can act reliably?",
  "What architecture fits the latency, cost, and reliability constraints?",
  "What should run at the edge, in the cloud, or outside the AI path?",
  "How do we move from a promising model to a reliable operating system?",
];

export default function CapabilitiesPage() {
  return (
    <>
      <PageIntro
        number="04"
        eyebrow="Working together"
        title={
          <>
            Good questions.
            <br />
            <em>Better systems.</em>
          </>
        }
        description="I work with founders and technical leaders thinking through perception, inference, and autonomy. We start with the system, the operating conditions, and the decision in front of you."
        study={3}
        annotation="Understand the parts. See the whole."
      />
      <Container className="room-content">
        <div>
          {capabilities.map((capability, index) => (
            <article key={capability.number} className="capability-entry">
              <span className="observatory-label">{capability.number}</span>
              <h2>{capability.title}</h2>
              <div>
                <blockquote className="capability-question">
                  {prompts[index]}
                </blockquote>
                <p>{capability.description}</p>
              </div>
            </article>
          ))}
        </div>
        <section className="working-note">
          <p className="observatory-label">A starting point</p>
          <h2 className="mt-5">
            Bring the question
            <br />
            <em>you keep coming back to.</em>
          </h2>
          <p>
            We can begin with the context, what you’ve tried, and where the
            uncertainty is. The shape of the work follows from there.
          </p>
        </section>
      </Container>
      <NextRoom
        href="/contact"
        number="05"
        label="Contact"
        title="Let’s think about it together."
      />
    </>
  );
}
