// FETCH LIDO STAKING APR
export const fetchLidoApr = async () => {
  const response = await fetch("https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr");
  console.log(response);
  if (!response.ok) return "error";
  const apr = JSON.parse(response?.body?.contents) ?? "...";
  return apr;
};
