import type { ReactNode } from "react";
import Container from "@/components/Container";
import SignalStudy from "@/components/SignalStudy";

export default function PageIntro({
  number,
  eyebrow,
  title,
  description,
  study = 0,
  annotation,
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  description: string;
  study?: number;
  annotation: string;
}) {
  return (
    <section className="room-intro">
      <Container className="room-intro-grid">
        <div>
          <p className="observatory-label">
            <span className="room-number">{number}</span> / {eyebrow}
          </p>
          <h1>{title}</h1>
          <p className="room-description">{description}</p>
        </div>
        <figure className="room-study">
          <SignalStudy variant={study} />
          <figcaption>{annotation}</figcaption>
        </figure>
      </Container>
    </section>
  );
}
