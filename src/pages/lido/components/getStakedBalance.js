import { ethers } from "ethers";
const lidoContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";

export const getStakedBalance = (web3, state) => {
  console.log(state);
  const encodedData = state.iface.encodeFunctionData("balanceOf", [state.sender]);
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider
    .call({
      to: lidoContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = state.iface.decodeFunctionResult("balanceOf", rawBalance);
      const balanceWei = web3.utils.toBN(receiverBalanceHex.toString());
      const tokenDecimals = 18; // Replace with the actual number of decimals for your token
      const balanceReadable = web3.utils.fromWei(balanceWei, "ether"); // Convert from Wei to Ether

      // Format the balance as a string with commas and 2 decimal places
      const balanceFormatted = Number(balanceReadable)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");

      console.log(balanceFormatted); // Outputs the formatted balance string
      return balanceFormatted;
    });
};
