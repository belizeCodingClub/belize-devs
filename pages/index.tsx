import type { GetStaticProps, NextPage } from "next";
import prisma from "../lib/prisma";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import User, { UserProps } from "../components/User";
import Layout from "../components/Layout";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();
  return { props: { users } };
};

type Props = {
  users: UserProps[];
};

const Home: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>BelizeDevs</title>
          <meta
            name="description"
            content="Discover software developers from across Belize"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <Link href="/">BelizeDevs!</Link>
          </h1>

          <p className={styles.description}>
            Discover <code className={styles.code}>software developers</code>{" "}
            from across Belize
          </p>

          <div className={styles.grid}>
            {props.users.map((user) => (
              <div className={styles.card} key={user.id}>
                <User user={user} />
              </div>
            ))}
          </div>
        </main>

        <footer className={styles.footer}>Powered by You</footer>
      </div>
    </Layout>
  );
};

export default Home;
