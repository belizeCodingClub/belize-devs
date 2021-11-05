import React, { ReactNode } from "react";
import Header from "./Header";
import styles from "../styles/Home.module.css";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    <footer className={styles.footer}>Powered by You</footer>
  </div>
);

export default Layout;
