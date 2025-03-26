"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Shopping List App</h1>

      {user ? (
        <>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <button onClick={handleSignOut} style={{ margin: "10px", padding: "10px" }}>
            Sign Out
          </button>
          <br />
          <Link href="/week-9/shopping-list">
            <button style={{ padding: "10px" }}>Go to Shopping List</button>
          </Link>
        </>
      ) : (
        <button onClick={handleSignIn} style={{ padding: "10px" }}>
          Sign In with GitHub
        </button>
      )}
    </div>
  );
}
