import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import NextRoom from "@/components/NextRoom";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with José Benítez about Physical AI, computer vision, inference infrastructure, or a consequential system decision.",
  alternates: { canonical: "/contact" },
};
export default function ContactPage() {
  return (
    <>
      <PageIntro
        number="05"
        eyebrow="A conversation"
        title={
          <>
            What are you
            <br />
            <em>thinking about?</em>
          </>
        }
        description="A system you’re building. A question you can’t shake. An unexpected connection. I’d like to hear about it."
        study={4}
        annotation="A signal sent. A conversation begun."
      />
      <Container className="contact-room contact-grid">
        <aside className="margin-note">
          <p className="observatory-label">A note is a good beginning.</p>
          <p>San Francisco, California</p>
        </aside>
        <div>
          <h2>
            Start wherever
            <br />
            <em>you are.</em>
          </h2>
          <p className="contact-note">
            Tell me a little about what you’re working on and what you’re trying
            to understand. If my experience is relevant, we can take it from
            there.
          </p>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-channel"
          >
            <span>
              Connect on LinkedIn
              <small>Send me a note · opens in a new tab</small>
            </span>
            <ArrowUpRight aria-hidden="true" size={20} />
          </a>
        </div>
      </Container>
      <NextRoom
        href="/"
        number="00"
        label="Observatory"
        title="Stay curious. Look around."
      />
    </>
  );
}
