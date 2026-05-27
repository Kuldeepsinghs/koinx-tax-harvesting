export const calculateHarvesting = (
  capitalGains,
  selectedHoldings,
) => {

  let selectedShortTerm = 0;
  let selectedLongTerm = 0;

  selectedHoldings.forEach((holding) => {
    selectedShortTerm +=
      holding.shortTerm.value;

    selectedLongTerm +=
      holding.longTerm.value;
  });

  // PRE VALUES

  const preShortTermProfits =
    capitalGains.shortTermProfits;

  const preShortTermLosses =
    capitalGains.shortTermLosses;

  const preLongTermProfits =
    capitalGains.longTermProfits;

  const preLongTermLosses =
    capitalGains.longTermLosses;

  // AFTER VALUES

  let afterShortTermProfits =
    preShortTermProfits;

  let afterShortTermLosses =
    preShortTermLosses;

  if (selectedShortTerm > 0) {

    afterShortTermProfits =
      preShortTermProfits +
      selectedShortTerm;

  } else {

    afterShortTermLosses =
      preShortTermLosses +
      Math.abs(selectedShortTerm);

  }

  const preShortTermNet =
    preShortTermProfits -
    preShortTermLosses;

  const preLongTermNet =
    preLongTermProfits -
    preLongTermLosses;

  const afterShortTermNet =
    afterShortTermProfits -
    afterShortTermLosses;

  const afterLongTermNet =
    preLongTermProfits -
    preLongTermLosses;

  return {

    harvestedLosses: Math.abs(
      Math.min(selectedShortTerm, 0)
    ),

    pre: {
      shortTermProfits:
        preShortTermProfits,

      shortTermLosses:
        preShortTermLosses,

      longTermProfits:
        preLongTermProfits,

      longTermLosses:
        preLongTermLosses,

      shortTermNet:
        preShortTermNet,

      longTermNet:
        preLongTermNet,
    },

    after: {
      shortTermProfits:
        afterShortTermProfits,

      shortTermLosses:
        afterShortTermLosses,

      longTermProfits:
        preLongTermProfits,

      longTermLosses:
        preLongTermLosses,

      shortTermNet:
        afterShortTermNet,

      longTermNet:
        afterLongTermNet,

      effectiveCapitalGains:
        afterShortTermNet +
        afterLongTermNet,
    },
  };
};