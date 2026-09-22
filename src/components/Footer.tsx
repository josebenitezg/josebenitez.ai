import { siteConfig } from "@/lib/site";

const links = [
  { label: "LinkedIn", href: siteConfig.links.linkedin },
  { label: "GitHub", href: siteConfig.links.github },
  { label: "X", href: siteConfig.links.x },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()}</span>
      <nav aria-label="Elsewhere">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
