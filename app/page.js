"use client";

import LoginPage from "./pages/LoginPage/page";

import {
  useUserAuth
} from "./_utils/auth-context"

import { useEffect } from "react";

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();

  const handleSignOut = () => {
    firebaseSignOut();
  }

  return (
    <div>
        <LoginPage />
    </div>
  )
}