import { ShipfrontMark } from "@/components/shipfront/mark";

const columns = [
  {
    title: "Product",
    links: ["The Crate", "Shipment Visibility", "Exception Intelligence", "Analytics", "Integrations"],
  },
  {
    title: "Solutions",
    links: ["Forwarders", "Retail", "Manufacturing", "3PL", "E-commerce"],
  },
  {
    title: "Developers",
    links: ["API", "Documentation", "Webhooks", "Status"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Security", "Privacy"],
  },
];

export function Footer() {
  return (
    <footer className="bg-sf-night px-5 py-16 text-sf-night-text md:px-8">
      <div className="mx-auto max-w-[1520px]">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2">
              <ShipfrontMark className="h-6 w-6 text-sf-night-text" />
              <span className="text-[13px] font-bold tracking-[0.18em]">SHIPFRONT</span>
            </div>
            <p className="mt-4 max-w-sm text-sf-night-muted">Operations for everything in motion.</p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="label text-sf-night-muted">{column.title}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a className="hover:text-white" href="#crate">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-sf-night-line pt-6 text-sm text-sf-night-muted">
          <p>© 2026 Shipfront</p>
          <p className="mono text-[11px]">SYSTEM STATUS / ALL REGIONS OPERATIONAL / LAST EVENT 04 SEC AGO</p>
          <nav className="flex gap-4" aria-label="Legal">
            <a href="#access">Terms</a>
            <a href="#access">Privacy</a>
            <a href="#access">Security</a>
            <a href="#access">Status</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
