import { ethers } from "ethers";
import { useEffect, useState } from "react";
import fetchTheme from "./components/theme";
import Web3 from "web3";

const Lido = () => {
  const lidoContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";
  const tokenDecimals = 18;

  const [state, setState] = useState({
    lidoArp: "10",
    sender: null,
    balance: null,
    stakedBalance: null,
    txCost: null,
    strEther: null,
    iface: null,
  });
  const [Theme, setTheme] = useState(null);

  // HELPER FUNCTIONS
  const getStakedBalance = (web3, receiver) => {
    const encodedData = state.iface.encodeFunctionData("balanceOf", [receiver]);
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

  const submitEthers = (strEther, _referral) => {
    if (!strEther) {
      return console.log("Amount is missing");
    }
    const erc20 = new ethers.Contract(lidoContract, lidoAbi.body, Ethers.provider().getSigner());

    let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

    erc20.submit(lidoContract, { value: amount }).then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
    });
  };

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    // FETCH LIDO ABI
    const fetchLidoAbi = async () => {
      const response = await fetch("https://raw.githubusercontent.com/lidofinance/lido-subgraph/master/abis/Lido.json");
      if (!response.ok) {
        return "Loading";
      }
      const lidoAbi = await response.json();
      console.log(lidoAbi);
      const iface = new ethers.Interface(lidoAbi);
      console.log(iface);
      setState((prevState) => ({ ...prevState, iface: iface }));
    };
    if (state.iface === null) {
      fetchLidoAbi();
    }
    // fetchLidoAbi();

    // // FETCH LIDO STAKING APR
    // const fetchLidoApr = async () => {
    //   if (state.lidoArp === null) {
    //     const response = await fetch("https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr");
    //     console.log(response);
    //     if (!response.ok) return;
    //     const apr = JSON.parse(response?.body?.contents) ?? "...";
    //     setState((prevState) => ({ ...prevState, lidoArp: apr }));
    //   }
    // };
    // if (state.lidoArp === null) {
    //   fetchLidoApr();
    // }

    // DETECT SENDER
    const getSender = async () => {
      if (!state.sender) {
        const sender = await web3.eth.getAccounts();
        setState((prevState) => ({ ...prevState, sender: sender[0] }));
      }
    };
    getSender();

    // FETCH SENDER BALANCE
    const fetchSenderBalance = async () => {
      if (!state.balance) {
        if (state.sender) {
          console.log(state.sender);
          const balances = await web3.eth.getBalance(state.sender);
          const fixedBalance = web3.utils.fromWei(balances, "ether");
          setState((prevState) => ({
            ...prevState,
            balance: fixedBalance,
          }));
        }
      }
    };
    fetchSenderBalance();

    // FETCH SENDER STETH BALANCE
    const fetchSenderStakedBalance = async () => {
      if (!state.stakedBalance && !state.iface && !state.sender) {
        const stakedBalance = await getStakedBalance(web3, state.sender);
        setState((prevState) => ({ ...prevState, stakedBalance }));
      }
    };
    if (!state.stakedBalance) {
      fetchSenderStakedBalance();
    }

    // FETCH TX COST
    const fetchTxCost = async () => {
      if (!state.txCost) {
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

        if (!responseGql.ok) return "";

        console.log(responseGql.body.data);
        const ethPriceInUsd = responseGql.body.data.bundle.ethPrice;

        const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);

        setState((prevState) => ({ ...prevState, txCost }));
      }
    };
    // if (!state.txCost) {
    //   fetchTxCost();
    // }
    console.log(state);
  }, [state.iface, state.lidoArp, state.sender, state.balance, state.stakedBalance]);

  useEffect(() => {
    const fetchStyledComponent = async () => {
      const component = await fetchTheme();
      console.log(component);
      setTheme(component);
    };
    fetchStyledComponent();
  }, []);

  if (!Theme || !state.iface || !state.lidoArp || !state.sender || !state.balance) {
    return <div>Loading...</div>;
  }

  return (
    <Theme>
      <div className="LidoContainer">
        <div className="Header">Stake Ether</div>
        <div className="SubHeader">Stake ETH and receive stETH while staking.</div>

        <div className="LidoForm">
          <div className="LidoFormTopContainer">
            <div className="LidoFormTopContainerLeft">
              <div className="LidoFormTopContainerLeftContent1">
                <div className="LidoFormTopContainerLeftContent1Container">
                  <span>Available to stake</span>
                  <div className="LidoFormTopContainerLeftContent1Circle" />
                </div>
              </div>
              <div className="LidoFormTopContainerLeftContent2">
                <span>{state.balance ?? "..."}&nbsp;ETH</span>
              </div>
            </div>
            <div className="LidoFormTopContainerRight">
              <div className="LidoFormTopContainerRightContent1">
                <div className="LidoFormTopContainerRightContent1Text">
                  <span>
                    {state.sender.substring(0, 6)}...
                    {state.sender.substring(state.sender.length - 4, state.sender.length)}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="LidoSplitter" />
          <div className="LidoFormBottomContainer">
            <div className="LidoFormTopContainerLeft">
              <div className="LidoFormTopContainerLeftContent1">
                <div className="LidoFormTopContainerLeftContent1Container">
                  <span>Staked amount</span>
                </div>
              </div>
              <div className="LidoFormTopContainerLeftContent2">
                <span>{state.stakedBalance ?? "..."}&nbsp;stETH</span>
              </div>
            </div>
            <div className="LidoFormTopContainerRight">
              <div className="LidoAprContainer">
                <div className="LidoAprTitle">Lido APR</div>
                <div className="LidoAprValue">{state.lidoArp ?? "..."}%</div>
              </div>
            </div>
          </div>
        </div>
        <div className="LidoStakeForm">
          <div className="LidoStakeFormInputContainer">
            <span className="LidoStakeFormInputContainerSpan1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path opacity="0.6" d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"></path>
                <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
                <path opacity="0.6" d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"></path>
                <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
                <path opacity="0.2" d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"></path>
                <path opacity="0.6" d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"></path>
              </svg>
            </span>
            <span className="LidoStakeFormInputContainerSpan2">
              <input
                className="LidoStakeFormInputContainerSpan2Input"
                value={state.strEther}
                onChange={(e) => {
                  setState((prevState) => ({ ...prevState, strEther: e.target.value }));
                }}
                placeholder="Amount"
              />
            </span>
            <span
              className="LidoStakeFormInputContainerSpan3"
              onClick={() => {
                State.update({
                  strEther: (parseFloat(state.balance) - 0.05).toFixed(2),
                });
              }}
            >
              <button className="LidoStakeFormInputContainerSpan3Content">
                <span className="LidoStakeFormInputContainerSpan3Max">MAX</span>
              </button>
            </span>
          </div>
          <button className="LidoStakeFormSubmitContainer" onClick={() => submitEthers(state.strEther, state.sender)}>
            <span>Submit</span>
          </button>

          <div className="LidoFooterContainer">
            <div className="LidoFooterRaw">
              <div className="LidoFooterRawLeft">You will receive</div>
              <div className="LidoFooterRawRight">${state.strEther ?? 0} stETH</div>
            </div>
            <div className="LidoFooterRaw">
              <div className="LidoFooterRawLeft">Exchange rate</div>
              <div className="LidoFooterRawRight">1 ETH = 1 stETH</div>
            </div>
            <div className="LidoFooterRaw">
              <div className="LidoFooterRawLeft">Transaction cost</div>
              <div className="LidoFooterRawRight">{state.txCost}</div>
            </div>
            <div className="LidoFooterRaw">
              <div className="LidoFooterRawLeft">Reward fee</div>
              <div className="LidoFooterRawRight">10%</div>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
};

export default Lido;
