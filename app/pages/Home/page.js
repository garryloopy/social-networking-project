"use client";

import Header from "@/app/components/Header";
import Main from "@/app/components/Main";
import Footer from "@/app/components/Footer";

import { useUserAuth } from "@/app/_utils/auth-context";
import { useStyling } from "@/app/_utils/styling-context";

import Link from "next/link";

const Button = ({ children, onClick }) => {
  const {
      subheadingSize,
      subheadingWeight,
      textSize,
      textWeight,
      subtextSize,
      subtextWeight,
    } = useStyling();

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

export default function Home() {
  const { user } = useUserAuth();
  return (
    <div className="min-h-screen flex flex-col gap-4">
      {user && <Header />}

      {user && <Main />}

      {user && <Footer />}

      {!user && (
        <Link href={"/"} className="flex justify-center align-middle mt-auto mb-auto">
          <Button>BACK TO LOGIN PAGE</Button>
        </Link>
        )}
    </div>
  );
}
