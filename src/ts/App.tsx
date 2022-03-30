import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Button, Layout, Menu } from "antd";
import styles from "./App.module.less";
import "antd/dist/antd.less";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import mintImage from "../img/1.png";
import LadyNFT from "../abi/LadyNFT.json";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { useEffect, useState } from "react";
import { CONTRACT_ADDRESS } from "./util";

// declare var window: any;

const IPFS_GATEWAY = "https://gateway.pinata.cloud/";

export const injected = new InjectedConnector({
  supportedChainIds: [31337],
});
export const App = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();
  const eth = (window as any)?.ethereum;
  const web3 = new Web3(eth ? eth : "");
  const ladyNFT = new web3.eth.Contract(
    LadyNFT.abi as AbiItem[],
    CONTRACT_ADDRESS
  );

  const [currWallet, setCurrWallet] = useState<string | undefined | null>();

  const [balance, setBalance] = useState(0);
  const [tokenUri, setTokenUri] = useState("");
  const [nftImageURL, setNftImageURL] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userWallet") !== account && account) {
      localStorage.setItem("userWallet", String(account));
    }
    setCurrWallet(account);
  }, [account]);

  useEffect(() => {
    if (currWallet) {
      void getBalance(currWallet);
    }
  }, [currWallet]);

  useEffect(() => {
    console.log("User wallet is: ", localStorage.getItem("userWallet"));
    if (localStorage.getItem("userWallet") !== "") {
      setCurrWallet(localStorage.getItem("userWallet"));
    }
  }, []);

  return (
    <Layout>
      <Header>
        <div className={styles.headerContentWrapper}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Roadmap</Menu.Item>
          </Menu>

          <Button onClick={toggleWalletConnection}>
            {!active ? "Connect Wallet" : "Disconnect Wallet"}
          </Button>
        </div>
      </Header>
      <Content style={{ overflow: "auto" }}>
        <div className={styles.mintWrapper}>
          <h1>Mint your NFT</h1>
          <img src={mintImage} alt="mint" />
          <Button disabled={!active} onClick={mint}>
            Mint
          </Button>
        </div>
        <div>NFTs held {balance}</div>
        <div>Token URI {tokenUri}</div>
        {nftImageURL && <img src={nftImageURL} alt="Test" />}
      </Content>
      <Footer></Footer>
    </Layout>
  );

  async function getBalance(account: string): Promise<void> {
    const balance: number = await ladyNFT.methods.balanceOf(account).call();
    setBalance(balance);

    if (balance > 0) {
      const uri: string = await ladyNFT.methods.tokenURI(balance).call();
      setTokenUri(uri);
      const res = await fetch(createIPFSRequestURL(uri));
      const data = await res.json();
      setNftImageURL(createIPFSRequestURL(data.image as string));
    }
  }

  function createIPFSRequestURL(uri: string): string {
    return IPFS_GATEWAY + uri.replace("://", "/");
  }

  async function connect(): Promise<void> {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }
  function disconnect(): void {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  function toggleWalletConnection(): void {
    if (active) {
      disconnect();
    } else {
      void connect();
    }
  }

  async function mint(): Promise<void> {
    try {
      await ladyNFT.methods.mint().send({ value: 0, from: account });
    } catch (e) {
      alert(e);
    }
  }
};
