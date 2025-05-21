import { useStateContext } from "../../statecontext/statecontext";

const AfterHarvesting = () => {
  const { checked, holdings } = useStateContext();

  // Default values before harvesting
  let afterHarvesting = {
    capitalGains: {
      stcg: {
        profits: 70200.88,
        losses: 1548.53,
      },
      ltcg: {
        profits: 5020,
        losses: 3050,
      },
    },
  };

  // Apply changes from checked coins
  checked.forEach((coinSymbol) => {
    const coinData = holdings.find((item) => item.coin === coinSymbol);
    if (coinData) {
      // STCG
      const stcgGain = coinData.stcg.gain;
      if (stcgGain >= 0) {
        afterHarvesting.capitalGains.stcg.profits += stcgGain;
      } else {
        afterHarvesting.capitalGains.stcg.losses += Math.abs(stcgGain);
      }

      // LTCG
      const ltcgGain = coinData.ltcg.gain;
      if (ltcgGain >= 0) {
        afterHarvesting.capitalGains.ltcg.profits += ltcgGain;
      } else {
        afterHarvesting.capitalGains.ltcg.losses += Math.abs(ltcgGain);
      }
    }
  });

  const formatCurrency = (num) =>
    num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });

  return (
    <div className="bg-gradient-to-r from-[#3C9AFF] to-[#0066FE] text-white p-4 rounded-xl lg:w-[40%] mx-0 lg:mx-5 font-sans mb-2">
      <h2 className="text-xl font-semibold mb-8">After Harvesting</h2>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="w-1/3"></th>
            <th className="text-right text-gray-400">Short-term</th>
            <th className="text-right text-gray-400">Long-term</th>
          </tr>
        </thead>
        <tbody className="text-base">
          <tr>
            <td className="py-1">Profits</td>
            <td className="text-right">
              {formatCurrency(afterHarvesting.capitalGains.stcg.profits)}
            </td>
            <td className="text-right">
              {formatCurrency(afterHarvesting.capitalGains.ltcg.profits)}
            </td>
          </tr>
          <tr>
            <td className="py-1">Losses</td>
            <td className="text-right">
              {formatCurrency(afterHarvesting.capitalGains.stcg.losses)}
            </td>
            <td className="text-right">
              {formatCurrency(afterHarvesting.capitalGains.ltcg.losses)}
            </td>
          </tr>
          <tr>
            <td className="py-1 font-medium">Net Capital Gains</td>
            <td className="text-right">
              {formatCurrency(
                afterHarvesting.capitalGains.stcg.profits -
                  afterHarvesting.capitalGains.stcg.losses
              )}
            </td>
            <td className="text-right">
              {formatCurrency(
                afterHarvesting.capitalGains.ltcg.profits -
                  afterHarvesting.capitalGains.ltcg.losses
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-8 flex items-center">
        <h3 className="text-lg font-medium">Effective Capital Gains:</h3>
        <p className="text-3xl font-bold mt-1 ml-5">
          {formatCurrency(
            afterHarvesting.capitalGains.stcg.profits -
              afterHarvesting.capitalGains.stcg.losses +
              (afterHarvesting.capitalGains.ltcg.profits -
                afterHarvesting.capitalGains.ltcg.losses)
          )}
        </p>
      </div>
      <p>
        {afterHarvesting.capitalGains.stcg.profits -
          afterHarvesting.capitalGains.stcg.losses +
          (afterHarvesting.capitalGains.ltcg.profits -
            afterHarvesting.capitalGains.ltcg.losses) <
        0
          ? `Your taxable capital gains are reduced by: ${
              afterHarvesting.capitalGains.stcg.profits -
              afterHarvesting.capitalGains.stcg.losses +
              (afterHarvesting.capitalGains.ltcg.profits -
                afterHarvesting.capitalGains.ltcg.losses)
            }`
          : ""}
      </p>
    </div>
  );
};

export default AfterHarvesting;
