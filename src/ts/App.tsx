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

// declare var window: any;

export const injected = new InjectedConnector({
  supportedChainIds: [31337],
});
export const App = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

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

  function mint(): void {
    let eth: any = (window as any)?.ethereum;
    console.log(eth);
    if (eth) {
      const web3 = new Web3(eth);
      //   const ladyNFT = new web3.eth.Contract(
      //     LadyNFT.abi as AbiItem[],
      //     "0x5fbdb2315678afecb367f032d93f642f64180aa3"
      //   );
      //   console.log(ladyNFT);
      //   // const ladyNFT = new ethers
    }
  }

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
      <Content>
        <div className={styles.mintWrapper}>
          <h1>Mint your NFT</h1>
          <img src={mintImage} alt="mint" />
          <Button disabled={!active} onClick={mint}>
            Mint
          </Button>
        </div>
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
