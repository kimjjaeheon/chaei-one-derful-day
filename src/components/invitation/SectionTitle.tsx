export function SectionTitle({ en, ko }: { en: string; ko: string }) {
  return (
    <div className="mb-8 text-center">
      <p className="font-script text-2xl text-primary">{en}</p>
      <h2 className="mt-1 font-display text-lg tracking-[0.2em] text-foreground">{ko}</h2>
    </div>
  );
}
