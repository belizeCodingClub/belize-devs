import { signIn } from "next-auth/client";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="access-denied">
      <h1>Access Denied</h1>
      <p>
        <Link href="/api/auth/signin">
          <a
            href={`/api/auth/signin`}
            onClick={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            Please sign in here to view this page
          </a>
        </Link>
      </p>
    </div>
  );
}
