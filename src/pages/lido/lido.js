import { ethers } from "ethers";
import { useEffect, useState } from "react";
import fetchTheme from "./components/theme";
import Web3 from "web3";
import { fetchLidoApr } from "./components/fetchLidoApr";
import { fetchLidoAbi } from "./components/fetchLidoAbi";
import { getStakedBalance } from "./components/getStakedBalance";
import { fetchTxCost } from "./components/fetchTxCost";

const Lido = () => {
  const lidoContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";
  const tokenDecimals = 18;

  const [state, setState] = useState({
    lidoApr: "-",
    sender: null,
    balance: null,
    stakedBalance: null,
    txCost: null,
    strEther: null,
    iface: null,
    lidoAbi: null,
  });
  const [Theme, setTheme] = useState(null);

  // HELPER FUNCTIONS
  const submitEthers = async (strEther, _referral) => {
    const web3 = new Web3(window.ethereum);
    if (!strEther) {
      return console.log("Amount is missing");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);

    const erc20 = new ethers.Contract(lidoContract, state.lidoAbi, provider.getSigner());
    const lido = new web3.eth.Contract(state.lidoAbi, lidoContract);

    let amount = web3.utils.toBN(strEther * 10 ** 18);
    console.log(amount);

    console.log(lido);

    const sendEth = await web3.eth.sendTransaction({
      from: state.sender,
      to: lidoContract,
      value: amount,
    });
    console.log(sendEth);
  };

  useEffect(() => {
    const web3 = new Web3(window.ethereum);

    // FETCH LIDO ABI
    const getLidoAbi = async () => {
      const res = await fetchLidoAbi();
      const iface = new ethers.Interface(res);
      setState((prevState) => ({ ...prevState, iface: iface, lidoAbi: res }));
    };

    if (!state.iface) {
      getLidoAbi();
    }

    // const getLidoApr = async () => {
    //   const res = await fetchLidoApr();
    //   setState((prevState) => ({ ...prevState, lidoApr: res }));
    // };

    // if (!state.lidoApr) {
    //   getLidoApr();
    // }

    // DETECT SENDER
    const getSender = async () => {
      if (!state.sender) {
        const sender = await web3.eth.getAccounts();
        setState((prevState) => ({ ...prevState, sender: sender[0] }));
      }
    };
    if (!state.sender) {
      getSender();
    }

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
    if (!state.balance) {
      fetchSenderBalance();
    }

    // FETCH SENDER STETH BALANCE
    const fetchSenderStakedBalance = async () => {
      if (!state.stakedBalance && state.iface && state.sender) {
        const stakedBalance = await getStakedBalance(web3, state);
        setState((prevState) => ({ ...prevState, stakedBalance }));
      }
    };
    if (!state.stakedBalance) {
      fetchSenderStakedBalance();
    }

    // FETCH TX COST
    const getTxCost = async () => {
      const res = await fetchTxCost(web3);
      setState((prevState) => ({ ...prevState, txCost: res }));
    };
    if (!state.txCost) {
      getTxCost();
    }
    console.log(state);
  }, [state.iface, state.lidoApr, state.sender, state.balance, state.stakedBalance]);

  useEffect(() => {
    const fetchStyledComponent = async () => {
      const component = await fetchTheme();
      console.log(component);
      setTheme(component);
    };
    fetchStyledComponent();
  }, []);

  if (!Theme || !state.iface || !state.lidoApr || !state.sender || !state.balance) {
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
                <div className="LidoAprValue">{state.lidoApr ?? "..."}%</div>
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
