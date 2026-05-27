import { useMemo, useState } from "react";

import Navbar from "../components/layout/Navbar";
import InfoBanner from "../components/common/InfoBanner";
import HoldingsTable from "../components/holdings/HoldingsTable";
import SummarySection from "../components/summary/SummarySection";

import { baseCapitalGains, holdings } from "../data/holdings";

import { calculateHarvesting } from "../utils/harvesting";

function Dashboard() {
  const [selectedIds, setSelectedIds] = useState([]);

  const selectedHoldings = useMemo(
    () => holdings.filter((holding) => selectedIds.includes(holding.id)),
    [selectedIds],
  );

  const harvesting = useMemo(
    () => calculateHarvesting(baseCapitalGains, selectedHoldings),
    [selectedHoldings],
  );

  const preData = {
    ...harvesting.pre,

    total: harvesting.pre.shortTermNet + harvesting.pre.longTermNet,
  };

  const afterData = {
    ...harvesting.after,

    total: harvesting.after.effectiveCapitalGains,

    savings: harvesting.harvestedLosses,
  };

  const handleToggle = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((selectedId) => selectedId !== id)
        : [...current, id],
    );
  };

  const handleToggleAll = (visibleHoldings) => {
    const visibleIds = visibleHoldings.map(({ id }) => id);

    const allVisibleSelected = visibleIds.every((id) =>
      selectedIds.includes(id),
    );

    if (allVisibleSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id)),
      );
    } else {
      setSelectedIds((current) => [...new Set([...current, ...visibleIds])]);
    }
  };

  return (
    <div className="min-h-screen bg-[#070810] text-white">
      <Navbar />

      <main className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 lg:px-14">
        <div className="mb-8 flex flex-wrap items-center gap-x-7 gap-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tax Optimisation
          </h1>

          <div className="group relative">
            <a
              className="text-xl font-medium text-[#4F6DFF] underline decoration-[#4F6DFF]/70 underline-offset-4 transition hover:text-[#7EA0FF]"
              href="#how-it-works"
            >
              How it works?
            </a>

            <div
              className="pointer-events-none absolute left-1/2 top-9 z-30 hidden w-[420px] -translate-x-1/2 rounded-lg bg-white p-4 text-base leading-6 text-black shadow-2xl before:absolute before:-top-2 before:left-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:rotate-45 before:bg-white group-hover:block"
              id="how-it-works"
            >
              <ul className="list-disc space-y-1 pl-5">
                <li>See your capital gains for FY 2024-25 in the left card</li>

                <li>
                  Check boxes for assets you plan on selling to reduce your tax
                  liability
                </li>

                <li>
                  Instantly see your updated tax liability in the right card
                </li>
              </ul>

              <p className="mt-4">
                <span className="font-bold">Pro tip:</span> Experiment with
                different combinations of your holdings to optimize your tax
                liability.
              </p>
            </div>
          </div>
        </div>

        <InfoBanner />

        <SummarySection afterData={afterData} preData={preData} />

        <HoldingsTable
          holdings={holdings}
          onToggle={handleToggle}
          onToggleAll={handleToggleAll}
          selectedIds={selectedIds}
        />
      </main>
    </div>
  );
}

export default Dashboard;
