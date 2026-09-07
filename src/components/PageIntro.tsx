import type { ReactNode } from "react";
import Container from "@/components/Container";
import SignalStudy from "@/components/SignalStudy";

export default function PageIntro({
  title,
  description,
  study = 0,
  children,
}: {
  title: ReactNode;
  description?: string;
  study?: number;
  children?: ReactNode;
}) {
  return (
    <section className="room-intro">
      <Container className="room-intro-grid">
        <div>
          <h1>{title}</h1>
          {description && <p className="room-description">{description}</p>}
          {children}
        </div>
        <div className="room-study" aria-hidden="true">
          <SignalStudy variant={study} />
        </div>
      </Container>
    </section>
  );
}
