import Container from "@/components/Container";
import SiteIndex from "@/components/SiteIndex";
import { siteConfig } from "@/lib/site";
const footerLinks = [
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "X", href: siteConfig.links.x },
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <p className="observatory-label">
          A few connected rooms. One ongoing curiosity.
        </p>
        <SiteIndex />
        <div className="footer-colophon">
          <div>
            <p>José Benítez</p>
            <span>Physical AI. Open questions. San Francisco.</span>
          </div>
          <nav aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} profile (opens in a new tab)`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
