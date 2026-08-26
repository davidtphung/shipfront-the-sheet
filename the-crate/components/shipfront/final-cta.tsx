export function FinalCta() {
  return (
    <section id="access" className="scroll-mt-24 px-5 py-28 md:px-8 md:py-40" aria-labelledby="cta-heading">
      <div className="relative mx-auto max-w-[1520px] overflow-hidden border border-sf-line bg-sf-paper px-6 py-16 md:px-16 md:py-24">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative">
          <p className="label">Start</p>
          <h2 id="cta-heading" className="display mt-5 max-w-[12ch] text-[clamp(3.4rem,7vw,7.4rem)]">
            Stop chasing shipments.
            <span className="mt-2 block">Start running them.</span>
          </h2>
          <p className="mt-6 max-w-[34em] text-lg text-sf-muted">
            The Crate gives your team the operational context to make the next move before the next problem arrives.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a className="inline-flex min-h-12 items-center bg-sf-blue px-5 font-medium text-white" href="mailto:info@myshipfront.com">
              Request access →
            </a>
            <a className="inline-flex min-h-12 items-center border border-sf-ink px-5 font-medium" href="mailto:info@myshipfront.com">
              Talk to Shipfront
            </a>
          </div>
          <p className="mono mt-10 text-[12px] text-sf-muted">● ALL SYSTEMS CONNECTED</p>
        </div>
      </div>
    </section>
  );
}
