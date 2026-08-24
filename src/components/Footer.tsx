import Container from "@/components/Container";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "X", href: siteConfig.links.x },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <Container className="flex flex-col gap-7 text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-stone-200">José Benítez</p>
          <p className="mt-1">AI systems for the physical world.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} profile (opens in a new tab)`}
              className="transition-colors hover:text-stone-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
