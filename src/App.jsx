import logo from "./logo.svg";
import MintHeader from "./MintHeader";
import "./App.css";
import MintFooter from "./MintFooter";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import SimpleStorage_abi from "./contracts/SimpleStorage_abi.json";
import YumeHeader from "./YumeHeader";
import YumeFooter from "./YumeFooter";

const App = () => {
  const [mintNum, setMintNum] = useState(null);

  const contractAddress = "0xED9D288E8eF0607BF8AfCEAf05A755E4CB773a08";

  useEffect(() => {
    const setSaleInfo = async () => {
      //メタマスクと接続することでコントラクトにアクセスできるようになる
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        SimpleStorage_abi,
        signer
      );

      try {
        const mintNumber = (await contract.getSupply()).toString();
        console.log("mintNumber", mintNumber);
        setMintNum(mintNumber);
      } catch (e) {
        console.log(e);
      }
    };
    setSaleInfo();
  }, []);

  const buy = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const account = await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      SimpleStorage_abi,
      signer
    );
    await contract.mint();
  };

  return (
    <div className="App">
      <YumeHeader />

      <div className="flex justify-center my-10 flex-wrap">
        <div href="" className="h-60 w-60 shadow-md font">
          <div className="pt-3">このページの使い方</div>
        </div>
        <div className="h-60 w-60 shadow-md lg:ml-6">
          <div className="pt-3">これまでの勉強会内容</div>
        </div>
        <div className="h-60 w-60 shadow-md lg:ml-6">
          <div className="pt-3">アンケート</div>
        </div>
      </div>

      <div className="w-96 h-32 flex justify-center items-center border-2 mx-auto mb-10">
        <div>
          <div className="mb-2">これまでのNFT発行数</div>
          <div className="text-xl yumemi-text">{mintNum} / 1000</div>
        </div>
      </div>

      <button
        onClick={buy}
        className="px-8 gradation-background text-white font-bold rounded-md py-3 text-lg yumemi-text"
      >
        mint
      </button>

      <YumeFooter />
    </div>
  );
};

export default App;
