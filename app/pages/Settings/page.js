"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import Text from "@/app/components/texts/Text";

import { useStyling } from "app/_utils/styling-context";
import { useUserAuth } from "@/app/_utils/auth-context";

import {
    getUserDocIdByUserId,
    deleteUserByDocId,
    deleteMultiplePosts
} from "@/app/_services/database-service";

import {
    useState,
    useEffect
} from "react"; 
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

export default function Settings() {
    const { user } = useUserAuth();

    const [userDoc, setUserDoc] = useState(null);

    useEffect(
        () => {
            if (!user) return;

            const getUserDoc = async () => {
                const docId = await getUserDocIdByUserId(user.uid);
                setUserDoc(docId);
            }

            getUserDoc();

        }, [user]
    );

    const handleDeleteAccount = async () => {
        if (!userDoc) return;

        try {
            await deleteUserByDocId(userDoc);
            await deleteMultiplePosts(user.uid);
        } catch (error) {
            console.log("Error deleting user", error);
        }
    }


  return (
    <div className="min-h-screen flex flex-col gap-4">
      <Header/>
      <main className="flex flex-col px-24 border-b-2 gap-8 pb-2">
        <div className="flex flex-col gap-2">
            <Text type="h2">Account</Text>
            <div className="px-4">
                    <Button onClick={handleDeleteAccount}>Delete account</Button>
            </div>
        </div>
        </ main>
      <Footer />
    </div>
  );
}
