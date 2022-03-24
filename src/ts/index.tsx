import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "antd/dist/antd.dark.less";
window.process = {
  ...window.process,
};

const Index = (): ReactElement => {
  return (
    <Web3ReactProvider getLibrary={(p: any) => new Web3Provider(p)}>
      <App />
    </Web3ReactProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
