import type { GetStaticProps, NextPage } from "next";
import prisma from "../lib/prisma";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import User, { UserProps } from "../components/User";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();
  return { props: { users } };
};

type Props = {
  users: UserProps[];
};

const Home: React.FC<Props> = (props) => {
  return (
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
          Welcome to <a href="https://nextjs.org">BelizeDevs!</a>
        </h1>

        <p className={styles.description}>
          Discover <code className={styles.code}>software developers</code> from
          across Belize
        </p>

        <div className={styles.grid}>
          {props.users.map((user) => (
            <div className={styles.card} key={user.id}>
              <User user={user} />
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
