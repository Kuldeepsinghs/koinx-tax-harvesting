export const formatCurrency = (value, options = {}) => {
  const { compact = false } = options;
  const absolute = Math.abs(value);

  if (compact && absolute >= 1000000) {
    return `${value < 0 ? "-" : ""}$${(absolute / 1000000).toFixed(2)}M`;
  }

  if (compact && absolute >= 1000) {
    return `${value < 0 ? "-" : ""}$${(absolute / 1000).toFixed(2)}K`;
  }

  const formatted = absolute.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${value < 0 ? "-" : ""}$${formatted}`;
};

export const getGainColor = (value) => {
  if (value > 0) return "text-emerald-400";
  if (value < 0) return "text-rose-400";
  return "text-white";
};
