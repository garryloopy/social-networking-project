"use client";

import { useEffect, useState } from "react";
import { getUserByDocId, getUserPostsByUserId } from "../_services/database-service";
import Post from "./Post";

import Text from "./texts/Text";
import Subtext from "./texts/Subtext";
import Heading from "./texts/Heading";

{
  /* <img src={user.photoURL} className="w-8 h-8 rounded-full mt-auto mb-auto" alt="User image"/>
<div className="mt-auto mb-auto">
    <p className="text-sm">{user.displayName}</p>
    <p className="text-xs text-gray-400">{user.email}</p>
</div> */
}

export default function Profile({ docId }) {
  const [user, setUser] = useState(null);

  const [availablePosts, setAvailablePosts] = useState([]);

  const loadUser = async () => {
    try {
      const data = await getUserByDocId(docId);

      setUser(data);
    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  };

  const loadUserPosts = async () => {
    try {
      if (!user) return;


      const data = await getUserPostsByUserId(user.userId);
      setAvailablePosts(data);
    } catch (error) {
      console.log("Failed to fetch user posts", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    console.log(user);
    loadUserPosts();
  }, [user]);

  return (
    <section className="flex flex-col gap-12 text-center bg-slate-100 justify-center align-middle p-4 py-12 rounded-md mx-24 shadow-2xl">
      {user && (
        <div className="flex flex-col items-center gap-8 border-b-2 w-full pb-4 border-gray-200">
          <img
            src={user.photoURL}
            alt="Profile Picture"
            className="rounded-full border-2 border-neutral-400"
            width={300}
            height={300}
          />
          <div>
            <Heading>{user.displayName}</Heading>
            <Text setBlack={true}>{user.bio}</Text>
          </div>
        </div>
      )}
      {user && (
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-4xl font-bold text-slate-800">Posts</h1>
          {availablePosts &&
            availablePosts.map((post) => (
              <div key={post.docId} className="text-left">
                <Post post={post} />
              </div>
            ))
          }
          {availablePosts.length <= 0 && 
            <div>
              <Subtext >No posts yet...</Subtext>
          </div>
          }
        </div>
      )}

      {!user && (
        <div>
          <Subtext>Error loading user info</Subtext>
        </div>
      )}
    </section>
  );
}
