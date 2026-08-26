import { industries } from "@/data/industries";

export function IndustryCards() {
  return (
    <section id="industries" className="scroll-mt-24 px-5 py-24 md:px-8 md:py-36" aria-labelledby="ind-heading">
      <div className="mx-auto max-w-[1520px]">
        <h2 id="ind-heading" className="display max-w-[14ch] text-[clamp(3rem,5vw,5.4rem)]">
          Built for teams with things in motion.
        </h2>
        <div className="mt-12 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          {industries.map((item) => (
            <article key={item.name} className="min-w-[280px] border border-sf-line bg-sf-paper p-6">
              <p className="mono text-[12px] text-sf-blue">{item.index}</p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">{item.name}</h3>
              <p className="mt-3 text-sf-muted">{item.problem}</p>
              <p className="mt-4">{item.benefit}</p>
              <p className="mono mt-6 text-[12px] text-sf-muted">{item.detail}</p>
              <a className="mt-6 inline-flex min-h-10 items-center text-sm text-sf-blue" href="#crate">
                Explore workflow →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
