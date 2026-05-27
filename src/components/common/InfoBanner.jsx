import { useState } from "react";
import { FiChevronDown, FiInfo } from "react-icons/fi";

function InfoBanner() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mb-6 overflow-hidden rounded-lg border border-[#315BEF] bg-[#101936] shadow-[0_0_0_1px_rgba(49,91,239,0.15)]">
      <button
        className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left transition hover:bg-white/[0.03] sm:px-5"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="flex items-center gap-3 text-lg font-semibold text-white sm:text-xl">
          <FiInfo className="h-7 w-7 shrink-0 text-[#668AFF]" />
          <span>Important Notes And Disclaimers</span>
        </span>
        <FiChevronDown
          className={`h-6 w-6 shrink-0 text-slate-300 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-[#315BEF]/50 px-5 pb-5 text-sm leading-6 text-slate-300 sm:text-base">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Tax loss harvesting is currently not allowed under Indian tax
              regulations. Please consult your tax advisor before making any
              decisions.
            </li>
            <li>
              Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.
            </li>
            <li>
              Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.
            </li>
            <li>
              Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.
            </li>
            <li>
              Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default InfoBanner;
