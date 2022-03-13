import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import { Home } from "./Home";

const App = (): ReactElement => {
  return (
    <Web3ReactProvider getLibrary={(p) => new Web3Provider(p)}>
      <Home />
    </Web3ReactProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
