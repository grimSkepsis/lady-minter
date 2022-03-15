import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { Button } from "antd";
import styles from "./App.module.less";
import "antd/dist/antd.less";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});
export const App = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect(): Promise<void> {
    try {
      await activate(injected);
    } catch (ex) {
      console.log("ERROR: ", ex);
    }
  }

  return (
    <div className={styles.test}>
      test
      <Button onClick={connect}>connect</Button>
    </div>
  );
};
