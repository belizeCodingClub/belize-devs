import { signIn } from "next-auth/client";

export default function AccessDenied() {
  return (
    <div className="access-denied">
      <h1>Access Denied</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Please sign in here to view this page
        </a>
      </p>
    </div>
  );
}
