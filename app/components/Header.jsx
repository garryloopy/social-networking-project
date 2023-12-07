"use client";

import Link from "next/link";

import { useStyling } from "app/_utils/styling-context";
import { useUserAuth } from "../_utils/auth-context";

import { getUserDocIdByUserId } from "../_services/database-service";

import {
  useState,
  useEffect
} from "react";

export default function header() {
  const { user } = useUserAuth();

  const [userDocId, setUserDocId] = useState(null);

  useEffect(
    () => {
      if (!user) return;

      const loadCurrentUser = async () => {
        try {
          const foundUser = await getUserDocIdByUserId(user.uid);

          setUserDocId(foundUser);
        } catch (error) {
          console.log("Error loading current user", error);
        }
      };

      loadCurrentUser();
    }, [user]
  )

  const {
    subheadingSize,
    subheadingWeight,
    textSize,
    textWeight,
    subtextSize,
    subtextWeight,
  } = useStyling();

  const NavBarButton = ({ children, onClick }) => {
    const handleOnClick = () => {
      if (onClick) onClick();
    };

    return (
      <button
        className={`text-black ${subtextSize} ${subtextWeight} px-10 py-2 shadow-lg active:bg-gray-50 rounded-md hover:bg-gray-200 bg-gray-50`}
        onClick={handleOnClick}
      >
        {children}
      </button>
    );
  };

  return (
    <header className="flex justify-between bg-gray-400 border-b-2 border-gray-50 pb-2 px-24 pt-2">
      <div className="flex flex-row gap-4">
        <Link href="/pages/Home">
          <NavBarButton>Home</NavBarButton>
        </Link>
        {user && userDocId &&
          <Link href={`/pages/users/${userDocId}`}>
            <NavBarButton>Profile</NavBarButton>
          </Link>
        }
      </div>
      
      <div className="flex flex-row gap-5">
        <Link href="/pages/Settings">
          <NavBarButton>Settings</NavBarButton>
        </Link>
        <Link href="/">
          <NavBarButton>Sign out</NavBarButton>
        </Link>
      </div>
    </header>
  );
}
