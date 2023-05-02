export const fetchLidoAbi = async () => {
  const response = await fetch("https://raw.githubusercontent.com/lidofinance/lido-subgraph/master/abis/Lido.json");
  if (!response.ok) {
    return "Loading";
  }
  const lidoAbi = await response.json();
  return lidoAbi;
};
