import { useMemo, useState } from "react";
import HoldingRow from "./HoldingRow";

function HoldingsTable({ holdings, selectedIds, onToggle, onToggleAll }) {
  const [showAll, setShowAll] = useState(false);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "desc",
  });

  const visibleHoldings = showAll ? holdings : holdings.slice(0, 5);

  const visibleIds = visibleHoldings.map((holding) => holding.id);

  const allSelected = visibleIds.every((id) => selectedIds.includes(id));

  const someSelected =
    visibleIds.some((id) => selectedIds.includes(id)) && !allSelected;

  const sortedHoldings = useMemo(() => {
    const sortable = [...visibleHoldings];

    if (!sortConfig.key) {
      return sortable;
    }

    sortable.sort((a, b) => {
      const aValue = a[sortConfig.key].value;

      const bValue = b[sortConfig.key].value;

      if (sortConfig.direction === "asc") {
        return aValue - bValue;
      }

      return bValue - aValue;
    });

    return sortable;
  }, [visibleHoldings, sortConfig]);

  const requestSort = (key) => {
    let direction = "desc";

    if (sortConfig.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }

    setSortConfig({
      key,
      direction,
    });
  };

  return (
    <section className="rounded-lg bg-[#171720] p-5 sm:p-6">
      <h2 className="mb-5 text-3xl font-bold tracking-tight text-white">
        Holdings
      </h2>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full min-w-[1260px] border-collapse bg-[#08070D]">
          <thead>
            <tr className="text-left text-xl font-medium text-white">
              <th className="w-16 px-5 py-5">
                <input
                  checked={allSelected}
                  className="h-6 w-6 cursor-pointer rounded border-2 border-slate-400 bg-transparent text-[#315BEF] accent-[#315BEF]"
                  ref={(node) => {
                    if (node) {
                      node.indeterminate = someSelected;
                    }
                  }}
                  onChange={() => onToggleAll(visibleHoldings)}
                  type="checkbox"
                />
              </th>

              <th className="px-4 py-5">Asset</th>

              <th className="px-4 py-5 text-right">
                <span>Holdings</span>

                <span className="block text-base font-normal text-slate-400">
                  Avg Buy Price
                </span>
              </th>

              <th className="px-4 py-5 text-right">Current Price</th>

              <th
                className="cursor-pointer px-4 py-5 text-right transition hover:text-[#7EA0FF]"
                onClick={() => requestSort("shortTerm")}
              >
                Short-Term{" "}
                {sortConfig.key === "shortTerm" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>

              <th
                className="cursor-pointer px-4 py-5 text-right transition hover:text-[#7EA0FF]"
                onClick={() => requestSort("longTerm")}
              >
                Long-Term{" "}
                {sortConfig.key === "longTerm" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>

              <th className="px-5 py-5 text-right">Amount to Sell</th>
            </tr>
          </thead>

          <tbody>
            {sortedHoldings.map((holding) => (
              <HoldingRow
                holding={holding}
                isSelected={selectedIds.includes(holding.id)}
                key={holding.id}
                onToggle={onToggle}
              />
            ))}
          </tbody>
        </table>
      </div>

      {holdings.length > 5 && (
        <div className="mt-4">
          <button
            className="text-sm font-medium text-[#4F7CFF] transition hover:text-[#7EA0FF]"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        </div>
      )}
    </section>
  );
}

export default HoldingsTable;
