"use client";

import { useEffect, useState } from "react";
import { getUserByDocId } from "../_services/database-service";

{
  /* <img src={user.photoURL} className="w-8 h-8 rounded-full mt-auto mb-auto" alt="User image"/>
<div className="mt-auto mb-auto">
    <p className="text-sm">{user.displayName}</p>
    <p className="text-xs text-gray-400">{user.email}</p>
</div> */
}

export default function Profile({ docId }) {
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    try {
      const data = await getUserByDocId(docId);

      setUser(data);
    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <section className="flex flex-col gap-8 text-center bg-gray-300 justify-center items-center align-middle p-4 py-12 rounded-sm mx-24 shadow-2xl">
      {user && (
        <div className="flex flex-col gap-4">
          <img
            src={user.photoURL}
            alt="Profile Picture"
            className="rounded-full"
            width={300}
            height={300}
          />
          <h1 className="text-4xl font-bold text-black">{user.displayName}</h1>
        </div>
      )}
      {user && (
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-black">Posts</h1>
        </div>
      )}

      {!user && (
        <div>
          <p className="text-black">Error loading user info</p>
        </div>
      )}
    </section>
  );
}
