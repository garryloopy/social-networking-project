"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import Text from "@/app/components/texts/Text";

export default function Settings() {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <Header/>
      <main className="flex flex-col px-24 border-b-2 gap-8 pb-2">
        <div>
            <Text type="h2">Account</Text>
            <div>
                <button className="border-2 border-black rounded-md px-4 py-2">Delete account</button>
            </div>
        </div>
        </ main>
      <Footer />
    </div>
  );
}
