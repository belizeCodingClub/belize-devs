import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import styles from "../styles/Me.module.css";
import { useSession } from "next-auth/client";

const Me: React.FC = () => {
  const [session, loading] = useSession();

  const [contactNumber, setContactNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { contactNumber, website, about };
      await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <main className={styles.main}>
        {session && (
          <form onSubmit={submitData}>
            <h1>Edit your profile</h1>
            <input disabled type="text" value={session.user.email} />
            <input
              autoFocus
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Contact number"
              type="text"
              value={contactNumber}
            />
            <input
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website"
              type="text"
              value={website}
            />
            <textarea
              cols={50}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="About you"
              rows={4}
              value={about}
            />
            <input
              // disabled={!about || !contactNumber}
              type="submit"
              value="Save changes"
            />
            <a className="back" href="#" onClick={() => Router.push("/")}>
              Cancel
            </a>
          </form>
        )}
      </main>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Me;
