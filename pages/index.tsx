import Head from "next/head";
import Link from "next/link";
import { Mail, Link as RfLink, GitHub, Linkedin, Phone } from "react-feather";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import styles from "../styles/Home.module.css";
import User, { UserProps } from "../components/User";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import ProfilePic from "../components/ProfilePic";

const Home = () => {
  const { ref, inView } = useInView();

  const [user, setUser] = useState<UserProps>();
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "users",
    async ({ pageParam = "" }) => {
      await new Promise((res) => setTimeout(res, 1000));
      const res = await axios.get("/api/user?cursor=" + pageParam);
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const setActiveUser = (user: UserProps) => {
    setUser(user);
    setIsOpen(true);
  };

  if (isError) return <div>Error! {JSON.stringify(error)}</div>;

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
            Discover <code className={styles.code}>Software Developers</code>{" "}
            from across Belize
          </p>

          {isLoading && (
            <Loader type="Bars" color="#dddddd" height={70} width={70} />
          )}

          <div className={styles.grid}>
            {!isLoading &&
              data &&
              data.pages.map((page) => {
                return (
                  <React.Fragment key={page.nextId ?? "lastPage"}>
                    {page.users.map((user: UserProps) => (
                      <div
                        className={styles.card}
                        key={user.id}
                        onClick={() => setActiveUser(user)}
                      >
                        <User user={user} />
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}
          </div>
          <br />
          {isFetchingNextPage ? (
            <Loader type="Bars" color="#dddddd" height={70} width={70} />
          ) : null}

          <span style={{ visibility: "hidden" }} ref={ref}>
            intersection observer marker
          </span>
        </main>
      </div>
      {modalIsOpen && (
        <Modal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
          <div className={styles.profileHeader}>
            {user.image && (
              <div style={{ marginRight: 20 }}>
                <ProfilePic image={user.image} />
              </div>
            )}

            <div>
              <h3 style={{ margin: 0 }}>{user.name}</h3>
              {user.headline && (
                <p style={{ fontSize: 16, margin: 0, marginTop: 4 }}>
                  {user.headline}
                </p>
              )}
            </div>
          </div>
          <div className={styles.profileContent}>
            <p>{user.about}</p>

            <h4>Contact</h4>
            <div style={{ display: "flex", marginBottom: 12 }}>
              <Mail size={18} style={{ marginRight: 4 }} />
              {user.email || "N/A"}
            </div>
            <div style={{ display: "flex" }}>
              <Phone size={18} style={{ marginRight: 4 }} />
              {user.contactNumber || "N/A"}
            </div>

            <h4>Links</h4>
            <div style={{ display: "flex" }}>
              <RfLink size={18} style={{ marginRight: 4 }} />
              {user.website || "N/A"}
            </div>
            <div style={{ display: "flex", margin: "12px 0" }}>
              <GitHub size={18} style={{ marginRight: 4 }} />
              {user.github || "N/A"}
            </div>
            <div style={{ display: "flex" }}>
              <Linkedin size={18} style={{ marginRight: 4 }} />
              {user.linkedin || "N/A"}
            </div>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

export default Home;
