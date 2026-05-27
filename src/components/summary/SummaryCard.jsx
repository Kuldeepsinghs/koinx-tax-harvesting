import { formatCurrency } from "../../utils/formatters";

function SummaryCard({ title, data, accent = false }) {
  const cardClasses = accent
    ? "bg-gradient-to-br from-[#43A5FF] via-[#2682FA] to-[#0F5FFF] text-white shadow-[0_18px_45px_rgba(22,106,255,0.28)]"
    : "bg-[#171720] text-white";

  return (
    <article className={`rounded-lg p-5 sm:p-6 ${cardClasses}`}>
      <h2 className="mb-5 text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>

      <div className="grid grid-cols-[1fr_1fr_1fr] items-center gap-x-4 gap-y-5">
        <span />
        <span className="text-right text-lg font-medium text-slate-200">
          Short-term
        </span>
        <span className="text-right text-lg font-medium text-slate-200">
          Long-term
        </span>

        <span className="text-lg text-slate-200">Profits</span>
        <span className="text-right text-xl">
          {formatCurrency(data.shortTermProfits)}
        </span>
        <span className="text-right text-xl">
          {formatCurrency(data.longTermProfits)}
        </span>

        <span className="text-lg text-slate-200">Losses</span>
        <span className="text-right text-xl">
          {formatCurrency(data.shortTermLosses)}
        </span>
        <span className="text-right text-xl">
          {formatCurrency(data.longTermLosses)}
        </span>

        <span className="text-lg font-medium text-slate-100">
          Net Capital Gains
        </span>
        <span className="text-right text-xl font-semibold">
          {formatCurrency(data.shortTermNet)}
        </span>
        <span className="text-right text-xl">
          {formatCurrency(data.longTermNet)}
        </span>
      </div>

      <div className="mt-10 flex flex-wrap items-baseline gap-x-7 gap-y-2">
        <span className="text-2xl font-bold">
          {accent ? "Effective Capital Gains:" : "Realised Capital Gains:"}
        </span>
        <span className="text-3xl font-bold tracking-tight sm:text-4xl">
          {formatCurrency(data.total)}
        </span>
      </div>

      {accent && data.savings > 0 && (
        <p className="mt-5 text-sm text-blue-100">
          🎉 You are going to save upto{" "}
          <span className="font-semibold text-white">
            {formatCurrency(data.savings)}
          </span>
        </p>
      )}
    </article>
  );
}

export default SummaryCard;
