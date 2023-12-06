"use client";

import Header from "@/app/components/Header";
import Profile from "@/app/components/Profile";
import Footer from "@/app/components/Footer";

export default function UserPage({params}) {
  return (
    <div className="min-h-screen flex flex-col gap-4">
      <Header/>
      <Profile docId={params.id} />
      <Footer />
    </div>
  );
}
