"use client";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";

import {
  useUserAuth
} from "./_utils/auth-context"

export default function Page() {
  const { user } = useUserAuth();
  return (
    <div>
      {!user &&
        <LoginPage />
      }
      {user &&
        <LandingPage />
      }
    </div>
  )
}