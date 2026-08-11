import Container from "@/components/Container";

export default function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-white/10 py-20 sm:py-28">
      <Container className="max-w-5xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-stone-100 sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-400 sm:text-xl">
          {description}
        </p>
      </Container>
    </section>
  );
}
