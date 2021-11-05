import type { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import User, { UserProps } from "../components/User";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { useState } from "react";
import ProfilePic from "../components/ProfilePic";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany();
  return { props: { users } };
};

type Props = {
  users: UserProps[];
};

const Home: React.FC<Props> = (props) => {
  const [user, setUser] = useState<UserProps>();
  const [modalIsOpen, setIsOpen] = useState(false);

  const setActiveUser = (user: UserProps) => {
    setUser(user);
    setIsOpen(true);
  };

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
              <div
                className={styles.card}
                key={user.id}
                onClick={() => setActiveUser(user)}
              >
                <User user={user} />
              </div>
            ))}
          </div>
        </main>

        <footer className={styles.footer}>Powered by Us</footer>
      </div>
      {modalIsOpen && (
        <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          <div className={styles.profileHeader}>
            {user.image && (
              <div style={{ marginRight: 20 }}>
                <ProfilePic image={user.image} />
              </div>
            )}

            <h4>{user.name}</h4>
          </div>
          <div className={styles.profileContent}>
            <p>{user.about}</p>

            <h4>Contact</h4>
            <p>{user.email}</p>
            <p>{user.contactNumber}</p>

            <h4>Links</h4>
            <p>{user.website}</p>
            <p>{user.github}</p>
            <p>{user.linkedin}</p>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Home;
