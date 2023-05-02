export const fetchTxCost = async (web3) => {
  const gasEstimate = web3.utils.toBN(1875000);
  const gasPrice = web3.utils.toBN(1500000000);

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const gasCostInEth = web3.utils.fromWei(gasCostInWei.toString(), "ether");

  let responseGql = await fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
            bundle(id: "1" ) {
              ethPrice
            }
          }`,
    }),
  });

  if (!responseGql.ok) return "undefined";
  if (!responseGql.body.data) return "undefined";
  console.log(responseGql.body.data);
  const ethPriceInUsd = responseGql.body.data.bundle.ethPrice;

  const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);

  return txCost ? txCost : "undefined";
};
