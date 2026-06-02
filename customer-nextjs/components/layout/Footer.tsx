import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="support" className="mt-16 border-t border-gainsco-200 bg-gainsco-900 text-blue-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Image
              src="/images/gainsco-logo.png"
              alt="GAINSCO"
              width={160}
              height={42}
              className="h-9 w-auto brightness-0 invert"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-200/80">
              Personalized auto insurance quotes designed to get you covered quickly
              and confidently.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick links
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#quote" className="hover:text-white transition">
                  Get a quote
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition">
                  How it works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-blue-200/80">
              <li>1-800-GAINSCO</li>
              <li>support@gainsco.com</li>
              <li>Mon–Fri, 8am–6pm CT</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gainsco-800 pt-8 text-xs text-blue-300/70 sm:flex-row">
          <p>© {year} GAINSCO Auto Insurance. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
