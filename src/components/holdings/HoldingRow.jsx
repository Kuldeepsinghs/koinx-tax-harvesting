import { formatCurrency, getGainColor } from "../../utils/formatters";

function HoldingRow({ holding, isSelected, onToggle }) {
  const hasHarvestableLoss =
    holding.shortTerm.value < 0 || holding.longTerm.value < 0;

  return (
    <tr
      className={`border-b border-white/10 transition last:border-b-0 hover:bg-white/[0.035] ${
        isSelected ? "bg-[#172554]/60" : ""
      }`}
    >
      <td className="w-16 px-5 py-5 align-middle">
        <input
          checked={isSelected}
          className="h-6 w-6 cursor-pointer rounded border-2 border-slate-400 bg-transparent text-[#315BEF] accent-[#315BEF]"
          onChange={() => onToggle(holding.id)}
          type="checkbox"
        />
      </td>

      <td className="min-w-[260px] px-4 py-5">
        <div className="flex items-center gap-4">
          <img
            alt={`${holding.name} logo`}
            className="h-10 w-10 rounded-full object-cover"
            src={holding.logo}
          />
          <div className="min-w-0">
            <p className="max-w-[170px] truncate text-xl font-medium text-white">
              {holding.name}
            </p>
            <p className="mt-1 text-lg text-slate-200">{holding.symbol}</p>
          </div>
        </div>
      </td>

      <td className="min-w-[220px] px-4 py-5 text-right">
        <p className="text-xl font-medium text-white">{holding.holdings}</p>
        <p className="mt-1 text-base text-slate-400">{holding.avgBuyPrice}</p>
      </td>

      <td className="min-w-[170px] px-4 py-5 text-right text-xl text-white">
        {holding.currentPrice}
      </td>

      <td className="min-w-[220px] px-4 py-5 text-right">
        <p
          className={`text-xl font-medium ${getGainColor(
            holding.shortTerm.value,
          )}`}
        >
          {formatCurrency(holding.shortTerm.value, { compact: true })}
        </p>
        <p className="mt-1 text-base text-slate-400">
          {holding.shortTerm.amount}
        </p>
      </td>

      <td className="min-w-[210px] px-4 py-5 text-right">
        <p
          className={`text-xl font-medium ${getGainColor(
            holding.longTerm.value,
          )}`}
        >
          {formatCurrency(holding.longTerm.value, { compact: true })}
        </p>
        <p className="mt-1 text-base text-slate-400">
          {holding.longTerm.amount}
        </p>
      </td>

      <td className="min-w-[190px] px-5 py-5 text-right text-lg text-white">
        {isSelected && hasHarvestableLoss ? holding.holdings : "-"}
      </td>
    </tr>
  );
}

export default HoldingRow;
