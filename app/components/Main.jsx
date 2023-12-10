"use client";

import { useUserAuth } from "app/_utils/auth-context";

import { useState, useEffect } from "react";

import {
    getAllPosts,
    createPost,
    getAllUsers,
  } from "app/_services/database-service";

import Heading from "./texts/Heading";
import Subheading from "./texts/Subheading";
import Post from "./Post";
import Subtext from "./texts/Subtext";
import CreatePostFormSection from "./sections/CreatePostFormSection";
import CreatePostSection from "./sections/CreatePostSection";

import User from "./User";

export default function Main() {
    const { user } = useUserAuth();

    const [availablePosts, setAvailablePosts] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
  
    const loadCurrentUser = () => {
      if (!user) return;
  
      const foundUser = availableUsers.filter(
        (potentialUser) => potentialUser.userInfo.userId === user.uid
      );
  
      if (foundUser) setCurrentUser(foundUser[0]);
      else setCurrentUser([]);
    };
  
    const loadPosts = async () => {
      try {
        const posts = await getAllPosts();
  
        setAvailablePosts(posts);
      } catch (error) {
        console.log("Error loading posts", error);
      }
    };
  
    const loadUsers = async () => {
      try {
        const users = await getAllUsers();
  
        setAvailableUsers(users);
      } catch (error) {
        console.log("Error loading users", error);
      }
    };
  
    useEffect(() => {
      try {
        loadPosts();
        loadUsers();
      } catch (error) {
        console.log("Something went wrong", error);
      }
    }, []);
  
    useEffect(() => {
      try {
        loadCurrentUser();
      } catch (error) {
        console.log("Error loading current user", error);
      }
    }, [availableUsers]);
  
    const [allowAddPost, setAllowAddPost] = useState(true);
  
    const handleOnAllowAddPostButtonClick = () => {
      setAllowAddPost(false);
    };
  
    const handleOnAddPost = async (postObj) => {
      const newPostObj = {
        ...postObj,
        userDocId: currentUser.docId
      }

      const docRef = await createPost(newPostObj);
  
      setAvailablePosts([
        ...availablePosts,
        {
          docId: docRef,
          data: {
            ...postObj,
            userDocId: currentUser.docId
          }
        },
      ]);  
      setAllowAddPost(true);
    };
  
    const handleOnPostButtonCloseClick = () => {
      setAllowAddPost(true);
    };

    return (
        <main className="flex flex-col px-20 border-b-2 gap-8 pb-2">
        <div className="mx-4">
          {user && allowAddPost && (
            <CreatePostSection
              onAllowAddPostButtonClick={handleOnAllowAddPostButtonClick}
            />
          )}
          {user && !allowAddPost && (
            <CreatePostFormSection
              onClose={handleOnPostButtonCloseClick}
              currentUser={currentUser}
              onAddPost={handleOnAddPost}
            />
          )}
        </div>

        <div className="flex flex-col gap-12 mx-4">
          <div className="border-b-2 pb-2 flex-1 border-gray-50">
            <Heading>Discover 🗺️</Heading>
          </div>
          <div className="flex flex-row flex-1 gap-40 justify-end">
            <section className="flex flex-col flex-1 gap-2">
              <Subheading>Posts</Subheading>

              {availablePosts &&
                availablePosts.map((post) => (
                  <Post post={post} key={post.docId} />
                ))}

              {availablePosts.length <= 0 && (
                <Subtext>
                  There are currently no posts available... why not add some?
                </Subtext>
              )}
            </section>

            <section className="flex flex-col gap-2">
              <Subheading>Users</Subheading>
              <div className="flex flex-col flex-1 bg-slate-200 p-2 rounded-md">
              {availableUsers &&
                user &&
                availableUsers
                  .filter(
                    (currentUser) => currentUser.userInfo.userId !== user.uid
                  )
                  .map((currentUser) => (
                    <div key={currentUser.userInfo.userId}>
                      <User user={currentUser} />
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    )
}