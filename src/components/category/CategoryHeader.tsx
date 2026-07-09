import Container from "@/components/ui/Container";

interface Props {
  title: string;
  description: string;
}

export default function CategoryHeader({
  title,
  description,
}: Props) {
  return (
    <section className="py-12">
      <Container>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          Kategori
        </p>

        <h1 className="mt-3 text-5xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-4 max-w-2xl leading-8 text-slate-600">
          {description}
        </p>

      </Container>
    </section>
  );
}