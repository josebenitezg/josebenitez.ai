import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/Container";
import SiteIndex from "@/components/SiteIndex";
import { siteConfig } from "@/lib/site";
export default function Footer() {
  return (
    <footer className="site-footer">
      <Container className="quiet-footer">
        <Link href="/contact" className="observatory-link">
          Say hello
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
        <div className="footer-options">
          <details className="footer-index">
            <summary>Explore</summary>
            <SiteIndex />
          </details>
          <nav aria-label="Footer navigation">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
            >
              GitHub
            </a>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
