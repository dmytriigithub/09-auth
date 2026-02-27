"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useSessionStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AuthNavigation() {
  const { clearIsAuthenticated, isAuthenticated, user } = useSessionStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch {
      toast.error("Не вдалося вийти з акаунта");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </Link>
        </li>

        <li className={css.navigationItem}>
          <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email ?? ""}</p>
        <button
          type="button"
          className={css.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>
      </li>
    </>
  );
}
