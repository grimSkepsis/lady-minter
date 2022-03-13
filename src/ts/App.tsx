import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import styles from "./App.module.scss";
const App = (): ReactElement => {
  return <div className={styles.test}>HELLO 32</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
