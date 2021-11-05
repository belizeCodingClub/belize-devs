import React from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import styles from "../styles/Me.module.css";
import { useSession } from "next-auth/client";
import { Formik, FormikHelpers, Form, Field } from "formik";
import toast from "react-hot-toast";

interface FormValues {
  about: string;
  website: string;
  contactNumber: string;
  github: string;
  linkedin: string;
}

const Me: React.FC = () => {
  const [session, loading] = useSession();

  const initialValues: FormValues = {
    about: session ? session.user.about : "",
    contactNumber: session ? session.user.contactNumber : "",
    website: session ? session.user.website : "",
    github: session ? session.user.github : "",
    linkedin: session ? session.user.linkedin : "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    try {
      await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      toast("Saved changes", {
        icon: "👍",
      });
    } catch (error) {
      toast.error("Failed to save changes");
      setSubmitting(false);
      console.error(error);
    }
  };

  return (
    <Layout>
      <main className={styles.main}>
        <h1>Edit your profile</h1>
        {session && (
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="contactNumber"
                  placeholder="Contact number"
                  type="text"
                />
                <Field
                  name="about"
                  placeholder="About you"
                  component="textarea"
                  rows={4}
                />

                <h4>Links</h4>

                <Field name="website" placeholder="Website" type="text" />
                <Field name="github" placeholder="Github" type="text" />
                <Field name="linkedin" placeholder="LinkedIn" type="text" />

                <br />
                <br />
                <button type="submit" disabled={isSubmitting}>
                  Save
                </button>
                <a className="back" href="#" onClick={() => Router.push("/")}>
                  Cancel
                </a>
              </Form>
            )}
          </Formik>
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

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Me;
